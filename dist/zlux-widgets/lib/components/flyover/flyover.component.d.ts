import { ElementRef, OnInit } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class ZluxFlyover {
    private el;
    flyover: ZluxFlyoverComponent;
    position: 'top' | 'bottom' | 'left' | 'right';
    showDelayMs: number;
    zluxFlyoverDisabled: boolean;
    private preparingToShow;
    constructor(el: ElementRef);
    onMouseEnter(e: Event): void;
    onMouseLeave(e: Event): void;
    isEnabled(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxFlyover, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ZluxFlyover, "[zluxFlyover]", never, { "flyover": { "alias": "flyover"; "required": false; }; "position": { "alias": "position"; "required": false; }; "showDelayMs": { "alias": "showDelayMs"; "required": false; }; "zluxFlyoverDisabled": { "alias": "zluxFlyoverDisabled"; "required": false; }; }, {}, never, never, false, never>;
}
export declare class ZluxFlyoverComponent implements OnInit {
    el: ElementRef;
    hideDelayMs: number;
    top: any;
    left: any;
    hover: boolean;
    targetHover: boolean;
    active: boolean;
    arrowTopOffsetLeft: number;
    arrowTopOffsetBottom: number;
    arrowBottomOffsetLeft: number;
    arrowBottomOffsetBottom: number;
    position: string;
    flyoverMarginRight: number;
    flyoverMarginLeft: number;
    flyoverMarginTop: number;
    flyoverMarginBottom: number;
    hideTimer: any;
    constructor(el: ElementRef);
    ngOnInit(): void;
    contentArea: ElementRef;
    onMouseEnter(e: Event): void;
    onMouseLeave(e: Event): void;
    show(onElement: any, onPosition?: 'top' | 'bottom' | 'left' | 'right'): void;
    private GetRelativeShift;
    private setTopPosition;
    private setBottomPosition;
    private horizontalAlign;
    private setLeftPosition;
    private setRightPosition;
    private verticalAlign;
    hide(): void;
    forceHide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxFlyoverComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ZluxFlyoverComponent, "zlux-flyover", never, { "hideDelayMs": { "alias": "hideDelayMs"; "required": false; }; }, {}, never, ["*"], false, never>;
}
export declare class ZluxFlyoverModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxFlyoverModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ZluxFlyoverModule, [typeof ZluxFlyoverComponent, typeof ZluxFlyover], [typeof i1.CommonModule], [typeof ZluxFlyoverComponent, typeof ZluxFlyover]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ZluxFlyoverModule>;
}
//# sourceMappingURL=flyover.component.d.ts.map