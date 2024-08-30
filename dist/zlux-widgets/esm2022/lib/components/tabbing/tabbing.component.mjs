/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
import { NgModule, Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
//We leave this a component and not a service, as to give each component the ability
//to set their own max tabs without conflicting with other components.
export class ZluxTabbingComponent {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.hiddenIds = '';
        this.hiddenPos = '';
        this.focusableArr = [];
        this.idArr = [];
        this.activeTab = 0;
        this.tabEvent = false;
        this.parentRef = this.elementRef.nativeElement.parentElement;
    }
    ngAfterViewInit() {
        this.initValues(this.parentRef);
    }
    initValues(eleRef) {
        if (eleRef) {
            this.focusableArr = this.findAllFocusable(eleRef);
            this.idArr = this.getAllIds(this.focusableArr);
            this.totalTabs = this.focusableArr.length;
            this.tabEvent = false;
            this.activeTab = 0;
            this.setFocusActiveTab(true);
        }
    }
    tabToNext(e) {
        e.preventDefault();
        this.switchTab(true);
    }
    tabToPrev(e) {
        e.preventDefault();
        this.switchTab(false);
    }
    switchTab(isForward) {
        this.tabEvent = true;
        if (isForward) {
            this.moveForward();
        }
        else {
            this.moveBackward();
        }
        this.setFocusActiveTab(isForward);
    }
    moveForward() {
        this.activeTab++;
        if (this.activeTab == this.totalTabs) {
            this.activeTab = 0;
        }
    }
    moveBackward() {
        if (this.activeTab == 0) {
            this.activeTab = this.totalTabs - 1;
        }
        else {
            this.activeTab--;
        }
    }
    setFocusActiveTab(isForward) {
        //TODO: Element.focus seems to fail at times. Logging the element shows it does not *seem* like a timing issue for
        //the querySelector method, but rather the focus method, and adding a 200ms delay showed reliability when testing
        if (this.focusableArr) {
            let element = this.focusableArr[this.activeTab];
            if (element && document.body.contains(element)) {
                if (this.isElementDisabled(element)) {
                    this.switchTab(isForward);
                    return;
                }
                this.focusElement(element);
            }
            else {
                element = this.checkAndAddElmAgain(this.idArr[this.activeTab], this.activeTab);
                if (!element) {
                    this.switchTab(isForward);
                    return;
                }
                this.focusElement(element);
            }
        }
    }
    isElementDisabled(element) {
        return element && element.getAttribute("disabled") != null;
    }
    focusElement(element) {
        if (element)
            setTimeout(() => { element.focus(); }, 200);
    }
    checkAndAddElmAgain(selector, elmIndex) {
        const root = this.parentRef || document;
        const newElm = root.querySelector(selector);
        this.focusableArr[elmIndex] = newElm;
        return newElm;
    }
    getElementSelector(elm) {
        let selector = '';
        if (elm) {
            selector = this.getIdSelector(elm);
            if (selector == '') {
                selector = this.getAttributeSelector(elm);
                selector += this.getClassListSelector(elm);
            }
        }
        return selector;
    }
    getIdSelector(elm) {
        let selector = elm.getAttribute('id') || '';
        if (selector > '')
            return `#${selector}`;
        return selector;
    }
    getAttributeSelector(elm) {
        const attr = elm.attributes[0].name;
        const val = elm[attr] || '';
        const selector = `[${attr}='${val}']`;
        return selector;
    }
    getClassListSelector(elm) {
        const selector = '.' + Array.prototype.join.call(elm.classList, ',.') || '';
        return selector;
    }
    syncActiveTab(elm) {
        //focusin triggered because of switch tab not from input click
        //no activeTab sync required
        if (this.tabEvent) {
            this.tabEvent = false;
            return;
        }
        this.activeTab = this.extractTabId(elm);
    }
    extractTabId(elm) {
        if (this.focusableArr) {
            const tabId = this.focusableArr.findIndex(e => { return elm == e; });
            if (tabId && tabId > 0) {
                return tabId;
            }
        }
        return this.activeTab;
    }
    findAllFocusable(domRef) {
        let lists = [];
        if (domRef && domRef['querySelectorAll'] != null) {
            const selectorStr = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            lists = Array.from(domRef.querySelectorAll(selectorStr));
            lists = lists.sort((elm1, elm2) => {
                let tab1 = parseInt(elm1.getAttribute('tabindex')) || 0;
                let tab2 = parseInt(elm2.getAttribute('tabindex')) || 0;
                return tab2 - tab1;
            });
        }
        if (this.hiddenPos) {
            this.hiddenPos.split(',').map(val => parseInt(val)).forEach((val) => {
                lists.splice(val - 1, 0);
            });
        }
        return lists;
    }
    getAllIds(focusableArr) {
        let lists = [];
        let duplicates = [];
        lists = focusableArr.map(elm => this.getElementSelector(elm));
        if (this.hiddenPos && this.hiddenIds) {
            const idsArr = this.hiddenIds.split(',').map(s => `#${s}`);
            lists.forEach((selector, idx) => {
                if (idsArr.indexOf(selector) >= 0) {
                    duplicates.push(idx);
                }
            });
            this.hiddenPos.split(',').map(val => parseInt(val)).forEach((val, idx) => {
                lists[val - 1] = idsArr[idx];
            });
        }
        // remove duplicates
        duplicates.forEach((dupIdx) => {
            focusableArr.splice(dupIdx, 1);
            lists.splice(dupIdx, 1);
        });
        return lists;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxTabbingComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.3", type: ZluxTabbingComponent, selector: "zlux-tab-trap", inputs: { hiddenIds: "hiddenIds", hiddenPos: "hiddenPos" }, host: { listeners: { "window:keydown.tab": "tabToNext($event)", "window:keydown.shift.tab": "tabToPrev($event)", "window:focusin": "syncActiveTab($event.target)" } }, ngImport: i0, template: '', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxTabbingComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'zlux-tab-trap',
                    template: '',
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { hiddenIds: [{
                type: Input
            }], hiddenPos: [{
                type: Input
            }], tabToNext: [{
                type: HostListener,
                args: ['window:keydown.tab', ['$event']]
            }], tabToPrev: [{
                type: HostListener,
                args: ['window:keydown.shift.tab', ['$event']]
            }], syncActiveTab: [{
                type: HostListener,
                args: ['window:focusin', ['$event.target']]
            }] } });
