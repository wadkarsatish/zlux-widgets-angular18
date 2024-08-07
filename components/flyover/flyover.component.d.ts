import { ElementRef, OnInit } from "@angular/core";
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
}
export declare class ZluxFlyoverComponent implements OnInit {
    el: ElementRef;
    hideDelayMs: number;
    top: number;
    left: number;
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
    hideTimer: number;
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
}
export declare class ZluxFlyoverModule {
}
