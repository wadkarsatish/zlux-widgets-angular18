import { EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
import * as i3 from "../button/button.component";
import * as i4 from "../inputtext/inputtext";
import * as i5 from "../flyover/flyover.component";
export declare class ZluxPaginatorComponent implements OnChanges {
    rows: number;
    totalRecords: number;
    hasMoreRecords: boolean;
    onPageChange: EventEmitter<any>;
    onFetchMoreData: EventEmitter<void>;
    pageIndex: number;
    loadedPageNumber: number;
    isInputIncorrect: boolean;
    preventEvent: boolean;
    get indexMax(): number;
    get indexMin(): number;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterContentChecked(): void;
    onChange(event: any): void;
    onPrevButtonClick(): void;
    onNextButtonClick(): void;
    onFirstButtonClick(): void;
    pageChange(): void;
    changePage(pageIndex: number): void;
    toLastPage(): void;
    fetchMoreData(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxPaginatorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ZluxPaginatorComponent, "zlux-paginator", never, { "rows": { "alias": "rows"; "required": false; }; "totalRecords": { "alias": "totalRecords"; "required": false; }; "hasMoreRecords": { "alias": "hasMoreRecords"; "required": false; }; }, { "onPageChange": "onPageChange"; "onFetchMoreData": "onFetchMoreData"; }, never, never, false, never>;
}
export declare class ZluxPaginatorModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxPaginatorModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ZluxPaginatorModule, [typeof ZluxPaginatorComponent], [typeof i1.FormsModule, typeof i2.CommonModule, typeof i3.ZluxButtonModule, typeof i4.ZluxInputTextModule, typeof i5.ZluxFlyoverModule], [typeof ZluxPaginatorComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ZluxPaginatorModule>;
}
//# sourceMappingURL=paginator.component.d.ts.map