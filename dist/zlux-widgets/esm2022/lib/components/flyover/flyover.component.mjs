/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
import { NgModule, Directive, Component, Input, HostListener, ViewChild } from "@angular/core";
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class ZluxFlyover {
    constructor(el) {
        this.el = el;
        this.showDelayMs = 200;
        this.zluxFlyoverDisabled = false;
        this.preparingToShow = false;
    }
    onMouseEnter(e) {
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
            }, this.showDelayMs);
        }
    }
    onMouseLeave(e) {
        this.preparingToShow = false;
        this.flyover.hide();
    }
    isEnabled() {
        return this.zluxFlyoverDisabled !== true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyover, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.3", type: ZluxFlyover, selector: "[zluxFlyover]", inputs: { flyover: "flyover", position: "position", showDelayMs: "showDelayMs", zluxFlyoverDisabled: "zluxFlyoverDisabled" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" }, properties: { "class.rel-positioned": "true" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyover, decorators: [{
            type: Directive,
            args: [{
                    selector: '[zluxFlyover]',
                    host: {
                        '[class.rel-positioned]': 'true'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { flyover: [{
                type: Input
            }], position: [{
                type: Input
            }], showDelayMs: [{
                type: Input
            }], zluxFlyoverDisabled: [{
                type: Input
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
export class ZluxFlyoverComponent {
    constructor(el) {
        this.el = el;
        this.hideDelayMs = 200;
        this.hover = false;
        this.targetHover = false;
        this.active = false;
        this.position = 'top';
        this.flyoverMarginRight = 15;
        this.flyoverMarginLeft = 15;
        this.flyoverMarginTop = 10;
        this.flyoverMarginBottom = 20;
    }
    ngOnInit() {
        this.arrowTopOffsetLeft = this.contentArea.nativeElement.clientWidth / 2 - 10;
        this.arrowTopOffsetBottom = -9;
        this.arrowBottomOffsetLeft = this.contentArea.nativeElement.clientWidth / 2 - 10;
        this.arrowBottomOffsetBottom = -10;
    }
    onMouseEnter(e) {
        this.hover = true;
        this.active = true;
    }
    onMouseLeave(e) {
        this.hover = false;
        this.hide();
    }
    show(onElement, onPosition = 'top') {
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
    GetRelativeShift(onEl, content) {
        let elem = onEl.offsetParent;
        let rect = {
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
    setTopPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop - content.clientHeight - 20;
        this.left = rect.left + onEl.offsetLeft - content.clientWidth / 2 + onEl.offsetWidth / 2;
        this.arrowTopOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowTopOffsetBottom = -9;
        this.arrowBottomOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowBottomOffsetBottom = -10;
        this.horizontalAlign(onEl, rect);
    }
    setBottomPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop + onEl.offsetHeight + 20;
        this.left = rect.left + onEl.offsetLeft - content.clientWidth / 2 + onEl.offsetWidth / 2;
        this.arrowTopOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowTopOffsetBottom = content.clientHeight - 12;
        this.arrowBottomOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowBottomOffsetBottom = content.clientHeight - 11;
        this.horizontalAlign(onEl, rect);
    }
    horizontalAlign(onEl, rect) {
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
    setLeftPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop + onEl.offsetHeight / 2 - content.clientHeight / 2;
        this.left = rect.left + onEl.offsetLeft - content.clientWidth - 20;
        this.arrowTopOffsetLeft = content.clientWidth - 12;
        this.arrowTopOffsetBottom = content.clientHeight / 2 - 10;
        this.arrowBottomOffsetLeft = content.clientWidth - 11;
        this.arrowBottomOffsetBottom = content.clientHeight / 2 - 10;
        this.verticalAlign(onEl, rect);
    }
    setRightPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop + onEl.offsetHeight / 2 - content.clientHeight / 2;
        this.left = rect.left + onEl.offsetLeft + onEl.offsetWidth + 20;
        this.arrowTopOffsetLeft = -9;
        this.arrowTopOffsetBottom = content.clientHeight / 2 - 10;
        this.arrowBottomOffsetLeft = -10;
        this.arrowBottomOffsetBottom = content.clientHeight / 2 - 10;
        this.verticalAlign(onEl, rect);
    }
    verticalAlign(onEl, rect) {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.3", type: ZluxFlyoverComponent, selector: "zlux-flyover", inputs: { hideDelayMs: "hideDelayMs" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, viewQueries: [{ propertyName: "contentArea", first: true, predicate: ["area"], descendants: true }], ngImport: i0, template: "\r\n\r\n<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->\r\n\r\n<div class=\"zlux-flyover-area\"\r\n  [style.top]=\"(active==true?top:-9999)+'px'\"\r\n  [style.left]=\"(active==true?left:-9999)+'px'\"\r\n  #area>\r\n  <div class=\"zlux-flyover-content\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n  <div class=\"zlux-flyover-arrow-top-layer\"\r\n    [style.left]=\"arrowTopOffsetLeft+'px'\"\r\n    [style.bottom]=\"arrowTopOffsetBottom+'px'\"\r\n    [ngClass]=\"{\r\n      'top': position=='top',\r\n      'bottom': position=='bottom',\r\n      'left': position=='left',\r\n      'right': position=='right'\r\n    }\"></div>\r\n  <div class=\"zlux-flyover-arrow-bottom-layer\"\r\n    [style.left]=\"arrowBottomOffsetLeft+'px'\"\r\n    [style.bottom]=\"arrowBottomOffsetBottom+'px'\"></div>\r\n</div>\r\n\r\n\r\n<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->\r\n\r\n", styles: [":host{font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif}.rel-positioned{position:relative}.zlux-flyover-area{position:absolute;background:transparent;border:transparent;z-index:1}.zlux-flyover-content{padding:10px;border:1px solid #21649F;background:#fff;box-shadow:3px 3px #0000004d}.zlux-flyover-arrow-top-layer{position:absolute;width:20px;height:20px;transform:rotate(45deg);background:transparent}.zlux-flyover-arrow-top-layer.top{border-top:10px solid transparent;border-left:10px solid transparent;border-bottom:10px solid #fff;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.bottom{border-top:10px solid #fff;border-left:10px solid #fff;border-bottom:10px solid transparent;border-right:10px solid transparent}.zlux-flyover-arrow-top-layer.left{border-top:10px solid #fff;border-left:10px solid transparent;border-bottom:10px solid transparent;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.right{border-top:10px solid transparent;border-left:10px solid #fff;border-bottom:10px solid #fff;border-right:10px solid transparent}.zlux-flyover-arrow-bottom-layer{position:absolute;width:20px;height:20px;background:#21649f;transform:rotate(45deg);box-shadow:3px 0 #0101014d;z-index:-1}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-flyover", template: "\r\n\r\n<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->\r\n\r\n<div class=\"zlux-flyover-area\"\r\n  [style.top]=\"(active==true?top:-9999)+'px'\"\r\n  [style.left]=\"(active==true?left:-9999)+'px'\"\r\n  #area>\r\n  <div class=\"zlux-flyover-content\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n  <div class=\"zlux-flyover-arrow-top-layer\"\r\n    [style.left]=\"arrowTopOffsetLeft+'px'\"\r\n    [style.bottom]=\"arrowTopOffsetBottom+'px'\"\r\n    [ngClass]=\"{\r\n      'top': position=='top',\r\n      'bottom': position=='bottom',\r\n      'left': position=='left',\r\n      'right': position=='right'\r\n    }\"></div>\r\n  <div class=\"zlux-flyover-arrow-bottom-layer\"\r\n    [style.left]=\"arrowBottomOffsetLeft+'px'\"\r\n    [style.bottom]=\"arrowBottomOffsetBottom+'px'\"></div>\r\n</div>\r\n\r\n\r\n<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->\r\n\r\n", styles: [":host{font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif}.rel-positioned{position:relative}.zlux-flyover-area{position:absolute;background:transparent;border:transparent;z-index:1}.zlux-flyover-content{padding:10px;border:1px solid #21649F;background:#fff;box-shadow:3px 3px #0000004d}.zlux-flyover-arrow-top-layer{position:absolute;width:20px;height:20px;transform:rotate(45deg);background:transparent}.zlux-flyover-arrow-top-layer.top{border-top:10px solid transparent;border-left:10px solid transparent;border-bottom:10px solid #fff;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.bottom{border-top:10px solid #fff;border-left:10px solid #fff;border-bottom:10px solid transparent;border-right:10px solid transparent}.zlux-flyover-arrow-top-layer.left{border-top:10px solid #fff;border-left:10px solid transparent;border-bottom:10px solid transparent;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.right{border-top:10px solid transparent;border-left:10px solid #fff;border-bottom:10px solid #fff;border-right:10px solid transparent}.zlux-flyover-arrow-bottom-layer{position:absolute;width:20px;height:20px;background:#21649f;transform:rotate(45deg);box-shadow:3px 0 #0101014d;z-index:-1}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { hideDelayMs: [{
                type: Input
            }], contentArea: [{
                type: ViewChild,
                args: ['area']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
export class ZluxFlyoverModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverModule, declarations: [ZluxFlyoverComponent, ZluxFlyover], imports: [CommonModule], exports: [ZluxFlyoverComponent, ZluxFlyover] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxFlyoverComponent, ZluxFlyover],
                    declarations: [ZluxFlyoverComponent, ZluxFlyover]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx5b3Zlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy96bHV4LXdpZGdldHMvc3JjL2xpYi9jb21wb25lbnRzL2ZseW92ZXIvZmx5b3Zlci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy96bHV4LXdpZGdldHMvc3JjL2xpYi9jb21wb25lbnRzL2ZseW92ZXIvZmx5b3Zlci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7Ozs7Ozs7RUFRRTtBQUVGLE9BQU8sRUFDTCxRQUFRLEVBQ1IsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBRUwsWUFBWSxFQUNaLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQWUvQyxNQUFNLE9BQU8sV0FBVztJQU90QixZQUFvQixFQUFjO1FBQWQsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUp6QixnQkFBVyxHQUFXLEdBQUcsQ0FBQztRQUMxQix3QkFBbUIsR0FBWSxLQUFLLENBQUM7UUFDdEMsb0JBQWUsR0FBWSxLQUFLLENBQUM7SUFFSCxDQUFDO0lBR3ZDLFlBQVksQ0FBQyxDQUFRO1FBQ25CLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDM0IsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDM0IsQ0FBQztZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztnQkFDdEIsT0FBTztZQUNULENBQUM7WUFDRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM1QixV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LFlBQVk7dUJBQUMsWUFBWTtnQkFPMUIsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLFlBQVk7O0FBaUw1QixNQUFNLE9BQU8saUJBQWlCOzhHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixpQkFyTmpCLG9CQUFvQixFQTlDcEIsV0FBVyxhQStQWixZQUFZLGFBak5YLG9CQUFvQixFQTlDcEIsV0FBVzsrR0FtUVgsaUJBQWlCLFlBSmxCLFlBQVk7OzJGQUlYLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLFdBQVcsQ0FBQztvQkFDNUMsWUFBWSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsV0FBVyxDQUFDO2lCQUNsRCIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLypcclxuICBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZVxyXG4gIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSB2Mi4wIHdoaWNoIGFjY29tcGFuaWVzXHJcbiAgdGhpcyBkaXN0cmlidXRpb24sIGFuZCBpcyBhdmFpbGFibGUgYXQgaHR0cHM6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLXYyMC5odG1sXHJcbiAgXHJcbiAgU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICBcclxuICBDb3B5cmlnaHQgQ29udHJpYnV0b3JzIHRvIHRoZSBab3dlIFByb2plY3QuXHJcbiovXHJcblxyXG5pbXBvcnQge1xyXG4gIE5nTW9kdWxlLFxyXG4gIERpcmVjdGl2ZSxcclxuICBDb21wb25lbnQsXHJcbiAgSW5wdXQsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgVmlld0NoaWxkLFxyXG4gIE9uSW5pdFxyXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbnRlcmZhY2UgUmVjdCB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbn1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3psdXhGbHlvdmVyXScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzcy5yZWwtcG9zaXRpb25lZF0nOiAndHJ1ZSdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBabHV4Rmx5b3ZlciB7XHJcbiAgQElucHV0KCkgZmx5b3ZlciE6IFpsdXhGbHlvdmVyQ29tcG9uZW50O1xyXG4gIEBJbnB1dCgpIHBvc2l0aW9uITogJ3RvcCcgfCAnYm90dG9tJyB8ICdsZWZ0JyB8ICdyaWdodCc7XHJcbiAgQElucHV0KCkgc2hvd0RlbGF5TXM6IG51bWJlciA9IDIwMDtcclxuICBASW5wdXQoKSB6bHV4Rmx5b3ZlckRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBwcmVwYXJpbmdUb1Nob3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikgeyB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxyXG4gIG9uTW91c2VFbnRlcihlOiBFdmVudCkge1xyXG4gICAgaWYgKHRoaXMuZmx5b3Zlcikge1xyXG4gICAgICBpZiAodGhpcy5mbHlvdmVyLmhpZGVUaW1lcikge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5mbHlvdmVyLmhpZGVUaW1lcik7XHJcbiAgICAgICAgdGhpcy5mbHlvdmVyLmZvcmNlSGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5pc0VuYWJsZWQoKSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnByZXBhcmluZ1RvU2hvdyA9IHRydWU7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLnByZXBhcmluZ1RvU2hvdykge1xyXG4gICAgICAgICAgdGhpcy5mbHlvdmVyLnNob3codGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLnBvc2l0aW9uKTtcclxuICAgICAgICAgIHRoaXMucHJlcGFyaW5nVG9TaG93ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAgIHRoaXMuc2hvd0RlbGF5TXMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXHJcbiAgb25Nb3VzZUxlYXZlKGU6IEV2ZW50KSB7XHJcbiAgICB0aGlzLnByZXBhcmluZ1RvU2hvdyA9IGZhbHNlO1xyXG4gICAgdGhpcy5mbHlvdmVyLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIGlzRW5hYmxlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLnpsdXhGbHlvdmVyRGlzYWJsZWQgIT09IHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogXCJ6bHV4LWZseW92ZXJcIixcclxuICB0ZW1wbGF0ZVVybDogXCJmbHlvdmVyLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgc3R5bGVVcmxzOiBbXCJmbHlvdmVyLmNvbXBvbmVudC5jc3NcIl0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBabHV4Rmx5b3ZlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgaGlkZURlbGF5TXM6IG51bWJlciA9IDIwMDtcclxuICB0b3AhOiBhbnk7XHJcbiAgbGVmdCE6IGFueTtcclxuICBob3ZlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHRhcmdldEhvdmVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgYWN0aXZlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgYXJyb3dUb3BPZmZzZXRMZWZ0ITogbnVtYmVyO1xyXG4gIGFycm93VG9wT2Zmc2V0Qm90dG9tITogbnVtYmVyO1xyXG4gIGFycm93Qm90dG9tT2Zmc2V0TGVmdCE6IG51bWJlcjtcclxuICBhcnJvd0JvdHRvbU9mZnNldEJvdHRvbSE6IG51bWJlcjtcclxuICBwb3NpdGlvbjogc3RyaW5nID0gJ3RvcCc7XHJcbiAgZmx5b3Zlck1hcmdpblJpZ2h0OiBudW1iZXIgPSAxNTtcclxuICBmbHlvdmVyTWFyZ2luTGVmdDogbnVtYmVyID0gMTU7XHJcbiAgZmx5b3Zlck1hcmdpblRvcDogbnVtYmVyID0gMTA7XHJcbiAgZmx5b3Zlck1hcmdpbkJvdHRvbTogbnVtYmVyID0gMjA7XHJcbiAgaGlkZVRpbWVyITogYW55O1xyXG5cclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuYXJyb3dUb3BPZmZzZXRMZWZ0ID0gdGhpcy5jb250ZW50QXJlYS5uYXRpdmVFbGVtZW50LmNsaWVudFdpZHRoIC8gMiAtIDEwO1xyXG4gICAgdGhpcy5hcnJvd1RvcE9mZnNldEJvdHRvbSA9IC05O1xyXG4gICAgdGhpcy5hcnJvd0JvdHRvbU9mZnNldExlZnQgPSB0aGlzLmNvbnRlbnRBcmVhLm5hdGl2ZUVsZW1lbnQuY2xpZW50V2lkdGggLyAyIC0gMTA7XHJcbiAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0Qm90dG9tID0gLTEwO1xyXG4gIH1cclxuXHJcbiAgQFZpZXdDaGlsZCgnYXJlYScpXHJcbiAgY29udGVudEFyZWEhOiBFbGVtZW50UmVmO1xyXG5cclxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcclxuICBvbk1vdXNlRW50ZXIoZTogRXZlbnQpIHtcclxuICAgIHRoaXMuaG92ZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpXHJcbiAgb25Nb3VzZUxlYXZlKGU6IEV2ZW50KSB7XHJcbiAgICB0aGlzLmhvdmVyID0gZmFsc2U7XHJcbiAgICB0aGlzLmhpZGUoKTtcclxuICB9XHJcblxyXG4gIHNob3cob25FbGVtZW50OiBhbnksIG9uUG9zaXRpb246ICd0b3AnIHwgJ2JvdHRvbScgfCAnbGVmdCcgfCAncmlnaHQnID0gJ3RvcCcpIHtcclxuICAgIGlmICh0aGlzLmhpZGVUaW1lcikge1xyXG4gICAgICB0aGlzLmZvcmNlSGlkZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG9uUG9zaXRpb247XHJcbiAgICBzd2l0Y2ggKG9uUG9zaXRpb24pIHtcclxuICAgICAgY2FzZSAndG9wJzoge1xyXG4gICAgICAgIHRoaXMuc2V0VG9wUG9zaXRpb24ob25FbGVtZW50KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdib3R0b20nOiB7XHJcbiAgICAgICAgdGhpcy5zZXRCb3R0b21Qb3NpdGlvbihvbkVsZW1lbnQpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgJ2xlZnQnOiB7XHJcbiAgICAgICAgdGhpcy5zZXRMZWZ0UG9zaXRpb24ob25FbGVtZW50KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgICBjYXNlICdyaWdodCc6IHtcclxuICAgICAgICB0aGlzLnNldFJpZ2h0UG9zaXRpb24ob25FbGVtZW50KTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy50YXJnZXRIb3ZlciA9IHRydWU7XHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIEdldFJlbGF0aXZlU2hpZnQob25FbDogYW55LCBjb250ZW50OiBhbnkpOiBSZWN0IHtcclxuICAgIGxldCBlbGVtID0gb25FbC5vZmZzZXRQYXJlbnQ7XHJcbiAgICBsZXQgcmVjdDogUmVjdCA9IHtcclxuICAgICAgdG9wOiAwLFxyXG4gICAgICBsZWZ0OiAwLFxyXG4gICAgICB3aWR0aDogZWxlbS5jbGllbnRXaWR0aCxcclxuICAgICAgaGVpZ2h0OiBlbGVtLmNsaWVudEhlaWdodFxyXG4gICAgfTtcclxuICAgIHdoaWxlIChlbGVtICE9PSBjb250ZW50Lm9mZnNldFBhcmVudCkge1xyXG4gICAgICByZWN0LnRvcCArPSBlbGVtLm9mZnNldFRvcDtcclxuICAgICAgcmVjdC5sZWZ0ICs9IGVsZW0ub2Zmc2V0TGVmdDtcclxuICAgICAgcmVjdC53aWR0aCA9IGVsZW0uY2xpZW50V2lkdGg7XHJcbiAgICAgIHJlY3QuaGVpZ2h0ID0gZWxlbS5jbGllbnRIZWlnaHQ7XHJcbiAgICAgIGVsZW0gPSBlbGVtLm9mZnNldFBhcmVudDtcclxuICAgIH1cclxuICAgIHJldHVybiByZWN0O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRUb3BQb3NpdGlvbihvbkVsOiBhbnkpIHtcclxuICAgIGxldCBjb250ZW50ID0gdGhpcy5jb250ZW50QXJlYS5uYXRpdmVFbGVtZW50O1xyXG4gICAgbGV0IHJlY3Q6IFJlY3QgPSB0aGlzLkdldFJlbGF0aXZlU2hpZnQob25FbCwgY29udGVudCk7XHJcbiAgICB0aGlzLnRvcCA9IHJlY3QudG9wICsgb25FbC5vZmZzZXRUb3AgLSBjb250ZW50LmNsaWVudEhlaWdodCAtIDIwO1xyXG4gICAgdGhpcy5sZWZ0ID0gcmVjdC5sZWZ0ICsgb25FbC5vZmZzZXRMZWZ0IC0gY29udGVudC5jbGllbnRXaWR0aCAvIDIgKyBvbkVsLm9mZnNldFdpZHRoIC8gMjtcclxuXHJcbiAgICB0aGlzLmFycm93VG9wT2Zmc2V0TGVmdCA9IGNvbnRlbnQuY2xpZW50V2lkdGggLyAyIC0gMTA7XHJcbiAgICB0aGlzLmFycm93VG9wT2Zmc2V0Qm90dG9tID0gLTk7XHJcbiAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0TGVmdCA9IGNvbnRlbnQuY2xpZW50V2lkdGggLyAyIC0gMTA7XHJcbiAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0Qm90dG9tID0gLTEwO1xyXG5cclxuICAgIHRoaXMuaG9yaXpvbnRhbEFsaWduKG9uRWwsIHJlY3QpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRCb3R0b21Qb3NpdGlvbihvbkVsOiBhbnkpIHtcclxuICAgIGxldCBjb250ZW50ID0gdGhpcy5jb250ZW50QXJlYS5uYXRpdmVFbGVtZW50O1xyXG4gICAgbGV0IHJlY3Q6IFJlY3QgPSB0aGlzLkdldFJlbGF0aXZlU2hpZnQob25FbCwgY29udGVudCk7XHJcbiAgICB0aGlzLnRvcCA9IHJlY3QudG9wICsgb25FbC5vZmZzZXRUb3AgKyBvbkVsLm9mZnNldEhlaWdodCArIDIwO1xyXG4gICAgdGhpcy5sZWZ0ID0gcmVjdC5sZWZ0ICsgb25FbC5vZmZzZXRMZWZ0IC0gY29udGVudC5jbGllbnRXaWR0aCAvIDIgKyBvbkVsLm9mZnNldFdpZHRoIC8gMjtcclxuXHJcbiAgICB0aGlzLmFycm93VG9wT2Zmc2V0TGVmdCA9IGNvbnRlbnQuY2xpZW50V2lkdGggLyAyIC0gMTA7XHJcbiAgICB0aGlzLmFycm93VG9wT2Zmc2V0Qm90dG9tID0gY29udGVudC5jbGllbnRIZWlnaHQgLSAxMjtcclxuICAgIHRoaXMuYXJyb3dCb3R0b21PZmZzZXRMZWZ0ID0gY29udGVudC5jbGllbnRXaWR0aCAvIDIgLSAxMDtcclxuICAgIHRoaXMuYXJyb3dCb3R0b21PZmZzZXRCb3R0b20gPSBjb250ZW50LmNsaWVudEhlaWdodCAtIDExO1xyXG5cclxuICAgIHRoaXMuaG9yaXpvbnRhbEFsaWduKG9uRWwsIHJlY3QpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBob3Jpem9udGFsQWxpZ24ob25FbDogYW55LCByZWN0OiBSZWN0KSB7XHJcbiAgICBsZXQgY29udGVudCA9IHRoaXMuY29udGVudEFyZWEubmF0aXZlRWxlbWVudDtcclxuICAgIGxldCBkaXN0VG9SaWdodEVkZ2UgPSByZWN0LndpZHRoIC0gb25FbC5vZmZzZXRXaWR0aCAvIDIgLSBvbkVsLm9mZnNldExlZnQgLSByZWN0LmxlZnQ7XHJcbiAgICBpZiAoZGlzdFRvUmlnaHRFZGdlIDwgY29udGVudC5jbGllbnRXaWR0aCAvIDIgKyB0aGlzLmZseW92ZXJNYXJnaW5SaWdodCkge1xyXG4gICAgICBsZXQgb2Zmc2V0ID0gY29udGVudC5jbGllbnRXaWR0aCAvIDIgLSBkaXN0VG9SaWdodEVkZ2UgKyB0aGlzLmZseW92ZXJNYXJnaW5SaWdodDtcclxuICAgICAgdGhpcy5sZWZ0IC09IG9mZnNldDtcclxuICAgICAgaWYgKGRpc3RUb1JpZ2h0RWRnZSA8IHRoaXMuZmx5b3Zlck1hcmdpblJpZ2h0ICsgMTUpXHJcbiAgICAgICAgb2Zmc2V0ID0gY29udGVudC5jbGllbnRXaWR0aCAvIDIgLSAxNTtcclxuICAgICAgdGhpcy5hcnJvd1RvcE9mZnNldExlZnQgKz0gb2Zmc2V0O1xyXG4gICAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0TGVmdCArPSBvZmZzZXQ7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgbGV0IGRpc3RUb0xlZnRFZGdlID0gb25FbC5vZmZzZXRXaWR0aCAvIDIgKyBvbkVsLm9mZnNldExlZnQgKyByZWN0LmxlZnQ7XHJcbiAgICAgIGlmIChkaXN0VG9MZWZ0RWRnZSA8IGNvbnRlbnQuY2xpZW50V2lkdGggLyAyICsgdGhpcy5mbHlvdmVyTWFyZ2luTGVmdCkge1xyXG4gICAgICAgIGxldCBvZmZzZXQgPSBjb250ZW50LmNsaWVudFdpZHRoIC8gMiAtIGRpc3RUb0xlZnRFZGdlICsgdGhpcy5mbHlvdmVyTWFyZ2luTGVmdDtcclxuICAgICAgICB0aGlzLmxlZnQgKz0gb2Zmc2V0O1xyXG4gICAgICAgIGlmIChkaXN0VG9MZWZ0RWRnZSA8IHRoaXMuZmx5b3Zlck1hcmdpbkxlZnQgKyAxNSlcclxuICAgICAgICAgIG9mZnNldCA9IGNvbnRlbnQuY2xpZW50V2lkdGggLyAyIC0gMTU7XHJcbiAgICAgICAgdGhpcy5hcnJvd1RvcE9mZnNldExlZnQgLT0gb2Zmc2V0O1xyXG4gICAgICAgIHRoaXMuYXJyb3dCb3R0b21PZmZzZXRMZWZ0IC09IG9mZnNldDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRMZWZ0UG9zaXRpb24ob25FbDogYW55KSB7XHJcbiAgICBsZXQgY29udGVudCA9IHRoaXMuY29udGVudEFyZWEubmF0aXZlRWxlbWVudDtcclxuICAgIGxldCByZWN0OiBSZWN0ID0gdGhpcy5HZXRSZWxhdGl2ZVNoaWZ0KG9uRWwsIGNvbnRlbnQpO1xyXG4gICAgdGhpcy50b3AgPSByZWN0LnRvcCArIG9uRWwub2Zmc2V0VG9wICsgb25FbC5vZmZzZXRIZWlnaHQgLyAyIC0gY29udGVudC5jbGllbnRIZWlnaHQgLyAyO1xyXG4gICAgdGhpcy5sZWZ0ID0gcmVjdC5sZWZ0ICsgb25FbC5vZmZzZXRMZWZ0IC0gY29udGVudC5jbGllbnRXaWR0aCAtIDIwO1xyXG5cclxuICAgIHRoaXMuYXJyb3dUb3BPZmZzZXRMZWZ0ID0gY29udGVudC5jbGllbnRXaWR0aCAtIDEyO1xyXG4gICAgdGhpcy5hcnJvd1RvcE9mZnNldEJvdHRvbSA9IGNvbnRlbnQuY2xpZW50SGVpZ2h0IC8gMiAtIDEwO1xyXG4gICAgdGhpcy5hcnJvd0JvdHRvbU9mZnNldExlZnQgPSBjb250ZW50LmNsaWVudFdpZHRoIC0gMTE7XHJcbiAgICB0aGlzLmFycm93Qm90dG9tT2Zmc2V0Qm90dG9tID0gY29udGVudC5jbGllbnRIZWlnaHQgLyAyIC0gMTA7XHJcblxyXG4gICAgdGhpcy52ZXJ0aWNhbEFsaWduKG9uRWwsIHJlY3QpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRSaWdodFBvc2l0aW9uKG9uRWw6IGFueSkge1xyXG4gICAgbGV0IGNvbnRlbnQgPSB0aGlzLmNvbnRlbnRBcmVhLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICBsZXQgcmVjdDogUmVjdCA9IHRoaXMuR2V0UmVsYXRpdmVTaGlmdChvbkVsLCBjb250ZW50KTtcclxuICAgIHRoaXMudG9wID0gcmVjdC50b3AgKyBvbkVsLm9mZnNldFRvcCArIG9uRWwub2Zmc2V0SGVpZ2h0IC8gMiAtIGNvbnRlbnQuY2xpZW50SGVpZ2h0IC8gMjtcclxuICAgIHRoaXMubGVmdCA9IHJlY3QubGVmdCArIG9uRWwub2Zmc2V0TGVmdCArIG9uRWwub2Zmc2V0V2lkdGggKyAyMDtcclxuXHJcbiAgICB0aGlzLmFycm93VG9wT2Zmc2V0TGVmdCA9IC0gOTtcclxuICAgIHRoaXMuYXJyb3dUb3BPZmZzZXRCb3R0b20gPSBjb250ZW50LmNsaWVudEhlaWdodCAvIDIgLSAxMDtcclxuICAgIHRoaXMuYXJyb3dCb3R0b21PZmZzZXRMZWZ0ID0gLSAxMDtcclxuICAgIHRoaXMuYXJyb3dCb3R0b21PZmZzZXRCb3R0b20gPSBjb250ZW50LmNsaWVudEhlaWdodCAvIDIgLSAxMDtcclxuXHJcbiAgICB0aGlzLnZlcnRpY2FsQWxpZ24ob25FbCwgcmVjdCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZlcnRpY2FsQWxpZ24ob25FbDogYW55LCByZWN0OiBSZWN0KSB7XHJcbiAgICBsZXQgY29udGVudCA9IHRoaXMuY29udGVudEFyZWEubmF0aXZlRWxlbWVudDtcclxuICAgIGxldCBkaXN0VG9Cb3R0b21FZGdlID0gcmVjdC5oZWlnaHQgKyBvbkVsLm9mZnNldEhlaWdodCAvIDIgLSBvbkVsLm9mZnNldFRvcCAtIHJlY3QudG9wO1xyXG4gICAgaWYgKGRpc3RUb0JvdHRvbUVkZ2UgPCBjb250ZW50LmNsaWVudEhlaWdodCAvIDIgKyB0aGlzLmZseW92ZXJNYXJnaW5Cb3R0b20pIHtcclxuICAgICAgbGV0IG9mZnNldCA9IGNvbnRlbnQuY2xpZW50SGVpZ2h0IC8gMiAtIGRpc3RUb0JvdHRvbUVkZ2UgKyB0aGlzLmZseW92ZXJNYXJnaW5Cb3R0b207XHJcbiAgICAgIHRoaXMudG9wIC09IG9mZnNldDtcclxuICAgICAgaWYgKGRpc3RUb0JvdHRvbUVkZ2UgPCB0aGlzLmZseW92ZXJNYXJnaW5Cb3R0b20gKyAxNSlcclxuICAgICAgICBvZmZzZXQgPSBjb250ZW50LmNsaWVudEhlaWdodCAvIDIgLSAxNTtcclxuICAgICAgdGhpcy5hcnJvd1RvcE9mZnNldEJvdHRvbSAtPSBvZmZzZXQ7XHJcbiAgICAgIHRoaXMuYXJyb3dCb3R0b21PZmZzZXRCb3R0b20gLT0gb2Zmc2V0O1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGxldCBkaXN0VG9Ub3BFZGdlID0gb25FbC5vZmZzZXRIZWlnaHQgLyAyICsgb25FbC5vZmZzZXRUb3AgKyByZWN0LnRvcDtcclxuICAgICAgaWYgKGRpc3RUb1RvcEVkZ2UgPCBjb250ZW50LmNsaWVudEhlaWdodCAvIDIgKyB0aGlzLmZseW92ZXJNYXJnaW5Ub3ApIHtcclxuICAgICAgICBsZXQgb2Zmc2V0ID0gY29udGVudC5jbGllbnRIZWlnaHQgLyAyIC0gZGlzdFRvVG9wRWRnZSArIHRoaXMuZmx5b3Zlck1hcmdpblRvcDtcclxuICAgICAgICB0aGlzLnRvcCArPSBvZmZzZXQ7XHJcbiAgICAgICAgaWYgKGRpc3RUb1RvcEVkZ2UgPCB0aGlzLmZseW92ZXJNYXJnaW5Ub3AgKyAxNSlcclxuICAgICAgICAgIG9mZnNldCA9IGNvbnRlbnQuY2xpZW50SGVpZ2h0IC8gMiAtIDE1O1xyXG4gICAgICAgIHRoaXMuYXJyb3dUb3BPZmZzZXRCb3R0b20gKz0gb2Zmc2V0O1xyXG4gICAgICAgIHRoaXMuYXJyb3dCb3R0b21PZmZzZXRCb3R0b20gKz0gb2Zmc2V0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBoaWRlKCkge1xyXG4gICAgdGhpcy50YXJnZXRIb3ZlciA9IGZhbHNlO1xyXG4gICAgdGhpcy5oaWRlVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuZm9yY2VIaWRlKCk7XHJcbiAgICB9LCB0aGlzLmhpZGVEZWxheU1zKTtcclxuICB9XHJcblxyXG4gIGZvcmNlSGlkZSgpIHtcclxuICAgIGlmICghdGhpcy50YXJnZXRIb3ZlciAmJiAhdGhpcy5ob3Zlcikge1xyXG4gICAgICB0aGlzLnRvcCA9IHVuZGVmaW5lZDtcclxuICAgICAgdGhpcy5sZWZ0ID0gdW5kZWZpbmVkO1xyXG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oaWRlVGltZXIgPSBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBleHBvcnRzOiBbWmx1eEZseW92ZXJDb21wb25lbnQsIFpsdXhGbHlvdmVyXSxcclxuICBkZWNsYXJhdGlvbnM6IFtabHV4Rmx5b3ZlckNvbXBvbmVudCwgWmx1eEZseW92ZXJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBabHV4Rmx5b3Zlck1vZHVsZSB7IH1cclxuXHJcblxyXG4vKlxyXG4gIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlXHJcbiAgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIHYyLjAgd2hpY2ggYWNjb21wYW5pZXNcclxuICB0aGlzIGRpc3RyaWJ1dGlvbiwgYW5kIGlzIGF2YWlsYWJsZSBhdCBodHRwczovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtdjIwLmh0bWxcclxuICBcclxuICBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxyXG4gIFxyXG4gIENvcHlyaWdodCBDb250cmlidXRvcnMgdG8gdGhlIFpvd2UgUHJvamVjdC5cclxuKi9cclxuXHJcbiIsIlxyXG5cclxuPCEtLSBcclxuICBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZVxyXG4gIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSB2Mi4wIHdoaWNoIGFjY29tcGFuaWVzXHJcbiAgdGhpcyBkaXN0cmlidXRpb24sIGFuZCBpcyBhdmFpbGFibGUgYXQgaHR0cHM6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLXYyMC5odG1sXHJcbiAgXHJcbiAgU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICBcclxuICBDb3B5cmlnaHQgQ29udHJpYnV0b3JzIHRvIHRoZSBab3dlIFByb2plY3QuXHJcbi0tPlxyXG5cclxuPGRpdiBjbGFzcz1cInpsdXgtZmx5b3Zlci1hcmVhXCJcclxuICBbc3R5bGUudG9wXT1cIihhY3RpdmU9PXRydWU/dG9wOi05OTk5KSsncHgnXCJcclxuICBbc3R5bGUubGVmdF09XCIoYWN0aXZlPT10cnVlP2xlZnQ6LTk5OTkpKydweCdcIlxyXG4gICNhcmVhPlxyXG4gIDxkaXYgY2xhc3M9XCJ6bHV4LWZseW92ZXItY29udGVudFwiPlxyXG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJ6bHV4LWZseW92ZXItYXJyb3ctdG9wLWxheWVyXCJcclxuICAgIFtzdHlsZS5sZWZ0XT1cImFycm93VG9wT2Zmc2V0TGVmdCsncHgnXCJcclxuICAgIFtzdHlsZS5ib3R0b21dPVwiYXJyb3dUb3BPZmZzZXRCb3R0b20rJ3B4J1wiXHJcbiAgICBbbmdDbGFzc109XCJ7XHJcbiAgICAgICd0b3AnOiBwb3NpdGlvbj09J3RvcCcsXHJcbiAgICAgICdib3R0b20nOiBwb3NpdGlvbj09J2JvdHRvbScsXHJcbiAgICAgICdsZWZ0JzogcG9zaXRpb249PSdsZWZ0JyxcclxuICAgICAgJ3JpZ2h0JzogcG9zaXRpb249PSdyaWdodCdcclxuICAgIH1cIj48L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiemx1eC1mbHlvdmVyLWFycm93LWJvdHRvbS1sYXllclwiXHJcbiAgICBbc3R5bGUubGVmdF09XCJhcnJvd0JvdHRvbU9mZnNldExlZnQrJ3B4J1wiXHJcbiAgICBbc3R5bGUuYm90dG9tXT1cImFycm93Qm90dG9tT2Zmc2V0Qm90dG9tKydweCdcIj48L2Rpdj5cclxuPC9kaXY+XHJcblxyXG5cclxuPCEtLSBcclxuICBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZVxyXG4gIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSB2Mi4wIHdoaWNoIGFjY29tcGFuaWVzXHJcbiAgdGhpcyBkaXN0cmlidXRpb24sIGFuZCBpcyBhdmFpbGFibGUgYXQgaHR0cHM6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLXYyMC5odG1sXHJcbiAgXHJcbiAgU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICBcclxuICBDb3B5cmlnaHQgQ29udHJpYnV0b3JzIHRvIHRoZSBab3dlIFByb2plY3QuXHJcbi0tPlxyXG5cclxuIl19