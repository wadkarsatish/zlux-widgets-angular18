import { ZluxPopupManagerService, ErrorReportStruct } from '../../services/popup-manager.service';
export declare class ZluxPopupManagerComponent {
    private popupManager;
    static REPORT_VISIBLE_TIMEOUT: number;
    blockCount: number;
    currentErrorBlocking: ErrorReportStruct;
    currentErrorNonblocking: ErrorReportStruct;
    errors: ErrorReportStruct[];
    constructor(popupManager: ZluxPopupManagerService);
    updateErrors(): void;
    createReport(error: any): void;
    removeReport(id: number): void;
    block(): void;
    unblock(): void;
    closeForegroundError(error: any): void;
    onChoose(error: any, buttonCaption: any): void;
    getClass(): string;
}
export declare class ZluxPopupManagerModule {
}
