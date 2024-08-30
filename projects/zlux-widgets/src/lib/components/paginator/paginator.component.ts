

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import {
  NgModule, Component, Input, Output, EventEmitter,
  OnChanges, SimpleChanges
} from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZluxButtonModule } from '../button/button.component';
import { ZluxInputTextModule } from '../inputtext/inputtext';
import { ZluxFlyoverModule } from '../flyover/flyover.component';

@Component({
  selector: "zlux-paginator",
  templateUrl: "paginator.component.html",
  styleUrls: ["paginator.component.css"]
})
export class ZluxPaginatorComponent implements OnChanges {
  @Input() rows: number = 0;
  @Input() totalRecords: number = 0;
  @Input() hasMoreRecords: boolean = false;
  @Output() onPageChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onFetchMoreData: EventEmitter<void> = new EventEmitter<void>();
  public pageIndex: number = -1;
  loadedPageNumber: number = 0;
  isInputIncorrect: boolean = false;
  preventEvent: boolean = false;
  get indexMax(): number {
    return this.totalRecords > (this.pageIndex + 1) * this.rows ? (this.pageIndex + 1) * this.rows : this.totalRecords;
  }
  get indexMin(): number {
    return this.indexMax > 0 ? this.pageIndex * this.rows + 1 : 0;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rows']) {
      this.loadedPageNumber = Math.ceil(this.totalRecords / this.rows);
      if (this.loadedPageNumber === 0 || isNaN(this.loadedPageNumber))
        this.loadedPageNumber = 0;
      if (this.pageIndex >= this.loadedPageNumber) {
        this.pageIndex = this.loadedPageNumber - 1;
        this.pageChange();
      }
    }
  }

  ngAfterContentChecked() {
    this.loadedPageNumber = Math.ceil(this.totalRecords / this.rows);
    if (this.loadedPageNumber === 0 || isNaN(this.loadedPageNumber))
      this.loadedPageNumber = 0;
  }

  onChange(event: any) {
    let value: number = Number(event.target.value);
    if (value >= 1 && value <= this.loadedPageNumber) {
      if (this.pageIndex != value - 1) {
        this.pageIndex = value - 1;
        this.pageChange();
      }
      this.isInputIncorrect = false;
    }
    else {
      this.isInputIncorrect = true;
    }
  }

  onPrevButtonClick() {
    if (this.pageIndex <= 0) {
      return;
    }
    this.pageIndex--;
    this.isInputIncorrect = false;
    this.pageChange();
  }

  onNextButtonClick() {
    if (this.pageIndex + 1 >= this.loadedPageNumber && !this.hasMoreRecords) {
      return;
    }
    this.pageIndex++;
    this.isInputIncorrect = false;
    this.pageChange();
  }

  onFirstButtonClick() {
    this.pageIndex = 0;
    this.isInputIncorrect = false;
    this.pageChange();
  }

  pageChange() {
    if (!this.preventEvent && this.pageIndex >= 0) {
      this.onPageChange.emit({
        first: this.pageIndex * this.rows,
        rows: this.rows
      });
    }
  }

  changePage(pageIndex: number) {
    this.preventEvent = true;
    this.pageIndex = pageIndex;
    this.isInputIncorrect = false;
    this.preventEvent = false;
  }

  toLastPage() {
    if (this.pageIndex !== this.loadedPageNumber - 1) {
      this.pageIndex = this.loadedPageNumber - 1;
      this.isInputIncorrect = false;
      this.pageChange();
    }
  }

  fetchMoreData() {
    this.onFetchMoreData.emit();
  }
}

@NgModule({
  imports: [FormsModule, CommonModule, ZluxButtonModule, ZluxInputTextModule, ZluxFlyoverModule],
  exports: [ZluxPaginatorComponent],
  declarations: [ZluxPaginatorComponent]
})
export class ZluxPaginatorModule { }


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

