import { OnInit, OnDestroy } from '@angular/core';
import { ZluxPopupManagerService } from '../../services/popup-manager.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class ZluxPopupPanelComponent implements OnInit, OnDestroy {
    private popupManager;
    isActive: boolean;
    modal: boolean;
    autoShow: boolean;
    ignoreVeil: boolean;
    blockDisplay: boolean;
    constructor(popupManager: ZluxPopupManagerService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    show(): void;
    hide(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxPopupPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ZluxPopupPanelComponent, "zlux-popup-panel", never, { "modal": { "alias": "modal"; "required": false; }; "autoShow": { "alias": "autoShow"; "required": false; }; "ignoreVeil": { "alias": "ignoreVeil"; "required": false; }; "blockDisplay": { "alias": "blockDisplay"; "required": false; }; }, {}, never, ["*"], false, never>;
}
export declare class ZluxPopupPanelModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxPopupPanelModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ZluxPopupPanelModule, [typeof ZluxPopupPanelComponent], [typeof i1.CommonModule], [typeof ZluxPopupPanelComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ZluxPopupPanelModule>;
}
//# sourceMappingURL=popup-panel.component.d.ts.map