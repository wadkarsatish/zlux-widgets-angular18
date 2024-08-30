/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
import { Injectable } from '@angular/core';
// import * as Rx from 'rxjs/Rx';
import { Subject, ReplaySubject, from } from 'rxjs';
import * as i0 from "@angular/core";
function getSimpleID() {
    return Number(Math.random() + Date.now());
}
export var ZluxErrorSeverity;
(function (ZluxErrorSeverity) {
    ZluxErrorSeverity["ERROR"] = "error";
    ZluxErrorSeverity["WARNING"] = "warning";
    ZluxErrorSeverity["INFO"] = "info";
})(ZluxErrorSeverity || (ZluxErrorSeverity = {}));
export class ZluxPopupManagerService {
    constructor() {
        this.logger = undefined;
        this.listeners = {};
        this.eventsSubject = new Subject();
        this.events = from(this.eventsSubject);
        this.events.subscribe(({ name, args }) => {
            if (this.listeners[name]) {
                for (let listener of this.listeners[name]) {
                    listener(...args);
                }
            }
        });
    }
    setLogger(logger) {
        this.logger = logger;
    }
    on(name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }
        this.listeners[name].push(listener);
    }
    broadcast(name, ...args) {
        this.eventsSubject.next({
            name,
            args
        });
    }
    processButtons(buttons) {
        return buttons.map(button => {
            if (typeof (button) === 'string') {
                button = {
                    caption: button
                };
            }
            button.closeReport = button.closeReport != null ? button.closeReport : true;
            return button;
        });
    }
    block() {
        this.broadcast('block');
    }
    unblock() {
        this.broadcast('unblock');
    }
    getLoggerSeverity(severity) {
        switch (severity) {
            case ZluxErrorSeverity.ERROR: return this.logger.SEVERE;
            case ZluxErrorSeverity.WARNING: return this.logger.WARNING;
            case ZluxErrorSeverity.INFO: return this.logger.INFO;
        }
    }
    removeReport(id) {
        this.broadcast('removeReport', id);
    }
    createErrorReport(severity, title, text, options) {
        options = options || {};
        let buttons = options.buttons || ["Close"];
        let timestamp;
        if (options.timestamp == false) {
            timestamp = undefined;
        }
        else {
            timestamp = options.timestamp || new Date();
        }
        buttons = this.processButtons(buttons);
        const subject = new ReplaySubject();
        let errorReport = {
            severity,
            title,
            text,
            buttons,
            subject,
            timestamp,
            id: getSimpleID(),
            modal: options.blocking || false,
            theme: options.theme || "",
            style: options.style || {},
            callToAction: options.callToAction || false
        };
        //the object will be shallow cloned
        this.broadcast('createReport', errorReport);
        if (this.logger) {
            this.logger.log(this.getLoggerSeverity(severity), text);
        }
        return errorReport;
    }
    reportError(severity, title, text, options) {
        options = options || {};
        let buttons = options.buttons || ["Close"];
        const timestamp = options.timestamp || new Date();
        buttons = this.processButtons(buttons);
        const subject = new ReplaySubject();
        this.broadcast('createReport', {
            severity,
            title,
            text,
            buttons,
            subject,
            timestamp,
            id: getSimpleID(),
            modal: options.blocking || false
        });
        if (this.logger) {
            this.logger.log(this.getLoggerSeverity(severity), text);
        }
        return subject;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupManagerService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupManagerService }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupManagerService, decorators: [{
            type: Injectable
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAtbWFuYWdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvemx1eC13aWRnZXRzL3NyYy9saWIvc2VydmljZXMvcG9wdXAtbWFuYWdlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7OztFQVFFO0FBRUYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxpQ0FBaUM7QUFDakMsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFjLE1BQU0sTUFBTSxDQUFDOztBQUVoRSxTQUFTLFdBQVc7SUFDbEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzVDLENBQUM7QUFnQkQsTUFBTSxDQUFOLElBQVksaUJBSVg7QUFKRCxXQUFZLGlCQUFpQjtJQUMzQixvQ0FBZSxDQUFBO0lBQ2Ysd0NBQW1CLENBQUE7SUFDbkIsa0NBQWEsQ0FBQTtBQUNmLENBQUMsRUFKVyxpQkFBaUIsS0FBakIsaUJBQWlCLFFBSTVCO0FBR0QsTUFBTSxPQUFPLHVCQUF1QjtJQU1sQztRQUZBLFdBQU0sR0FBUSxTQUFTLENBQUM7UUFHdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRW5DLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV2QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDbkIsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ2pCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUN6QixLQUFLLElBQUksUUFBUSxJQUFJ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LEVBQUUsRUFBRSxXQUFXLEVBQUU7WUFDakIsS0FBSyxFQUFFLE9BQU8sQ0FBQyxRQUFRLElBQUksS0FBSztTQUNaLENBQUMsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUQsQ0FBQztRQUVELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7OEdBeElVLHVCQUF1QjtrSEFBdkIsdUJBQXVCOzsyRkFBdkIsdUJBQXVCO2tCQURuQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG4vKlxyXG4gIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlXHJcbiAgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIHYyLjAgd2hpY2ggYWNjb21wYW5pZXNcclxuICB0aGlzIGRpc3RyaWJ1dGlvbiwgYW5kIGlzIGF2YWlsYWJsZSBhdCBodHRwczovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtdjIwLmh0bWxcclxuICBcclxuICBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxyXG4gIFxyXG4gIENvcHlyaWdodCBDb250cmlidXRvcnMgdG8gdGhlIFpvd2UgUHJvamVjdC5cclxuKi9cclxuXHJcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuLy8gaW1wb3J0ICogYXMgUnggZnJvbSAncnhqcy9SeCc7XHJcbmltcG9ydCB7IFN1YmplY3QsIFJlcGxheVN1YmplY3QsIGZyb20sIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuXHJcbmZ1bmN0aW9uIGdldFNpbXBsZUlEKCkge1xyXG4gIHJldHVybiBOdW1iZXIoTWF0aC5yYW5kb20oKSArIERhdGUubm93KCkpO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIEVycm9yUmVwb3J0U3RydWN0IHtcclxuICBzZXZlcml0eTogc3RyaW5nLFxyXG4gIG1vZGFsOiBib29sZWFuLFxyXG4gIHRleHQ6IHN0cmluZyxcclxuICB0aXRsZTogc3RyaW5nLFxyXG4gIGJ1dHRvbnM6IHN0cmluZ1tdLFxyXG4gIGlkOiBudW1iZXIsXHJcbiAgdGltZXN0YW1wOiBEYXRlIHwgdW5kZWZpbmVkLFxyXG4gIHN1YmplY3Q6IFN1YmplY3Q8YW55PixcclxuICB0aGVtZT86IHN0cmluZyxcclxuICBzdHlsZT86IHt9LFxyXG4gIGNhbGxUb0FjdGlvbj86IGJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gWmx1eEVycm9yU2V2ZXJpdHkge1xyXG4gIEVSUk9SID0gJ2Vycm9yJyxcclxuICBXQVJOSU5HID0gJ3dhcm5pbmcnLFxyXG4gIElORk8gPSAnaW5mbydcclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgWmx1eFBvcHVwTWFuYWdlclNlcnZpY2Uge1xyXG4gIGV2ZW50c1N1YmplY3Q6IGFueTtcclxuICBsaXN0ZW5lcnM6IGFueTtcclxuICBldmVudHM6IGFueTtcclxuICBsb2dnZXI6IGFueSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG4gICAgdGhpcy5ldmVudHNTdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcclxuXHJcbiAgICB0aGlzLmV2ZW50cyA9IGZyb20odGhpcy5ldmVudHNTdWJqZWN0KTtcclxuXHJcbiAgICB0aGlzLmV2ZW50cy5zdWJzY3JpYmUoXHJcbiAgICAgICh7IG5hbWUsIGFyZ3MgfSkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1tuYW1lXSkge1xyXG4gICAgICAgICAgZm9yIChsZXQgbGlzdGVuZXIgb2YgdGhpcy5saXN0ZW5lcnNbbmFtZV0pIHtcclxuICAgICAgICAgICAgbGlzdGVuZXIoLi4uYXJncyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG4gIHNldExvZ2dlcihsb2dnZXI6IGFueSkge1xyXG4gICAgdGhpcy5sb2dnZXIgPSBsb2dnZXI7XHJcbiAgfVxyXG5cclxuICBvbihuYW1lLCBsaXN0ZW5lcikge1xyXG4gICAgaWYgKCF0aGlzLmxpc3RlbmVyc1tuYW1lXSkge1xyXG4gICAgICB0aGlzLmxpc3RlbmVyc1tuYW1lXSA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGlzdGVuZXJzW25hbWVdLnB1c2gobGlzdGVuZXIpO1xyXG4gIH1cclxuXHJcbiAgYnJvYWRjYXN0KG5hbWUsIC4uLmFyZ3MpIHtcclxuICAgIHRoaXMuZXZlbnRzU3ViamVjdC5uZXh0KHtcclxuICAgICAgbmFtZSxcclxuICAgICAgYXJnc1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm9jZXNzQnV0dG9ucyhidXR0b25zOiBhbnlbXSkge1xyXG4gICAgcmV0dXJuIGJ1dHRvbnMubWFwKGJ1dHRvbiA9PiB7XHJcbiAgICAgIGlmICh0eXBlb2YgKGJ1dHRvbikgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgYnV0dG9uID0ge1xyXG4gICAgICAgICAgY2FwdGlvbjogYnV0dG9uXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBidXR0b24uY2xvc2VSZXBvcnQgPSBidXR0b24uY2xvc2VSZXBvcnQgIT0gbnVsbCA/IGJ1dHRvbi5jbG9zZVJlcG9ydCA6IHRydWU7XHJcblxyXG4gICAgICByZXR1cm4gYnV0dG9uO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBibG9jaygpIHtcclxuICAgIHRoaXMuYnJvYWRjYXN0KCdibG9jaycpO1xyXG4gIH1cclxuXHJcbiAgdW5ibG9jaygpIHtcclxuICAgIHRoaXMuYnJvYWRjYXN0KCd1bmJsb2NrJyk7XHJcbiAgfVxyXG5cclxuICBnZXRMb2dnZXJTZXZlcml0eShzZXZlcml0eTogWmx1eEVycm9yU2V2ZXJpdHkpIHtcclxuICAgIHN3aXRjaCAoc2V2ZXJpdHkpIHtcclxuICAgICAgY2FzZSBabHV4RXJyb3JTZXZlcml0eS5FUlJPUjogcmV0dXJuIHRoaXMubG9nZ2VyLlNFVkVSRTtcclxuICAgICAgY2FzZSBabHV4RXJyb3JTZXZlcml0eS5XQVJOSU5HOiByZXR1cm4gdGhpcy5sb2dnZXIuV0FSTklORztcclxuICAgICAgY2FzZSBabHV4RXJyb3JTZXZlcml0eS5JTkZPOiByZXR1cm4gdGhpcy5sb2dnZXIuSU5GTztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZVJlcG9ydChpZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmJyb2FkY2FzdCgncmVtb3ZlUmVwb3J0JywgaWQpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRXJyb3JSZXBvcnQoc2V2ZXJpdHk6IFpsdXhFcnJvclNldmVyaXR5LCB0aXRsZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpOiBFcnJvclJlcG9ydFN0cnVjdCB7XHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgIGxldCBidXR0b25zID0gb3B0aW9ucy5idXR0b25zIHx8IFtcIkNsb3NlXCJdO1xyXG4gICAgbGV0IHRpbWVzdGFtcDogRGF0ZSB8IHVuZGVmaW5lZDtcclxuICAgIGlmIChvcHRpb25zLnRpbWVzdGFtcCA9PSBmYWxzZSkge1xyXG4gICAgICB0aW1lc3RhbXAgPSB1bmRlZmluZWQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aW1lc3RhbXAgPSBvcHRpb25zLnRpbWVzdGFtcCB8fCBuZXcgRGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1dHRvbnMgPSB0aGlzLnByb2Nlc3NCdXR0b25zKGJ1dHRvbnMpO1xyXG4gICAgY29uc3Qgc3ViamVjdCA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XHJcblxyXG4gICAgbGV0IGVycm9yUmVwb3J0OiBFcnJvclJlcG9ydFN0cnVjdCA9IHtcclxuICAgICAgc2V2ZXJpdHksXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICB0ZXh0LFxyXG4gICAgICBidXR0b25zLFxyXG4gICAgICBzdWJqZWN0LFxyXG4gICAgICB0aW1lc3RhbXAsXHJcbiAgICAgIGlkOiBnZXRTaW1wbGVJRCgpLFxyXG4gICAgICBtb2RhbDogb3B0aW9ucy5ibG9ja2luZyB8fCBmYWxzZSxcclxuICAgICAgdGhlbWU6IG9wdGlvbnMudGhlbWUgfHwgXCJcIixcclxuICAgICAgc3R5bGU6IG9wdGlvbnMuc3R5bGUgfHwge30sXHJcbiAgICAgIGNhbGxUb0FjdGlvbjogb3B0aW9ucy5jYWxsVG9BY3Rpb24gfHwgZmFsc2VcclxuICAgIH07XHJcblxyXG4gICAgLy90aGUgb2JqZWN0IHdpbGwgYmUgc2hhbGxvdyBjbG9uZWRcclxuICAgIHRoaXMuYnJvYWRjYXN0KCdjcmVhdGVSZXBvcnQnLCBlcnJvclJlcG9ydCk7XHJcblxyXG4gICAgaWYgKHRoaXMubG9nZ2VyKSB7XHJcbiAgICAgIHRoaXMubG9nZ2VyLmxvZyh0aGlzLmdldExvZ2dlclNldmVyaXR5KHNldmVyaXR5KSwgdGV4dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVycm9yUmVwb3J0O1xyXG4gIH1cclxuXHJcbiAgcmVwb3J0RXJyb3Ioc2V2ZXJpdHk6IFpsdXhFcnJvclNldmVyaXR5LCB0aXRsZTogc3RyaW5nLCB0ZXh0OiBzdHJpbmcsIG9wdGlvbnM/OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICBsZXQgYnV0dG9ucyA9IG9wdGlvbnMuYnV0dG9ucyB8fCBbXCJDbG9zZVwiXTtcclxuICAgIGNvbnN0IHRpbWVzdGFtcDogRGF0ZSA9IG9wdGlvbnMudGltZXN0YW1wIHx8IG5ldyBEYXRlKCk7XHJcblxyXG4gICAgYnV0dG9ucyA9IHRoaXMucHJvY2Vzc0J1dHRvbnMoYnV0dG9ucyk7XHJcblxyXG4gICAgY29uc3Qgc3ViamVjdCA9IG5ldyBSZXBsYXlTdWJqZWN0KCk7XHJcbiAgICB0aGlzLmJyb2FkY2FzdCgnY3JlYXRlUmVwb3J0Jywge1xyXG4gICAgICBzZXZlcml0eSxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIHRleHQsXHJcbiAgICAgIGJ1dHRvbnMsXHJcbiAgICAgIHN1YmplY3QsXHJcbiAgICAgIHRpbWVzdGFtcCxcclxuICAgICAgaWQ6IGdldFNpbXBsZUlEKCksXHJcbiAgICAgIG1vZGFsOiBvcHRpb25zLmJsb2NraW5nIHx8IGZhbHNlXHJcbiAgICB9IGFzIEVycm9yUmVwb3J0U3RydWN0KTtcclxuXHJcbiAgICBpZiAodGhpcy5sb2dnZXIpIHtcclxuICAgICAgdGhpcy5sb2dnZXIubG9nKHRoaXMuZ2V0TG9nZ2VyU2V2ZXJpdHkoc2V2ZXJpdHkpLCB0ZXh0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc3ViamVjdDtcclxuICB9XHJcbn1cclxuXHJcblxyXG4vKlxyXG4gIFRoaXMgcHJvZ3JhbSBhbmQgdGhlIGFjY29tcGFueWluZyBtYXRlcmlhbHMgYXJlXHJcbiAgbWFkZSBhdmFpbGFibGUgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBFY2xpcHNlIFB1YmxpYyBMaWNlbnNlIHYyLjAgd2hpY2ggYWNjb21wYW5pZXNcclxuICB0aGlzIGRpc3RyaWJ1dGlvbiwgYW5kIGlzIGF2YWlsYWJsZSBhdCBodHRwczovL3d3dy5lY2xpcHNlLm9yZy9sZWdhbC9lcGwtdjIwLmh0bWxcclxuICBcclxuICBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogRVBMLTIuMFxyXG4gIFxyXG4gIENvcHlyaWdodCBDb250cmlidXRvcnMgdG8gdGhlIFpvd2UgUHJvamVjdC5cclxuKi9cclxuXHJcbiJdfQ==