

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { NgModule, Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: "zlux-checkbox",
  templateUrl: "checkbox.component.html",
  styleUrls: ["checkbox.component.css"]
})
export class ZluxCheckboxComponent {
  @Input() value: boolean = false;
  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() label: string = '';
  @Input() inputId: string = '';
  @Input() dark: boolean = false;
  @Input() disabled: boolean = false;
  @Input() style: any;
  @Input() styleClass: string = '';

  onValueChange(model: boolean) {
    this.value = model;
    console.log('checkbox value', model);
    this.valueChange.emit(model);
  }
}

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [ZluxCheckboxComponent],
  declarations: [ZluxCheckboxComponent]
})
export class ZluxCheckboxModule { }


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

