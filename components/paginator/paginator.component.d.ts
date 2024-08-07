import { EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import '../../assets/images/FirstPage.svg';
import '../../assets/images/NextPage.svg';
import '../../assets/images/PrevPage.svg';
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
}
export declare class ZluxPaginatorModule {
}
