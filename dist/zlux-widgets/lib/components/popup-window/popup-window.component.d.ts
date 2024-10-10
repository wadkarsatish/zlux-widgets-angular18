import { EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { ZluxPopupManagerService } from '../../services/popup-manager.service';
import * as i0 from "@angular/core";
import * as i1 from "../popup-window-button-area/popup-window-button-area.component";
import * as i2 from "@angular/common";
export declare class ZluxPopupWindowComponent implements OnInit, OnDestroy {
    private popupManager;
    header: string;
    dark: boolean;
    currentStyle: popupWindowPopupStyle;
    maxWidth: string;
    maxHeight: string;
    onCloseWindow: EventEmitter<any>;
    popupStyle: popupWindowPopupStyle;
    constructor(popupManager: ZluxPopupManagerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxPopupWindowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ZluxPopupWindowComponent, "zlux-popup-window", never, { "header": { "alias": "header"; "required": false; }; "dark": { "alias": "dark"; "required": false; }; "currentStyle": { "alias": "currentStyle"; "required": false; }; "maxWidth": { "alias": "maxWidth"; "required": false; }; "maxHeight": { "alias": "maxHeight"; "required": false; }; }, { "onCloseWindow": "onCloseWindow"; }, never, ["*", "zlux-popup-window-button-area"], false, never>;
}
export declare class ZluxPopupWindowModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxPopupWindowModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ZluxPopupWindowModule, [typeof ZluxPopupWindowComponent, typeof i1.ZluxPopupWindowButtonAreaComponent], [typeof i2.CommonModule], [typeof ZluxPopupWindowComponent, typeof i1.ZluxPopupWindowButtonAreaComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ZluxPopupWindowModule>;
}
export interface popupWindowPopupStyle {
}
//# sourceMappingURL=popup-window.component.d.ts.map