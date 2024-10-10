

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { NgModule, Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component({
  selector: "zlux-button",
  templateUrl: "button.component.html",
  styleUrls: ["button.component.css"],
})
export class ZluxButtonComponent {
  @Input() buttonType: string = 'button';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() callToAction: boolean = false;
  @Input() lightSkin: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
}

@NgModule({
  imports: [CommonModule],
  exports: [ZluxButtonComponent],
  declarations: [ZluxButtonComponent]
})
export class ZluxButtonModule { }


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

