/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZluxPopupManagerService } from '../../services/popup-manager.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/popup-manager.service";
import * as i2 from "@angular/common";
export class ZluxPopupPanelComponent {
    constructor(popupManager) {
        this.popupManager = popupManager;
        this.isActive = false;
        this.modal = false;
        this.autoShow = false;
        this.ignoreVeil = false;
        this.blockDisplay = false;
    }
    ngOnInit() {
        if (this.autoShow) {
            this.show();
        }
    }
    ngOnDestroy() {
        if (this.autoShow) {
            this.hide();
        }
    }
    show() {
        if (this.modal) {
            this.popupManager.block();
        }
        this.isActive = true;
    }
    hide() {
        if (this.modal) {
            this.popupManager.unblock();
        }
        this.isActive = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupPanelComponent, deps: [{ token: i1.ZluxPopupManagerService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.3", type: ZluxPopupPanelComponent, selector: "zlux-popup-panel", inputs: { modal: "modal", autoShow: "autoShow", ignoreVeil: "ignoreVeil", blockDisplay: "blockDisplay" }, ngImport: i0, template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n@if (isActive) {\n<div [ngClass]=\"{'popup-panel': true, 'ignoreVeil': ignoreVeil, 'blockDisplay': blockDisplay}\">\n  <ng-content>\n  </ng-content>\n</div>\n}\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [".popup-panel{display:inline-block;position:relative;margin:0;padding:0;z-index:50}.blockDisplay{display:block}.ignoreVeil{z-index:200}\n"], dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-popup-panel", template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n@if (isActive) {\n<div [ngClass]=\"{'popup-panel': true, 'ignoreVeil': ignoreVeil, 'blockDisplay': blockDisplay}\">\n  <ng-content>\n  </ng-content>\n</div>\n}\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [".popup-panel{display:inline-block;position:relative;margin:0;padding:0;z-index:50}.blockDisplay{display:block}.ignoreVeil{z-index:200}\n"] }]
        }], ctorParameters: () => [{ type: i1.ZluxPopupManagerService }], propDecorators: { modal: [{
                type: Input
            }], autoShow: [{
                type: Input
            }], ignoreVeil: [{
                type: Input
            }], blockDisplay: [{
                type: Input
            }] } });
export class ZluxPopupPanelModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupPanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupPanelModule, declarations: [ZluxPopupPanelComponent], imports: [CommonModule], exports: [ZluxPopupPanelComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupPanelModule, providers: [ZluxPopupManagerService], imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxPopupPanelComponent],
                    declarations: [ZluxPopupPanelComponent],
                    providers: [ZluxPopupManagerService]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvemx1eC13aWRnZXRzL3NyYy9saWIvY29tcG9uZW50cy9wb3B1cC1wYW5lbC9wb3B1cC1wYW5lbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy96bHV4LXdpZGdldHMvc3JjL2xpYi9jb21wb25lbnRzL3BvcHVwLXBhbmVsL3BvcHVwLXBhbmVsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7OztFQVFFO0FBRUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUM5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sc0NBQXNDLENBQUM7Ozs7QUFPL0UsTUFBTSxPQUFPLHVCQUF1QjtJQU9sQyxZQUFvQixZQUFxQztRQUFyQyxpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUFOekQsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUNqQixVQUFLLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUM1QixpQkFBWSxHQUFZLEtBQUssQ0FBQztJQUl2QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUIsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7OEdBcENVLHVCQUF1QjtrR0FBdkIsdUJBQXVCLGtLQ3RCcEMscXhCQTBCRzs7MkZESlUsdUJBQXVCO2tCQUxuQyxTQUFTOytCQUNFLGtCQUFrQjs0RkFNbkIsS0FBSztzQkFBYixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLOztBQXdDUixNQUFNLE9BQU8sb0JBQW9COzhHQUFwQixvQkFBb0I7K0dBQXBCLG9CQUFvQixpQkE3Q3BCLHVCQUF1QixhQXdDeEIsWUFBWSxhQXhDWCx1QkFBdUI7K0dBNkN2QixvQkFBb0IsYUFGcEIsQ0FBQyx1QkFBdUIsQ0FBQyxZQUgxQixZQUFZOzsyRkFLWCxvQkFBb0I7a0JBTmhDLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDbEMsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUM7b0JBQ3ZDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5cclxuLypcclxuICBUaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZVxyXG4gIG1hZGUgYXZhaWxhYmxlIHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgRWNsaXBzZSBQdWJsaWMgTGljZW5zZSB2Mi4wIHdoaWNoIGFjY29tcGFuaWVzXHJcbiAgdGhpcyBkaXN0cmlidXRpb24sIGFuZCBpcyBhdmFpbGFibGUgYXQgaHR0cHM6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLXYyMC5odG1sXHJcbiAgXHJcbiAgU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEVQTC0yLjBcclxuICBcclxuICBDb3B5cmlnaHQgQ29udHJpYnV0b3JzIHRvIHRoZSBab3dlIFByb2plY3QuXHJcbiovXHJcblxyXG5pbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbmltcG9ydCB7IFpsdXhQb3B1cE1hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvcG9wdXAtbWFuYWdlci5zZXJ2aWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiBcInpsdXgtcG9wdXAtcGFuZWxcIixcclxuICB0ZW1wbGF0ZVVybDogXCJwb3B1cC1wYW5lbC5jb21wb25lbnQuaHRtbFwiLFxyXG4gIHN0eWxlVXJsczogW1wicG9wdXAtcGFuZWwuY29tcG9uZW50LmNzc1wiXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIFpsdXhQb3B1cFBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3l7XHJcbiAgaXNBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICBASW5wdXQoKSBtb2RhbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGF1dG9TaG93OiBib29sZWFuID0gZmFsc2U7XHJcbiAgQElucHV0KCkgaWdub3JlVmVpbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIEBJbnB1dCgpIGJsb2NrRGlzcGxheTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHBvcHVwTWFuYWdlcjogWmx1eFBvcHVwTWFuYWdlclNlcnZpY2UpIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIGlmICh0aGlzLmF1dG9TaG93KSB7XHJcbiAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICBpZiAodGhpcy5hdXRvU2hvdykge1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNob3coKSB7XHJcbiAgICBpZiAodGhpcy5tb2RhbCkge1xyXG4gICAgICB0aGlzLnBvcHVwTWFuYWdlci5ibG9jaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaGlkZSgpIHtcclxuICAgIGlmICh0aGlzLm1vZGFsKSB7XHJcbiAgICAgIHRoaXMucG9wdXBNYW5hZ2VyLnVuYmxvY2soKTtcclxuICAgIH1cclxuICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZXhwb3J0czogW1psdXhQb3B1cFBhbmVsQ29tcG9uZW50XSxcclxuICBkZWNsYXJhdGlvbnM6IFtabHV4UG9wdXBQYW5lbENvbXBvbmVudF0sXHJcbiAgcHJvdmlkZXJzOiBbWmx1eFBvcHVwTWFuYWdlclNlcnZpY2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBabHV4UG9wdXBQYW5lbE1vZHVsZSB7IH1cclxuXHJcblxyXG4vKlxyXG4gIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlXHJcbiAgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIHYyLjAgd2hpY2ggYWNjb21wYW5pZXNcclxuICB0aGlzIGRpc3RyaWJ1dGlvbiwgYW5kIGlzIGF2YWlsYWJsZSBhdCBodHRwczovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtdjIwLmh0bWxcclxuICBcclxuICBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxyXG4gIFxyXG4gIENvcHlyaWdodCBDb250cmlidXRvcnMgdG8gdGhlIFpvd2UgUHJvamVjdC5cclxuKi9cclxuXHJcbiIsIjwhLS1cblRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlXG5tYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgdjIuMCB3aGljaCBhY2NvbXBhbmllc1xudGhpcyBkaXN0cmlidXRpb24sIGFuZCBpcyBhdmFpbGFibGUgYXQgaHR0cHM6Ly93d3cuZWNsaXBzZS5vcmcvbGVnYWwvZXBsLXYyMC5odG1sXG5cblNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXG5cbkNvcHlyaWdodCBDb250cmlidXRvcnMgdG8gdGhlIFpvd2UgUHJvamVjdC5cbi0tPlxuXG5AaWYgKGlzQWN0aXZlKSB7XG48ZGl2IFtuZ0NsYXNzXT1cInsncG9wdXAtcGFuZWwnOiB0cnVlLCAnaWdub3JlVmVpbCc6IGlnbm9yZVZlaWwsICdibG9ja0Rpc3BsYXknOiBibG9ja0Rpc3BsYXl9XCI+XG4gIDxuZy1jb250ZW50PlxuICA8L25nLWNvbnRlbnQ+XG48L2Rpdj5cbn1cblxuXG48IS0tXG5UaGlzIHByb2dyYW0gYW5kIHRoZSBhY2NvbXBhbnlpbmcgbWF0ZXJpYWxzIGFyZVxubWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIHYyLjAgd2hpY2ggYWNjb21wYW5pZXNcbnRoaXMgZGlzdHJpYnV0aW9uLCBhbmQgaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC12MjAuaHRtbFxuXG5TUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxuXG5Db3B5cmlnaHQgQ29udHJpYnV0b3JzIHRvIHRoZSBab3dlIFByb2plY3QuXG4tLT4iXX0=