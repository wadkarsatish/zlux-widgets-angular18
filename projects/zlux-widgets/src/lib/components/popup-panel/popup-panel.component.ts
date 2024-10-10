

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { NgModule, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZluxPopupManagerService } from '../../services/popup-manager.service';

@Component({
  selector: "zlux-popup-panel",
  templateUrl: "popup-panel.component.html",
  styleUrls: ["popup-panel.component.css"],
})
export class ZluxPopupPanelComponent implements OnInit, OnDestroy{
  isActive: boolean = false;
  @Input() modal: boolean = false;
  @Input() autoShow: boolean = false;
  @Input() ignoreVeil: boolean = false;
  @Input() blockDisplay: boolean = false;

  constructor(private popupManager: ZluxPopupManagerService) {

  }

  ngOnInit() {
    if (this.autoShow) {
      this.show();
    }
  }

  ngOnDestroy() {
    if (this.autoShow) {
      this.hide();
    }
  }

  show() {
    if (this.modal) {
      this.popupManager.block();
    }

    this.isActive = true;
  }

  hide() {
    if (this.modal) {
      this.popupManager.unblock();
    }
    this.isActive = false;
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [ZluxPopupPanelComponent],
  declarations: [ZluxPopupPanelComponent],
  providers: [ZluxPopupManagerService]
})
export class ZluxPopupPanelModule { }


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