export class ZluxTabbingModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxTabbingModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxTabbingModule, declarations: [ZluxTabbingComponent], imports: [CommonModule], exports: [ZluxTabbingComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxTabbingModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxTabbingModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxTabbingComponent],
                    declarations: [ZluxTabbingComponent]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiYmluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy96bHV4LXdpZGdldHMvc3JjL2xpYi9jb21wb25lbnRzL3RhYmJpbmcvdGFiYmluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0E7Ozs7Ozs7O0VBUUU7QUFDRixPQUFPLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQTZCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRS9DLG9GQUFvRjtBQUNwRixzRUFBc0U7QUFLdEUsTUFBTSxPQUFPLG9CQUFvQjtJQVcvQixZQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBVGpDLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUl4QixpQkFBWSxHQUFrQixFQUFFLENBQUM7UUFDakMsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUkzQixJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQztJQUMvRCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBbUI7UUFDNUIsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2xELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMs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OzJGQUVELG9CQUFvQjtrQkFKaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7K0VBR1UsU0FBUztzQkFBakIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQThCTixTQUFTO3NCQURSLFlBQVk7dUJBQUMsb0JBQW9CLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBTzlDLFNBQVM7c0JBRFIsWUFBWTt1QkFBQywwQkFBMEIsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFtR3BELGFBQWE7c0JBRFosWUFBWTt1QkFBQyxnQkFBZ0IsRUFBRSxDQUFDLGVBQWUsQ0FBQzs7QUE2RW5ELE1BQU0sT0FBTyxpQkFBaUI7OEdBQWpCLGlCQUFpQjsrR0FBakIsaUJBQWlCLGlCQXJOakIsb0JBQW9CLGFBaU5yQixZQUFZLGFBak5YLG9CQUFvQjsrR0FxTnBCLGlCQUFpQixZQUpsQixZQUFZOzsyRkFJWCxpQkFBaUI7a0JBTDdCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDL0IsWUFBWSxFQUFFLENBQUMsb0JBQW9CLENBQUM7aUJBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi8qXHJcbiAgVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmVcclxuICBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgdjIuMCB3aGljaCBhY2NvbXBhbmllc1xyXG4gIHRoaXMgZGlzdHJpYnV0aW9uLCBhbmQgaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC12MjAuaHRtbFxyXG4gIFxyXG4gIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXHJcbiAgXHJcbiAgQ29weXJpZ2h0IENvbnRyaWJ1dG9ycyB0byB0aGUgWm93ZSBQcm9qZWN0LlxyXG4qL1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgQ29tcG9uZW50LCBIb3N0TGlzdGVuZXIsIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG4vL1dlIGxlYXZlIHRoaXMgYSBjb21wb25lbnQgYW5kIG5vdCBhIHNlcnZpY2UsIGFzIHRvIGdpdmUgZWFjaCBjb21wb25lbnQgdGhlIGFiaWxpdHlcclxuLy90byBzZXQgdGhlaXIgb3duIG1heCB0YWJzIHdpdGhvdXQgY29uZmxpY3Rpbmcgd2l0aCBvdGhlciBjb21wb25lbnRzLlxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3psdXgtdGFiLXRyYXAnLFxyXG4gIHRlbXBsYXRlOiAnJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIFpsdXhUYWJiaW5nQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIEBJbnB1dCgpIGhpZGRlbklkczogc3RyaW5nID0gJyc7XHJcbiAgQElucHV0KCkgaGlkZGVuUG9zOiBzdHJpbmcgPSAnJztcclxuICBwcml2YXRlIHRvdGFsVGFicztcclxuICBwcml2YXRlIGFjdGl2ZVRhYjtcclxuICBwcml2YXRlIHRhYkV2ZW50OiBib29sZWFuO1xyXG4gIHByaXZhdGUgZm9jdXNhYmxlQXJyOiBIVE1MRWxlbWVudFtdID0gW107XHJcbiAgcHJpdmF0ZSBpZEFycjogc3RyaW5nW10gPSBbXTtcclxuICBwcml2YXRlIHBhcmVudFJlZjogSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xyXG4gICAgdGhpcy5hY3RpdmVUYWIgPSAwO1xyXG4gICAgdGhpcy50YWJFdmVudCA9IGZhbHNlO1xyXG4gICAgdGhpcy5wYXJlbnRSZWYgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgdGhpcy5pbml0VmFsdWVzKHRoaXMucGFyZW50UmVmKTtcclxuICB9XHJcblxyXG4gIGluaXRWYWx1ZXMoZWxlUmVmOiBIVE1MRWxlbWVudCkge1xyXG4gICAgaWYgKGVsZVJlZikge1xyXG4gICAgICB0aGlzLmZvY3VzYWJsZUFyciA9IHRoaXMuZmluZEFsbEZvY3VzYWJsZShlbGVSZWYpO1xyXG4gICAgICB0aGlzLmlkQXJyID0gdGhpcy5nZXRBbGxJZHModGhpcy5mb2N1c2FibGVBcnIpO1xyXG4gICAgICB0aGlzLnRvdGFsVGFicyA9IHRoaXMuZm9jdXNhYmxlQXJyLmxlbmd0aDtcclxuICAgICAgdGhpcy50YWJFdmVudCA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9IDA7XHJcbiAgICAgIHRoaXMuc2V0Rm9jdXNBY3RpdmVUYWIodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6a2V5ZG93bi50YWInLCBbJyRldmVudCddKVxyXG4gIHRhYlRvTmV4dChlOiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnN3aXRjaFRhYih0cnVlKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzprZXlkb3duLnNoaWZ0LnRhYicsIFsnJGV2ZW50J10pXHJcbiAgdGFiVG9QcmV2KGU6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuc3dpdGNoVGFiKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHN3aXRjaFRhYihpc0ZvcndhcmQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMudGFiRXZlbnQgPSB0cnVlO1xyXG4gICAgaWYgKGlzRm9yd2FyZCkge1xyXG4gICAgICB0aGlzLm1vdmVGb3J3YXJkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1vdmVCYWNrd2FyZCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXRGb2N1c0FjdGl2ZVRhYihpc0ZvcndhcmQpO1xyXG4gIH1cclxuXHJcbiAgbW92ZUZvcndhcmQoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZVRhYisrO1xyXG4gICAgaWYgKHRoaXMuYWN0aXZlVGFiID09IHRoaXMudG90YWxUYWJzKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG1vdmVCYWNrd2FyZCgpIHtcclxuICAgIGlmICh0aGlzLmFjdGl2ZVRhYiA9PSAwKSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlVGFiID0gdGhpcy50b3RhbFRhYnMgLSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hY3RpdmVUYWItLTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNldEZvY3VzQWN0aXZlVGFiKGlzRm9yd2FyZDogYm9vbGVhbikge1xyXG4gICAgLy9UT0RPOiBFbGVtZW50LmZvY3VzIHNlZW1zIHRvIGZhaWwgYXQgdGltZXMuIExvZ2dpbmcgdGhlIGVsZW1lbnQgc2hvd3MgaXQgZG9lcyBub3QgKnNlZW0qIGxpa2UgYSB0aW1pbmcgaXNzdWUgZm9yXHJcbiAgICAvL3RoZSBxdWVyeVNlbGVjdG9yIG1ldGhvZCwgYnV0IHJhdGhlciB0aGUgZm9jdXMgbWV0aG9kLCBhbmQgYWRkaW5nIGEgMjAwbXMgZGVsYXkgc2hvd2VkIHJlbGlhYmlsaXR5IHdoZW4gdGVzdGluZ1xyXG4gICAgaWYgKHRoaXMuZm9jdXNhYmxlQXJyKSB7XHJcbiAgICAgIGxldCBlbGVtZW50OiBhbnkgPSB0aGlzLmZvY3VzYWJsZUFyclt0aGlzLmFjdGl2ZVRhYl07XHJcbiAgICAgIGlmIChlbGVtZW50ICYmIGRvY3VtZW50LmJvZHkuY29udGFpbnMoZWxlbWVudCkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0VsZW1lbnREaXNhYmxlZChlbGVtZW50KSkge1xyXG4gICAgICAgICAgdGhpcy5zd2l0Y2hUYWIoaXNGb3J3YXJkKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb2N1c0VsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWxlbWVudCA9IHRoaXMuY2hlY2tBbmRBZGRFbG1BZ2Fpbih0aGlzLmlkQXJyW3RoaXMuYWN0aXZlVGFiXSwgdGhpcy5hY3RpdmVUYWIpO1xyXG4gICAgICAgIGlmICghZWxlbWVudCkge1xyXG4gICAgICAgICAgdGhpcy5zd2l0Y2hUYWIoaXNGb3J3YXJkKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5mb2N1c0VsZW1lbnQoZWxlbWVudCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzRWxlbWVudERpc2FibGVkKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICByZXR1cm4gZWxlbWVudCAmJiBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRpc2FibGVkXCIpICE9IG51bGxcclxuICB9XHJcblxyXG4gIGZvY3VzRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xyXG4gICAgaWYgKGVsZW1lbnQpIHNldFRpbWVvdXQoKCkgPT4geyBlbGVtZW50LmZvY3VzKCk7IH0sIDIwMCk7XHJcbiAgfVxyXG5cclxuICBjaGVja0FuZEFkZEVsbUFnYWluKHNlbGVjdG9yOiBzdHJpbmcsIGVsbUluZGV4OiBudW1iZXIpIHtcclxuICAgIGNvbnN0IHJvb3QgPSB0aGlzLnBhcmVudFJlZiB8fCBkb2N1bWVudDtcclxuICAgIGNvbnN0IG5ld0VsbSA9IHJvb3QucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oc2VsZWN0b3IpO1xyXG4gICAgdGhpcy5mb2N1c2FibGVBcnJbZWxtSW5kZXhdID0gbmV3RWxtIGFzIEhUTUxFbGVtZW50O1xyXG4gICAgcmV0dXJuIG5ld0VsbTtcclxuICB9XHJcblxyXG4gIGdldEVsZW1lbnRTZWxlY3RvcihlbG06IEhUTUxFbGVtZW50KSB7XHJcbiAgICBsZXQgc2VsZWN0b3IgPSAnJztcclxuICAgIGlmIChlbG0pIHtcclxuICAgICAgc2VsZWN0b3IgPSB0aGlzLmdldElkU2VsZWN0b3IoZWxtKTtcclxuICAgICAgaWYgKHNlbGVjdG9yID09ICcnKSB7XHJcbiAgICAgICAgc2VsZWN0b3IgPSB0aGlzLmdldEF0dHJpYnV0ZVNlbGVjdG9yKGVsbSk7XHJcbiAgICAgICAgc2VsZWN0b3IgKz0gdGhpcy5nZXRDbGFzc0xpc3RTZWxlY3RvcihlbG0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0b3I7XHJcbiAgfVxyXG5cclxuICBnZXRJZFNlbGVjdG9yKGVsbTogSFRNTEVsZW1lbnQpIHtcclxuICAgIGxldCBzZWxlY3RvciA9IGVsbS5nZXRBdHRyaWJ1dGUoJ2lkJykgfHwgJyc7XHJcbiAgICBpZiAoc2VsZWN0b3IgPiAnJykgcmV0dXJuIGAjJHtzZWxlY3Rvcn1gXHJcbiAgICByZXR1cm4gc2VsZWN0b3I7XHJcbiAgfVxyXG5cclxuICBnZXRBdHRyaWJ1dGVTZWxlY3RvcihlbG06IEhUTUxFbGVtZW50KSB7XHJcbiAgICBjb25zdCBhdHRyOiBzdHJpbmcgPSBlbG0uYXR0cmlidXRlc1swXS5uYW1lO1xyXG4gICAgY29uc3QgdmFsID0gZWxtW2F0dHJdIHx8ICcnO1xyXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBgWyR7YXR0cn09JyR7dmFsfSddYDtcclxuICAgIHJldHVybiBzZWxlY3RvcjtcclxuICB9XHJcblxyXG4gIGdldENsYXNzTGlzdFNlbGVjdG9yKGVsbTogSFRNTEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IHNlbGVjdG9yID0gJy4nICsgQXJyYXkucHJvdG90eXBlLmpvaW4uY2FsbChlbG0uY2xhc3NMaXN0LCAnLC4nKSB8fCAnJztcclxuICAgIHJldHVybiBzZWxlY3RvcjtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpmb2N1c2luJywgWyckZXZlbnQudGFyZ2V0J10pXHJcbiAgc3luY0FjdGl2ZVRhYihlbG06IEhUTUxFbGVtZW50KSB7XHJcbiAgICAvL2ZvY3VzaW4gdHJpZ2dlcmVkIGJlY2F1c2Ugb2Ygc3dpdGNoIHRhYiBub3QgZnJvbSBpbnB1dCBjbGlja1xyXG4gICAgLy9ubyBhY3RpdmVUYWIgc3luYyByZXF1aXJlZFxyXG4gICAgaWYgKHRoaXMudGFiRXZlbnQpIHtcclxuICAgICAgdGhpcy50YWJFdmVudCA9IGZhbHNlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZVRhYiA9IHRoaXMuZXh0cmFjdFRhYklkKGVsbSlcclxuICB9XHJcblxyXG4gIGV4dHJhY3RUYWJJZChlbG06IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcclxuICAgIGlmICh0aGlzLmZvY3VzYWJsZUFycikge1xyXG4gICAgICBjb25zdCB0YWJJZCA9IHRoaXMuZm9jdXNhYmxlQXJyLmZpbmRJbmRleChlID0+IHsgcmV0dXJuIGVsbSA9PSBlIH0pO1xyXG4gICAgICBpZiAodGFiSWQgJiYgdGFiSWQgPiAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRhYklkO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5hY3RpdmVUYWI7XHJcbiAgfVxyXG5cclxuICBmaW5kQWxsRm9jdXNhYmxlKGRvbVJlZjogSFRNTEVsZW1lbnQpIHtcclxuICAgIGxldCBsaXN0czogSFRNTEVsZW1lbnRbXSA9IFtdO1xyXG4gICAgaWYgKGRvbVJlZiAmJiBkb21SZWZbJ3F1ZXJ5U2VsZWN0b3JBbGwnXSAhPSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IHNlbGVjdG9yU3RyID0gJ2J1dHRvbiwgW2hyZWZdLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pJztcclxuICAgICAgbGlzdHMgPSBBcnJheS5mcm9tKGRvbVJlZi5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihzZWxlY3RvclN0cikpO1xyXG4gICAgICBsaXN0cyA9IGxpc3RzLnNvcnQoKGVsbTE6IGFueSwgZWxtMjogYW55KSA9PiB7XHJcbiAgICAgICAgbGV0IHRhYjEgPSBwYXJzZUludChlbG0xLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSkgfHwgMDtcclxuICAgICAgICBsZXQgdGFiMiA9IHBhcnNlSW50KGVsbTIuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpKSB8fCAwO1xyXG4gICAgICAgIHJldHVybiB0YWIyIC0gdGFiMTtcclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmhpZGRlblBvcykge1xyXG4gICAgICB0aGlzLmhpZGRlblBvcy5zcGxpdCgnLCcpLm1hcCh2YWwgPT4gcGFyc2VJbnQodmFsKSkuZm9yRWFjaCgodmFsKSA9PiB7XHJcbiAgICAgICAgbGlzdHMuc3BsaWNlKHZhbCAtIDEsIDApO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsaXN0cztcclxuICB9XHJcblxyXG4gIGdldEFsbElkcyhmb2N1c2FibGVBcnI6IEhUTUxFbGVtZW50W10pIHtcclxuICAgIGxldCBsaXN0czogYW55W10gPSBbXTtcclxuICAgIGxldCBkdXBsaWNhdGVzOiBhbnlbXSA9IFtdO1xyXG5cclxuICAgIGxpc3RzID0gZm9jdXNhYmxlQXJyLm1hcChlbG0gPT4gdGhpcy5nZXRFbGVtZW50U2VsZWN0b3IoZWxtKSk7XHJcblxyXG4gICAgaWYgKHRoaXMuaGlkZGVuUG9zICYmIHRoaXMuaGlkZGVuSWRzKSB7XHJcbiAgICAgIGNvbnN0IGlkc0FyciA9IHRoaXMuaGlkZGVuSWRzLnNwbGl0KCcsJykubWFwKHMgPT4gYCMke3N9YCk7XHJcbiAgICAgIGxpc3RzLmZvckVhY2goKHNlbGVjdG9yLCBpZHg6IGFueSkgPT4ge1xyXG4gICAgICAgIGlmIChpZHNBcnIuaW5kZXhPZihzZWxlY3RvcikgPj0gMCkge1xyXG4gICAgICAgICAgZHVwbGljYXRlcy5wdXNoKGlkeCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgdGhpcy5oaWRkZW5Qb3Muc3BsaXQoJywnKS5tYXAodmFsID0+IHBhcnNlSW50KHZhbCkpLmZvckVhY2goKHZhbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgbGlzdHNbdmFsIC0gMV0gPSBpZHNBcnJbaWR4XTtcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvLyByZW1vdmUgZHVwbGljYXRlc1xyXG4gICAgZHVwbGljYXRlcy5mb3JFYWNoKChkdXBJZHgpID0+IHtcclxuICAgICAgZm9jdXNhYmxlQXJyLnNwbGljZShkdXBJZHgsIDEpO1xyXG4gICAgICBsaXN0cy5zcGxpY2UoZHVwSWR4LCAxKTtcclxuICAgIH0pXHJcblxyXG4gICAgcmV0dXJuIGxpc3RzO1xyXG4gIH1cclxuXHJcblxyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxyXG4gIGV4cG9ydHM6IFtabHV4VGFiYmluZ0NvbXBvbmVudF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbWmx1eFRhYmJpbmdDb21wb25lbnRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBabHV4VGFiYmluZ01vZHVsZSB7IH1cclxuXHJcbi8qXHJcbiAgVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmVcclxuICBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgdjIuMCB3aGljaCBhY2NvbXBhbmllc1xyXG4gIHRoaXMgZGlzdHJpYnV0aW9uLCBhbmQgaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC12MjAuaHRtbFxyXG4gIFxyXG4gIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXHJcbiAgXHJcbiAgQ29weXJpZ2h0IENvbnRyaWJ1dG9ycyB0byB0aGUgWm93ZSBQcm9qZWN0LlxyXG4qL1xyXG4iXX0=