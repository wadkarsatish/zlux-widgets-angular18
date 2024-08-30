

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {
  NgModule,
  Directive,
  Component,
  Input,
  ElementRef,
  HostListener,
  ViewChild,
  OnInit
} from "@angular/core";
import { CommonModule } from '@angular/common';

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

@Directive({
  selector: '[zluxFlyover]',
  host: {
    '[class.rel-positioned]': 'true'
  }
})
export class ZluxFlyover {
  @Input() flyover!: ZluxFlyoverComponent;
  @Input() position!: 'top' | 'bottom' | 'left' | 'right';
  @Input() showDelayMs: number = 200;
  @Input() zluxFlyoverDisabled: boolean = false;
  private preparingToShow: boolean = false;

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter')
  onMouseEnter(e: Event) {
    if (this.flyover) {
      if (this.flyover.hideTimer) {
        clearInterval(this.flyover.hideTimer);
        this.flyover.forceHide();
      }
      if (!this.isEnabled()) {
        return;
      }
      this.preparingToShow = true;
      setTimeout(() => {
        if (this.preparingToShow) {
          this.flyover.show(this.el.nativeElement, this.position);
          this.preparingToShow = false;
        }
      },
        this.showDelayMs);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(e: Event) {
    this.preparingToShow = false;
    this.flyover.hide();
  }

  isEnabled() {
    return this.zluxFlyoverDisabled !== true;
  }
}

@Component({
  selector: "zlux-flyover",
  templateUrl: "flyover.component.html",
  styleUrls: ["flyover.component.css"],
})
export class ZluxFlyoverComponent implements OnInit {
  @Input() hideDelayMs: number = 200;
  top!: any;
  left!: any;
  hover: boolean = false;
  targetHover: boolean = false;
  active: boolean = false;
  arrowTopOffsetLeft!: number;
  arrowTopOffsetBottom!: number;
  arrowBottomOffsetLeft!: number;
  arrowBottomOffsetBottom!: number;
  position: string = 'top';
  flyoverMarginRight: number = 15;
  flyoverMarginLeft: number = 15;
  flyoverMarginTop: number = 10;
  flyoverMarginBottom: number = 20;
  hideTimer!: any;

  constructor(public el: ElementRef) { }

  ngOnInit() {
    this.arrowTopOffsetLeft = this.contentArea.nativeElement.clientWidth / 2 - 10;
    this.arrowTopOffsetBottom = -9;
    this.arrowBottomOffsetLeft = this.contentArea.nativeElement.clientWidth / 2 - 10;
    this.arrowBottomOffsetBottom = -10;
  }

  @ViewChild('area')
  contentArea!: ElementRef;

  @HostListener('mouseenter')
  onMouseEnter(e: Event) {
    this.hover = true;
    this.active = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(e: Event) {
    this.hover = false;
    this.hide();
  }

  show(onElement: any, onPosition: 'top' | 'bottom' | 'left' | 'right' = 'top') {
    if (this.hideTimer) {
      this.forceHide();
    }
    this.position = onPosition;
    switch (onPosition) {
      case 'top': {
        this.setTopPosition(onElement);
        break;
      }
      case 'bottom': {
        this.setBottomPosition(onElement);
        break;
      }
      case 'left': {
        this.setLeftPosition(onElement);
        break;
      }
      case 'right': {
        this.setRightPosition(onElement);
        break;
      }
    }
    this.targetHover = true;
    this.active = true;
  }

  private GetRelativeShift(onEl: any, content: any): Rect {
    let elem = onEl.offsetParent;
    let rect: Rect = {
      top: 0,
      left: 0,
      width: elem.clientWidth,
      height: elem.clientHeight
    };
    while (elem !== content.offsetParent) {
      rect.top += elem.offsetTop;
      rect.left += elem.offsetLeft;
      rect.width = elem.clientWidth;
      rect.height = elem.clientHeight;
      elem = elem.offsetParent;
    }
    return rect;
  }

  private setTopPosition(onEl: any) {
    let content = this.contentArea.nativeElement;
    let rect: Rect = this.GetRelativeShift(onEl, content);
    this.top = rect.top + onEl.offsetTop - content.clientHeight - 20;
    this.left = rect.left + onEl.offsetLeft - content.clientWidth / 2 + onEl.offsetWidth / 2;

    this.arrowTopOffsetLeft = content.clientWidth / 2 - 10;
    this.arrowTopOffsetBottom = -9;
    this.arrowBottomOffsetLeft = content.clientWidth / 2 - 10;
    this.arrowBottomOffsetBottom = -10;

    this.horizontalAlign(onEl, rect);
  }

  private setBottomPosition(onEl: any) {
    let content = this.contentArea.nativeElement;
    let rect: Rect = this.GetRelativeShift(onEl, content);
    this.top = rect.top + onEl.offsetTop + onEl.offsetHeight + 20;
    this.left = rect.left + onEl.offsetLeft - content.clientWidth / 2 + onEl.offsetWidth / 2;

    this.arrowTopOffsetLeft = content.clientWidth / 2 - 10;
    this.arrowTopOffsetBottom = content.clientHeight - 12;
    this.arrowBottomOffsetLeft = content.clientWidth / 2 - 10;
    this.arrowBottomOffsetBottom = content.clientHeight - 11;

    this.horizontalAlign(onEl, rect);
  }

  private horizontalAlign(onEl: any, rect: Rect) {
    let content = this.contentArea.nativeElement;
    let distToRightEdge = rect.width - onEl.offsetWidth / 2 - onEl.offsetLeft - rect.left;
    if (distToRightEdge < content.clientWidth / 2 + this.flyoverMarginRight) {
      let offset = content.clientWidth / 2 - distToRightEdge + this.flyoverMarginRight;
      this.left -= offset;
      if (distToRightEdge < this.flyoverMarginRight + 15)
        offset = content.clientWidth / 2 - 15;
      this.arrowTopOffsetLeft += offset;
      this.arrowBottomOffsetLeft += offset;
    }
    else {
      let distToLeftEdge = onEl.offsetWidth / 2 + onEl.offsetLeft + rect.left;
      if (distToLeftEdge < content.clientWidth / 2 + this.flyoverMarginLeft) {
        let offset = content.clientWidth / 2 - distToLeftEdge + this.flyoverMarginLeft;
        this.left += offset;
        if (distToLeftEdge < this.flyoverMarginLeft + 15)
          offset = content.clientWidth / 2 - 15;
        this.arrowTopOffsetLeft -= offset;
        this.arrowBottomOffsetLeft -= offset;
      }
    }
  }

  private setLeftPosition(onEl: any) {
    let content = this.contentArea.nativeElement;
    let rect: Rect = this.GetRelativeShift(onEl, content);
    this.top = rect.top + onEl.offsetTop + onEl.offsetHeight / 2 - content.clientHeight / 2;
    this.left = rect.left + onEl.offsetLeft - content.clientWidth - 20;

    this.arrowTopOffsetLeft = content.clientWidth - 12;
    this.arrowTopOffsetBottom = content.clientHeight / 2 - 10;
    this.arrowBottomOffsetLeft = content.clientWidth - 11;
    this.arrowBottomOffsetBottom = content.clientHeight / 2 - 10;

    this.verticalAlign(onEl, rect);
  }

  private setRightPosition(onEl: any) {
    let content = this.contentArea.nativeElement;
    let rect: Rect = this.GetRelativeShift(onEl, content);
    this.top = rect.top + onEl.offsetTop + onEl.offsetHeight / 2 - content.clientHeight / 2;
    this.left = rect.left + onEl.offsetLeft + onEl.offsetWidth + 20;

    this.arrowTopOffsetLeft = - 9;
    this.arrowTopOffsetBottom = content.clientHeight / 2 - 10;
    this.arrowBottomOffsetLeft = - 10;
    this.arrowBottomOffsetBottom = content.clientHeight / 2 - 10;

    this.verticalAlign(onEl, rect);
  }

  private verticalAlign(onEl: any, rect: Rect) {
    let content = this.contentArea.nativeElement;
    let distToBottomEdge = rect.height + onEl.offsetHeight / 2 - onEl.offsetTop - rect.top;
    if (distToBottomEdge < content.clientHeight / 2 + this.flyoverMarginBottom) {
      let offset = content.clientHeight / 2 - distToBottomEdge + this.flyoverMarginBottom;
      this.top -= offset;
      if (distToBottomEdge < this.flyoverMarginBottom + 15)
        offset = content.clientHeight / 2 - 15;
      this.arrowTopOffsetBottom -= offset;
      this.arrowBottomOffsetBottom -= offset;
    }
    else {
      let distToTopEdge = onEl.offsetHeight / 2 + onEl.offsetTop + rect.top;
      if (distToTopEdge < content.clientHeight / 2 + this.flyoverMarginTop) {
        let offset = content.clientHeight / 2 - distToTopEdge + this.flyoverMarginTop;
        this.top += offset;
        if (distToTopEdge < this.flyoverMarginTop + 15)
          offset = content.clientHeight / 2 - 15;
        this.arrowTopOffsetBottom += offset;
        this.arrowBottomOffsetBottom += offset;
      }
    }
  }

  hide() {
    this.targetHover = false;
    this.hideTimer = window.setTimeout(() => {
      this.forceHide();
    }, this.hideDelayMs);
  }

  forceHide() {
    if (!this.targetHover && !this.hover) {
      this.top = undefined;
      this.left = undefined;
      this.active = false;
    }
    this.hideTimer = null;
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [ZluxFlyoverComponent, ZluxFlyover],
  declarations: [ZluxFlyoverComponent, ZluxFlyover]
})
export class ZluxFlyoverModule { }


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

