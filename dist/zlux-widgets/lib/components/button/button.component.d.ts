import { EventEmitter } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export declare class ZluxButtonComponent {
    buttonType: string;
    label: string;
    disabled: boolean;
    callToAction: boolean;
    lightSkin: boolean;
    onClick: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ZluxButtonComponent, "zlux-button", never, { "buttonType": { "alias": "buttonType"; "required": false; }; "label": { "alias": "label"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "callToAction": { "alias": "callToAction"; "required": false; }; "lightSkin": { "alias": "lightSkin"; "required": false; }; }, { "onClick": "onClick"; }, never, ["*"], false, never>;
}
export declare class ZluxButtonModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxButtonModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ZluxButtonModule, [typeof ZluxButtonComponent], [typeof i1.CommonModule], [typeof ZluxButtonComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ZluxButtonModule>;
}
//# sourceMappingURL=button.component.d.ts.map