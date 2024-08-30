

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'zlux-veil',
  templateUrl: './veil.component.html',
  styleUrls: ['./veil.component.css']
})

export class ZluxVeilComponent {
  @Input() isEnabled: boolean = false;
  @Input() enableSpinner: boolean = false;
}

@NgModule({
  imports: [CommonModule],
  exports: [ZluxVeilComponent],
  declarations: [ZluxVeilComponent]
})
export class ZluxVeilModule { }

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

