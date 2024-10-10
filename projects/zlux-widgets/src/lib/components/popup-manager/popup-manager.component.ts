

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZluxPopupPanelModule } from '../popup-panel/popup-panel.component';
import { ZluxErrorReportModule } from '../error-report/error-report.component';
import { ZluxPopupManagerService, ErrorReportStruct } from '../../services/popup-manager.service';

@Component({
  selector: "zlux-popup-manager",
  templateUrl: "popup-manager.component.html",
  styleUrls: ["popup-manager.component.css"],
})
export class ZluxPopupManagerComponent {
  static REPORT_VISIBLE_TIMEOUT: number = 15;

  blockCount: number = 0;
  currentErrorBlocking: ErrorReportStruct | any = null;
  currentErrorNonblocking: ErrorReportStruct | any = null;
  errors: ErrorReportStruct[] = [];

  constructor(private popupManager: ZluxPopupManagerService) {
    popupManager.on('block', this.block.bind(this));
    popupManager.on('unblock', this.unblock.bind(this));
    popupManager.on('createReport', (error: ErrorReportStruct) => this.createReport(error));
    popupManager.on('removeReport', (id: number) => this.removeReport(id));
  }

  updateErrors() {
    if (this.currentErrorBlocking == null) {
      const found = this.errors.find(elem => elem.modal);
      if (found) {
        this.currentErrorBlocking = found;
        this.errors = this.errors.filter(i => i !== found);
      }
    }
    if (this.currentErrorNonblocking == null) {
      const found = this.errors.find(elem => !elem.modal);
      if (found) {
        this.currentErrorNonblocking = found;
        this.errors = this.errors.filter(i => i !== found);
      }
    }
  }

  createReport(error) {
    error = Object.assign({}, error);
    error.buttonCaptions = error.buttons.map(b => b.caption);
    this.errors.push(error);
    if (error.modal) {
      this.block();
    }
    this.updateErrors();
  }

  removeReport(id: number) {
    if (this.currentErrorBlocking && this.currentErrorBlocking.id === id) {
      this.closeForegroundError(this.currentErrorBlocking);
    } else if (this.currentErrorNonblocking && this.currentErrorNonblocking.id === id) {
      this.closeForegroundError(this.currentErrorNonblocking);
    } else {
      for (let i = 0; i < this.errors.length; i++) {
        if (this.errors[i].id === id) {
          this.errors.splice(i, 1);
        }
      }
    }
  }

  block() {
    this.blockCount++;
  }

  unblock() {
    this.blockCount--;
  }

  closeForegroundError(error) {
    if (error === this.currentErrorBlocking) {
      this.unblock();
      this.currentErrorBlocking = null;
    } else {
      this.currentErrorNonblocking = null;
    }
    this.updateErrors();
  }

  onChoose(error, buttonCaption) {
    const button = error.buttons.find(b => b.caption === buttonCaption);
    if (button.closeReport) {
      this.closeForegroundError(error);
    }
    error.subject.next(buttonCaption);
  }

  getClass() {
    const _class = 'popup-shadow-hover';
    if (this.blockCount === 0) {
      return _class + ' hidden';
    }
    return null;
  }
}

@NgModule({
  imports: [CommonModule, ZluxPopupPanelModule, ZluxErrorReportModule],
  exports: [ZluxPopupManagerComponent],
  declarations: [ZluxPopupManagerComponent],
  providers: [ZluxPopupManagerService]
})
export class ZluxPopupManagerModule { }


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

