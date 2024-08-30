import { ZluxPopupManagerService, ErrorReportStruct } from '../../services/popup-manager.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../popup-panel/popup-panel.component";
import * as i3 from "../error-report/error-report.component";
export declare class ZluxPopupManagerComponent {
    private popupManager;
    static REPORT_VISIBLE_TIMEOUT: number;
    blockCount: number;
    currentErrorBlocking: ErrorReportStruct | any;
    currentErrorNonblocking: ErrorReportStruct | any;
    errors: ErrorReportStruct[];
    constructor(popupManager: ZluxPopupManagerService);
    updateErrors(): void;
    createReport(error: any): void;
    removeReport(id: number): void;
    block(): void;
    unblock(): void;
    closeForegroundError(error: any): void;
    onChoose(error: any, buttonCaption: any): void;
    getClass(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxPopupManagerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ZluxPopupManagerComponent, "zlux-popup-manager", never, {}, {}, never, never, false, never>;
}
export declare class ZluxPopupManagerModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxPopupManagerModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ZluxPopupManagerModule, [typeof ZluxPopupManagerComponent], [typeof i1.CommonModule, typeof i2.ZluxPopupPanelModule, typeof i3.ZluxErrorReportModule], [typeof ZluxPopupManagerComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ZluxPopupManagerModule>;
}
//# sourceMappingURL=popup-manager.component.d.ts.map