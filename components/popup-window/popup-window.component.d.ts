import { EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { ZluxPopupManagerService } from '../../services/popup-manager.service';
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
}
export declare class ZluxPopupWindowModule {
}
export interface popupWindowPopupStyle {
}
