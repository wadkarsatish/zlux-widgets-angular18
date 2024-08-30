import { EventEmitter } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
export declare class ZluxCheckboxComponent {
    value: boolean;
    valueChange: EventEmitter<boolean>;
    label: string;
    inputId: string;
    dark: boolean;
    disabled: boolean;
    style: any;
    styleClass: string;
    onValueChange(model: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxCheckboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ZluxCheckboxComponent, "zlux-checkbox", never, { "value": { "alias": "value"; "required": false; }; "label": { "alias": "label"; "required": false; }; "inputId": { "alias": "inputId"; "required": false; }; "dark": { "alias": "dark"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; "style": { "alias": "style"; "required": false; }; "styleClass": { "alias": "styleClass"; "required": false; }; }, { "valueChange": "valueChange"; }, never, never, false, never>;
}
export declare class ZluxCheckboxModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<ZluxCheckboxModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<ZluxCheckboxModule, [typeof ZluxCheckboxComponent], [typeof i1.CommonModule, typeof i2.FormsModule], [typeof ZluxCheckboxComponent]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<ZluxCheckboxModule>;
}
//# sourceMappingURL=checkbox.component.d.ts.map