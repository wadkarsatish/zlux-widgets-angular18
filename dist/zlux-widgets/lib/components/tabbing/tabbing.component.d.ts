import { ElementRef, AfterViewInit } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
    checkAndAddElmAgain(selector: string, elmIndex: number): HTMLElement | null;
    getElementSelector(elm: HTMLElement): string;
    getIdSelector(elm: HTMLElement): string;
    getAttributeSelector(elm: HTMLElement): string;
    getClassListSelector(elm: HTMLElement): string;
    syncActiveTab(elm: HTMLElement): void;
    extractTabId(elm: HTMLElement): number;
    findAllFocusable(domRef: HTMLElement): HTMLElement[];
    getAllIds(focusableArr: HTMLElement[]): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxTabbingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ZluxTabbingComponent, "zlux-tab-trap", never, { "hiddenIds": { "alias": "hiddenIds"; "required": false; }; "hiddenPos": { "alias": "hiddenPos"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class ZluxTabbingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxTabbingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ZluxTabbingModule, [typeof ZluxTabbingComponent], [typeof i1.CommonModule], [typeof ZluxTabbingComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ZluxTabbingModule>;
}
//# sourceMappingURL=tabbing.component.d.ts.map