import { EventEmitter } from "@angular/core";
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
}
export declare class ZluxCheckboxModule {
}
