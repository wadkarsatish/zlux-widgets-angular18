import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../button/button.component";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxErrorReportComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ZluxErrorReportComponent, "zlux-error-report", never, { "severity": { "alias": "severity"; "required": false; }; "title": { "alias": "title"; "required": false; }; "theme": { "alias": "theme"; "required": false; }; "style": { "alias": "style"; "required": false; }; "buttons": { "alias": "buttons"; "required": false; }; "timestamp": { "alias": "timestamp"; "required": false; }; "callToAction": { "alias": "callToAction"; "required": false; }; }, { "action": "action"; }, never, ["*"], false, never>;
}
export declare class ZluxErrorReportModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxErrorReportModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ZluxErrorReportModule, [typeof ZluxErrorReportComponent], [typeof i1.CommonModule, typeof i2.ZluxButtonModule], [typeof ZluxErrorReportComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ZluxErrorReportModule>;
}
//# sourceMappingURL=error-report.component.d.ts.map