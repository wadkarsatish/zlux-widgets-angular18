import { OnInit, OnDestroy } from '@angular/core';
import { ZluxPopupManagerService } from '../../services/popup-manager.service';
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
}
export declare class ZluxPopupPanelModule {
}
