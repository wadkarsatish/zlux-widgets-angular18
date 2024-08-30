

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { NgModule, Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ZluxPopupWindowButtonAreaComponent } from '../popup-window-button-area/popup-window-button-area.component';
import { ZluxPopupManagerService } from '../../services/popup-manager.service';

@Component({
  selector: "zlux-popup-window",
  templateUrl: "popup-window.component.html",
  styleUrls: ["popup-window.component.css"]
})
export class ZluxPopupWindowComponent implements OnInit, OnDestroy {
  @Input() header: string = '';
  @Input() dark: boolean = false;
  @Input() currentStyle: popupWindowPopupStyle = {};
  @Input() maxWidth: string = "";
  @Input() maxHeight: string = "";

  @Output() onCloseWindow = new EventEmitter<any>();

  popupStyle: popupWindowPopupStyle = {};
  constructor(private popupManager: ZluxPopupManagerService) { }
  ngOnInit() {
    if (this.currentStyle) {
      this.popupStyle = this.currentStyle;
    }
    if (this.maxWidth) {
      this.popupStyle['max-width'] = this.maxWidth;
    }
    if (this.maxHeight) {
      this.popupStyle['max-height'] = this.maxHeight;
    }
    this.popupManager.block();
  }

  ngOnDestroy() {
    this.popupManager.unblock();
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [ZluxPopupWindowComponent, ZluxPopupWindowButtonAreaComponent],
  declarations: [ZluxPopupWindowComponent, ZluxPopupWindowButtonAreaComponent],
  providers: [ZluxPopupManagerService]
})
export class ZluxPopupWindowModule { }

export interface popupWindowPopupStyle {
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

