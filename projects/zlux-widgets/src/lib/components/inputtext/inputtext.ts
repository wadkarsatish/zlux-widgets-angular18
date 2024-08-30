

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { NgModule, Directive, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
// import '../../assets/css/inputtext.css';

@Directive({
  selector: '[zluxInputText]',
  host: {
    '[class.text-input]': 'true',
    '[class.text-input-dark]': 'dark'
  },
})
export class ZluxInputText {
  @Input() dark: boolean = false;
}

@NgModule({
  imports: [CommonModule],
  exports: [ZluxInputText],
  declarations: [ZluxInputText]
})
export class ZluxInputTextModule { }


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

