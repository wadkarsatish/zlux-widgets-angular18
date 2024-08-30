import { Subject, Observable } from 'rxjs';
import * as i0 from "@angular/core";
export interface ErrorReportStruct {
    severity: string;
    modal: boolean;
    text: string;
    title: string;
    buttons: string[];
    id: number;
    timestamp: Date | undefined;
    subject: Subject<any>;
    theme?: string;
    style?: {};
    callToAction?: boolean;
}
export declare enum ZluxErrorSeverity {
    ERROR = "error",
    WARNING = "warning",
    INFO = "info"
}
export declare class ZluxPopupManagerService {
    eventsSubject: any;
    listeners: any;
    events: any;
    logger: any;
    constructor();
    setLogger(logger: any): void;
    on(name: any, listener: any): void;
    broadcast(name: any, ...args: any[]): void;
    processButtons(buttons: any[]): any[];
    block(): void;
    unblock(): void;
    getLoggerSeverity(severity: ZluxErrorSeverity): any;
    removeReport(id: number): void;
    createErrorReport(severity: ZluxErrorSeverity, title: string, text: string, options?: any): ErrorReportStruct;
    reportError(severity: ZluxErrorSeverity, title: string, text: string, options?: any): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxPopupManagerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ZluxPopupManagerService>;
}
//# sourceMappingURL=popup-manager.service.d.ts.map