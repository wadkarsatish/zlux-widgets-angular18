import { ElementRef, AfterViewInit } from '@angular/core';
export declare class ZluxTabbingComponent implements AfterViewInit {
    private elementRef;
    hiddenIds: string;
    hiddenPos: string;
    private totalTabs;
    private activeTab;
    private tabEvent;
    private focusableArr;
    private idArr;
    private parentRef;
    constructor(elementRef: ElementRef);
    ngAfterViewInit(): void;
    initValues(eleRef: HTMLElement): void;
    tabToNext(e: KeyboardEvent): void;
    tabToPrev(e: KeyboardEvent): void;
    switchTab(isForward: boolean): void;
    moveForward(): void;
    moveBackward(): void;
    setFocusActiveTab(isForward: boolean): void;
    isElementDisabled(element: HTMLElement): boolean;
    focusElement(element: HTMLElement): void;
    checkAndAddElmAgain(selector: string, elmIndex: number): HTMLElement;
    getElementSelector(elm: HTMLElement): string;
    getIdSelector(elm: HTMLElement): string;
    getAttributeSelector(elm: HTMLElement): string;
    getClassListSelector(elm: HTMLElement): string;
    syncActiveTab(elm: HTMLElement): void;
    extractTabId(elm: HTMLElement): number;
    findAllFocusable(domRef: HTMLElement): any[];
    getAllIds(focusableArr: HTMLElement[]): any[];
}
export declare class ZluxTabbingModule {
}
