import { EventEmitter } from '@angular/core';
export declare class ZluxErrorReportComponent {
    severity: string;
    title: string;
    theme: string;
    style: any;
    buttons: string[];
    timestamp: Date | undefined;
    callToAction: boolean;
    action: EventEmitter<any>;
    constructor();
}
export declare class ZluxErrorReportModule {
}
