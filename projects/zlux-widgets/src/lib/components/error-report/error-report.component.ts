

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { NgModule, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZluxButtonModule } from '../button/button.component';

@Component({
  selector: "zlux-error-report",
  templateUrl: "error-report.component.html",
  styleUrls: ["error-report.component.css"],
})
export class ZluxErrorReportComponent {
  @Input() severity: string = 'error';
  @Input() title: string = '';
  @Input() theme: string = '';
  @Input() style: any = {};
  @Input() buttons: string[] = [];
  @Input() timestamp: Date | undefined = undefined;
  @Input() callToAction: boolean = false;

  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }
}

@NgModule({
  imports: [CommonModule, ZluxButtonModule],
  exports: [ZluxErrorReportComponent],
  declarations: [ZluxErrorReportComponent]
})
export class ZluxErrorReportModule { }


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

