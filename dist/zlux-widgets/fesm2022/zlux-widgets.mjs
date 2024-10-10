import * as i0 from '@angular/core';
import { Component, Injectable, EventEmitter, Input, Output, NgModule, Directive, HostListener, ViewChild } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { Subject, from, ReplaySubject } from 'rxjs';
import * as i2 from '@angular/forms';
import { FormsModule } from '@angular/forms';

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
class ZluxPopupWindowButtonAreaComponent {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupWindowButtonAreaComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.3", type: ZluxPopupWindowButtonAreaComponent, selector: "zlux-popup-window-button-area", ngImport: i0, template: "<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->\r\n\r\n<div class=\"popup-window-button-area\">\r\n  <div class=\"button-area-left\">\r\n    <ng-content select=\".popup-window-button-left\"></ng-content>\r\n  </div>\r\n  <div class=\"button-area-center\">\r\n    <ng-content select=\".popup-window-button-center\"></ng-content>\r\n  </div>\r\n  <div class=\"button-area-right\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n\r\n\r\n<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->", styles: [".popup-window-button-area{font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif;flex:1 0 auto;padding:1rem 1.5rem;background-color:#f6f6f6;display:flex;flex-direction:row}.button-area-left{text-align:left;flex:1 1 100%;white-space:nowrap}.button-area-center{text-align:center;flex:1 1 100%;white-space:nowrap}.button-area-right{text-align:right;flex:1 1 100%;white-space:nowrap}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupWindowButtonAreaComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-popup-window-button-area", template: "<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->\r\n\r\n<div class=\"popup-window-button-area\">\r\n  <div class=\"button-area-left\">\r\n    <ng-content select=\".popup-window-button-left\"></ng-content>\r\n  </div>\r\n  <div class=\"button-area-center\">\r\n    <ng-content select=\".popup-window-button-center\"></ng-content>\r\n  </div>\r\n  <div class=\"button-area-right\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n</div>\r\n\r\n\r\n<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->", styles: [".popup-window-button-area{font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif;flex:1 0 auto;padding:1rem 1.5rem;background-color:#f6f6f6;display:flex;flex-direction:row}.button-area-left{text-align:left;flex:1 1 100%;white-space:nowrap}.button-area-center{text-align:center;flex:1 1 100%;white-space:nowrap}.button-area-right{text-align:right;flex:1 1 100%;white-space:nowrap}\n"] }]
        }] });

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
function getSimpleID() {
    return Number(Math.random() + Date.now());
}
var ZluxErrorSeverity;
(function (ZluxErrorSeverity) {
    ZluxErrorSeverity["ERROR"] = "error";
    ZluxErrorSeverity["WARNING"] = "warning";
    ZluxErrorSeverity["INFO"] = "info";
})(ZluxErrorSeverity || (ZluxErrorSeverity = {}));
class ZluxPopupManagerService {
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

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
class ZluxPopupWindowComponent {
    constructor(popupManager) {
        this.popupManager = popupManager;
        this.header = '';
        this.dark = false;
        this.currentStyle = {};
        this.maxWidth = "";
        this.maxHeight = "";
        this.onCloseWindow = new EventEmitter();
        this.popupStyle = {};
    }
    ngOnInit() {
        if (this.currentStyle) {
            this.popupStyle = this.currentStyle;
        }
        if (this.maxWidth) {
            this.popupStyle['max-width'] = this.maxWidth;
        }
        if (this.maxHeight) {
            this.popupStyle['max-height'] = this.maxHeight;
        }
        this.popupManager.block();
    }
    ngOnDestroy() {
        this.popupManager.unblock();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupWindowComponent, deps: [{ token: ZluxPopupManagerService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.3", type: ZluxPopupWindowComponent, selector: "zlux-popup-window", inputs: { header: "header", dark: "dark", currentStyle: "currentStyle", maxWidth: "maxWidth", maxHeight: "maxHeight" }, outputs: { onCloseWindow: "onCloseWindow" }, ngImport: i0, template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<div class=\"popup-window-popup\" [ngStyle]=\"popupStyle\">\n  <hr class=\"top-header-hr\">\n  <div class=\"popup-window-header-area\" [class.popup-window-header-area-dark]=\"dark\">\n    @if (header) {\n    <div class=\"popup-window-header\">\n      {{header}}\n    </div>\n    }\n    <div class=\"close-button\" [class.close-button-dark]=\"dark\" (click)=\"onCloseWindow.emit()\"></div>\n  </div>\n  <div class=\"bottom-header\" [class.bottom-header-dark]=\"dark\">\n    <hr class=\"bottom-header-hr\" [class.bottom-header-hr-dark]=\"dark\">\n  </div>\n  <div class=\"popup-window-content\">\n    <ng-content>\n\n    </ng-content>\n  </div>\n  <ng-content select=\"zlux-popup-window-button-area\">\n  </ng-content>\n</div>\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [".top-header-hr{height:4px;margin:0;background-color:#047cc0;width:100%;border:none;flex:none}.top-hr:hover{background-color:#009bef}.bottom-header-dark{background-color:#1a354d}.bottom-header-hr{margin:0 2rem;height:1px;background-color:#bdbabd;border:none;flex:none}.bottom-header-hr-dark{background-color:#516577}.popup-window-header-area{margin:0;padding:0;display:flex;flex:none;height:50px;color:#777677}.popup-window-header-area-dark{background-color:#1a354d;color:#c0bfc0}.popup-window-header{margin-left:2rem;font-size:21px;float:left;flex:1 1 auto;display:flex;align-items:center}.close-button{height:20px;width:20px;margin:10px;padding:0;flex:none;box-sizing:border-box;background-color:transparent;transition:.5s;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE+SURBVChTdZK9SsRAFIUziQgBCwufQqwtMhEsUlhYWijYyLKdhbImwz6AxcZCLaxs7LYRrMQnmLCdVhY+g41gZ8h4znA3xF1zIMzcn2/m3ptRAVQUxRnXsixvuP4nY0zqnBvEcTyMAJyqQN3i29Naf1lrZ5LXygONe1FKbdc/9WaIzRtO+GYQ4LW5MMc+U9QB1mg75awvrxvAATXoI5T6uAQE7pwteIjK83wfNz0hYYUg9pdIGi0C3LcQhf4OEJ0SFJdXF6AiWb0whPdUpxGO2hUXgQcAYzG9/kAy1jvctCouUluJTl6rqvoQTxDKujwl3OB7Q6nob8q4T4Q81DOlE+XUkDb9jM9B1QO0TfO18P+J+RnW4U6IEgZ9AEUbh+ZibjRRcxhlWfbMp4E/fb8IzGUrW6VJuo7tbHI1Gf8CPGO2aC/OB9YAAAAASUVORK5CYII=) right top no-repeat}.close-button:hover{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEzSURBVChTY2QAAjc3twIQvWvXrgkgGhtwcXGxYWJiSv7582cqM1BDDlBsIhB7KCsrf7x79+4JsCokANWwHcg0Y2Fh0WL69+/fBSDnC1iWgaHf1dU1BsoGAyQNPBARhqNg56FJ/Pn//3/k7t2712DRUAjyAlgTCACd6QOk1gMxCxCDNLYyMjIWA9koGkAMuCYQADotBKhwOZAJ0ogM4BpAgBlKg8G9e/euKSkpMQM1OkCFQGABUEMllA0GKJqgfpgKZLJBRMBABxiq54GhegvKZ2CC0thCaQEQ/wFikFOXg+RBgiAA1oQjlBKBgZEK5fOA5GEaGXFogHsamlr6ITyGN0BsC1TPlAxkYNUAAlB+KYTHIAK0PYJZRkZmKyhpAAVmo2uAAWAgHAOGqgCQeWL37t2VAPkucwax2AE0AAAAAElFTkSuQmCC)}.close-button:active{background-image:url(data:image/png;base64,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)}.close-button-dark{background:url(data:image/png;base64,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) right top no-repeat}.close-button-dark:hover{background-image:url(data:image/png;base64,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)}.close-button-dark:active{background-image:url(data:image/png;base64,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)}.popup-window-popup{position:fixed;top:0;left:0;right:0;z-index:1000;max-height:80%;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 10px #01010124}@media (min-width: 1450px){.popup-window-popup{width:45%;margin:2em auto}}@media (max-width: 1449px) and (min-width: 1200px){.popup-window-popup{width:55%;margin:2em auto}}@media (max-width: 1199px) and (min-width: 1020px){.popup-window-popup{width:70%;margin:1.5em auto}}@media (max-width: 1019px){.popup-window-popup{width:95%;margin:1em auto}}.popup-window-content{flex:1 1 auto;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column}.popup-window-button{font-size:large;min-width:5em;border-radius:.5em;padding:.5em 1em}\n"], dependencies: [{ kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupWindowComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-popup-window", template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<div class=\"popup-window-popup\" [ngStyle]=\"popupStyle\">\n  <hr class=\"top-header-hr\">\n  <div class=\"popup-window-header-area\" [class.popup-window-header-area-dark]=\"dark\">\n    @if (header) {\n    <div class=\"popup-window-header\">\n      {{header}}\n    </div>\n    }\n    <div class=\"close-button\" [class.close-button-dark]=\"dark\" (click)=\"onCloseWindow.emit()\"></div>\n  </div>\n  <div class=\"bottom-header\" [class.bottom-header-dark]=\"dark\">\n    <hr class=\"bottom-header-hr\" [class.bottom-header-hr-dark]=\"dark\">\n  </div>\n  <div class=\"popup-window-content\">\n    <ng-content>\n\n    </ng-content>\n  </div>\n  <ng-content select=\"zlux-popup-window-button-area\">\n  </ng-content>\n</div>\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [".top-header-hr{height:4px;margin:0;background-color:#047cc0;width:100%;border:none;flex:none}.top-hr:hover{background-color:#009bef}.bottom-header-dark{background-color:#1a354d}.bottom-header-hr{margin:0 2rem;height:1px;background-color:#bdbabd;border:none;flex:none}.bottom-header-hr-dark{background-color:#516577}.popup-window-header-area{margin:0;padding:0;display:flex;flex:none;height:50px;color:#777677}.popup-window-header-area-dark{background-color:#1a354d;color:#c0bfc0}.popup-window-header{margin-left:2rem;font-size:21px;float:left;flex:1 1 auto;display:flex;align-items:center}.close-button{height:20px;width:20px;margin:10px;padding:0;flex:none;box-sizing:border-box;background-color:transparent;transition:.5s;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAE+SURBVChTdZK9SsRAFIUziQgBCwufQqwtMhEsUlhYWijYyLKdhbImwz6AxcZCLaxs7LYRrMQnmLCdVhY+g41gZ8h4znA3xF1zIMzcn2/m3ptRAVQUxRnXsixvuP4nY0zqnBvEcTyMAJyqQN3i29Naf1lrZ5LXygONe1FKbdc/9WaIzRtO+GYQ4LW5MMc+U9QB1mg75awvrxvAATXoI5T6uAQE7pwteIjK83wfNz0hYYUg9pdIGi0C3LcQhf4OEJ0SFJdXF6AiWb0whPdUpxGO2hUXgQcAYzG9/kAy1jvctCouUluJTl6rqvoQTxDKujwl3OB7Q6nob8q4T4Q81DOlE+XUkDb9jM9B1QO0TfO18P+J+RnW4U6IEgZ9AEUbh+ZibjRRcxhlWfbMp4E/fb8IzGUrW6VJuo7tbHI1Gf8CPGO2aC/OB9YAAAAASUVORK5CYII=) right top no-repeat}.close-button:hover{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAEzSURBVChTY2QAAjc3twIQvWvXrgkgGhtwcXGxYWJiSv7582cqM1BDDlBsIhB7KCsrf7x79+4JsCokANWwHcg0Y2Fh0WL69+/fBSDnC1iWgaHf1dU1BsoGAyQNPBARhqNg56FJ/Pn//3/k7t2712DRUAjyAlgTCACd6QOk1gMxCxCDNLYyMjIWA9koGkAMuCYQADotBKhwOZAJ0ogM4BpAgBlKg8G9e/euKSkpMQM1OkCFQGABUEMllA0GKJqgfpgKZLJBRMBABxiq54GhegvKZ2CC0thCaQEQ/wFikFOXg+RBgiAA1oQjlBKBgZEK5fOA5GEaGXFogHsamlr6ITyGN0BsC1TPlAxkYNUAAlB+KYTHIAK0PYJZRkZmKyhpAAVmo2uAAWAgHAOGqgCQeWL37t2VAPkucwax2AE0AAAAAElFTkSuQmCC)}.close-button:active{background-image:url(data:image/png;base64,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)}.close-button-dark{background:url(data:image/png;base64,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) right top no-repeat}.close-button-dark:hover{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAKBJREFUeNqM0qERwzAMhWGBDNMhMkJgYEEHKBDoAN4gI3iAjNafBRa8Eqen+OykQETS55N8MkkGOOCSrBfACGRgMOAJqISfgK30rHVCwP0ECPBW4QPMPSDJ4otTATtMLXBABc4Bqrdra+lUgVz32MXS+6hTEzVADqNuwHhAvV8CHiH3g10QJvBQewM3K2NcXcQr9CQDBmD94/YWYJFk3wEAnvMrzEHzZDcAAAAASUVORK5CYII=)}.close-button-dark:active{background-image:url(data:image/png;base64,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)}.popup-window-popup{position:fixed;top:0;left:0;right:0;z-index:1000;max-height:80%;background:#fff;display:flex;flex-direction:column;box-shadow:0 0 10px #01010124}@media (min-width: 1450px){.popup-window-popup{width:45%;margin:2em auto}}@media (max-width: 1449px) and (min-width: 1200px){.popup-window-popup{width:55%;margin:2em auto}}@media (max-width: 1199px) and (min-width: 1020px){.popup-window-popup{width:70%;margin:1.5em auto}}@media (max-width: 1019px){.popup-window-popup{width:95%;margin:1em auto}}.popup-window-content{flex:1 1 auto;overflow-y:auto;overflow-x:hidden;display:flex;flex-direction:column}.popup-window-button{font-size:large;min-width:5em;border-radius:.5em;padding:.5em 1em}\n"] }]
        }], ctorParameters: () => [{ type: ZluxPopupManagerService }], propDecorators: { header: [{
                type: Input
            }], dark: [{
                type: Input
            }], currentStyle: [{
                type: Input
            }], maxWidth: [{
                type: Input
            }], maxHeight: [{
                type: Input
            }], onCloseWindow: [{
                type: Output
            }] } });
class ZluxPopupWindowModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupWindowModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupWindowModule, declarations: [ZluxPopupWindowComponent, ZluxPopupWindowButtonAreaComponent], imports: [CommonModule], exports: [ZluxPopupWindowComponent, ZluxPopupWindowButtonAreaComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupWindowModule, providers: [ZluxPopupManagerService], imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupWindowModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxPopupWindowComponent, ZluxPopupWindowButtonAreaComponent],
                    declarations: [ZluxPopupWindowComponent, ZluxPopupWindowButtonAreaComponent],
                    providers: [ZluxPopupManagerService]
                }]
        }] });

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
class ZluxButtonComponent {
    constructor() {
        this.buttonType = 'button';
        this.label = '';
        this.disabled = false;
        this.callToAction = false;
        this.lightSkin = false;
        this.onClick = new EventEmitter();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.3", type: ZluxButtonComponent, selector: "zlux-button", inputs: { buttonType: "buttonType", label: "label", disabled: "disabled", callToAction: "callToAction", lightSkin: "lightSkin" }, outputs: { onClick: "onClick" }, ngImport: i0, template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<button [attr.type]=\"buttonType\" [disabled]=\"disabled\" class=\"zlux-button\"\n  [ngClass]=\"{ 'zlux-action-button': callToAction, 'light': lightSkin }\" (click)=\"onClick.emit($event)\">\n  @if (label) {\n  {{label}}\n  } @else {\n  <ng-content></ng-content>\n  }\n</button>\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\nntributors to the Zowe Project.\nntributors to the Zowe Project.\n-->", styles: [":host{margin:0 .5rem;display:inline-block}.zlux-button{background-color:transparent;border:1px solid #047cc0;border-radius:2px;font-size:14px;font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif;color:#047cc0;width:100%;height:2rem;padding:0 1rem;display:block}.zlux-action-button{background-color:#047cc0;color:#f6f6f6}.zlux-button:hover:not([disabled]){background-color:#175d8d;color:#f6f6f6}.zlux-button:active:not([disabled]){background-color:#1c496d;color:#f6f6f6}.zlux-button:disabled{opacity:.6}.zlux-button.light{border-color:#98c4eb;color:#98c4eb}.zlux-button.light:hover:not([disabled]){background-color:#5fa8e0;color:#464646}.zlux-button.light:active:not([disabled]){background-color:#2e96d5;color:#464646}.zlux-action-button.light{background-color:#98c4eb;color:#464646}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-button", template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<button [attr.type]=\"buttonType\" [disabled]=\"disabled\" class=\"zlux-button\"\n  [ngClass]=\"{ 'zlux-action-button': callToAction, 'light': lightSkin }\" (click)=\"onClick.emit($event)\">\n  @if (label) {\n  {{label}}\n  } @else {\n  <ng-content></ng-content>\n  }\n</button>\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\nntributors to the Zowe Project.\nntributors to the Zowe Project.\n-->", styles: [":host{margin:0 .5rem;display:inline-block}.zlux-button{background-color:transparent;border:1px solid #047cc0;border-radius:2px;font-size:14px;font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif;color:#047cc0;width:100%;height:2rem;padding:0 1rem;display:block}.zlux-action-button{background-color:#047cc0;color:#f6f6f6}.zlux-button:hover:not([disabled]){background-color:#175d8d;color:#f6f6f6}.zlux-button:active:not([disabled]){background-color:#1c496d;color:#f6f6f6}.zlux-button:disabled{opacity:.6}.zlux-button.light{border-color:#98c4eb;color:#98c4eb}.zlux-button.light:hover:not([disabled]){background-color:#5fa8e0;color:#464646}.zlux-button.light:active:not([disabled]){background-color:#2e96d5;color:#464646}.zlux-action-button.light{background-color:#98c4eb;color:#464646}\n"] }]
        }], propDecorators: { buttonType: [{
                type: Input
            }], label: [{
                type: Input
            }], disabled: [{
                type: Input
            }], callToAction: [{
                type: Input
            }], lightSkin: [{
                type: Input
            }], onClick: [{
                type: Output
            }] } });
class ZluxButtonModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxButtonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxButtonModule, declarations: [ZluxButtonComponent], imports: [CommonModule], exports: [ZluxButtonComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxButtonModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxButtonModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxButtonComponent],
                    declarations: [ZluxButtonComponent]
                }]
        }] });

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
class ZluxCheckboxComponent {
    constructor() {
        this.value = false;
        this.valueChange = new EventEmitter();
        this.label = '';
        this.inputId = '';
        this.dark = false;
        this.disabled = false;
        this.styleClass = '';
    }
    onValueChange(model) {
        this.value = model;
        console.log('checkbox value', model);
        this.valueChange.emit(model);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxCheckboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.3", type: ZluxCheckboxComponent, selector: "zlux-checkbox", inputs: { value: "value", label: "label", inputId: "inputId", dark: "dark", disabled: "disabled", style: "style", styleClass: "styleClass" }, outputs: { valueChange: "valueChange" }, ngImport: i0, template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<input [attr.id]=\"inputId\" type=\"checkbox\" [ngModel]=\"value\" (ngModelChange)=\"onValueChange($event)\"\n  [class]=\"styleClass\" [style]=\"style\" [disabled]=\"disabled\" #advMode=\"ngModel\">\n<label [attr.for]=\"inputId\" class=\"checkbox-area\">\n  <span [ngClass]=\"{ 'checkbox-dark': dark }\">\n    @if (dark) {\n    <img src=\"../../assets/images/checkbox-checked-dark.png\" alt=\" \">\n    } @else {\n    <img src=\"../../assets/images/checkbox-checked.png\" alt=\" \">\n    }\n  </span>\n  {{label}}\n</label>\n\n\n<!--\n  This program and the accompanying materials are\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\n  SPDX-License-Identifier: EPL-2.0\n\n  Copyright Contributors to the Zowe Project.\n  -->", styles: [".checkbox-area{position:relative;padding-left:30px;white-space:nowrap}input[type=checkbox]{display:none}input[type=checkbox]+label{color:#5fa8e0}input[type=checkbox]+label span{display:inline-block;width:16px;height:16px;border:1px solid #047cc0;border-radius:2px;padding:2px;margin-right:1em;vertical-align:middle;background:transparent;cursor:pointer}input[type=checkbox]+label span.checkbox-dark{border:1px solid #56acf2}input[type=checkbox]:hover:not(:disabled)+label span{border:1px solid #175d8d;background-color:#c0bfc0}input[type=checkbox]:hover:not(:disabled)+label span.checkbox-dark{border:1px solid #009bef;background-color:#454646}input[type=checkbox]:active:not(:disabled)+label span{border:1px solid #1c496d;background-color:#777677}input[type=checkbox]:active:not(:disabled)+label span.checkbox-dark{border:1px solid #047cc0;background-color:#333334}input[type=checkbox]:disabled+label span{opacity:.6}input[type=checkbox]+label span img{position:absolute;display:none}input[type=checkbox]:checked+label span{background-color:#047cc0}input[type=checkbox]:checked+label span.checkbox-dark{background-color:#56acf2}input[type=checkbox]:checked:hover:not(:disabled)+label span{background-color:#175d8d}input[type=checkbox]:checked:hover:not(:disabled)+label span.checkbox-dark{background-color:#009bef}input[type=checkbox]:checked:active:not(:disabled)+label span{background-color:#1c496d}input[type=checkbox]:checked:active:not(:disabled)+label span.checkbox-dark{background-color:#047cc0}input[type=checkbox]:checked+label span img{display:inline}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxCheckboxComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-checkbox", template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<input [attr.id]=\"inputId\" type=\"checkbox\" [ngModel]=\"value\" (ngModelChange)=\"onValueChange($event)\"\n  [class]=\"styleClass\" [style]=\"style\" [disabled]=\"disabled\" #advMode=\"ngModel\">\n<label [attr.for]=\"inputId\" class=\"checkbox-area\">\n  <span [ngClass]=\"{ 'checkbox-dark': dark }\">\n    @if (dark) {\n    <img src=\"../../assets/images/checkbox-checked-dark.png\" alt=\" \">\n    } @else {\n    <img src=\"../../assets/images/checkbox-checked.png\" alt=\" \">\n    }\n  </span>\n  {{label}}\n</label>\n\n\n<!--\n  This program and the accompanying materials are\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\n  SPDX-License-Identifier: EPL-2.0\n\n  Copyright Contributors to the Zowe Project.\n  -->", styles: [".checkbox-area{position:relative;padding-left:30px;white-space:nowrap}input[type=checkbox]{display:none}input[type=checkbox]+label{color:#5fa8e0}input[type=checkbox]+label span{display:inline-block;width:16px;height:16px;border:1px solid #047cc0;border-radius:2px;padding:2px;margin-right:1em;vertical-align:middle;background:transparent;cursor:pointer}input[type=checkbox]+label span.checkbox-dark{border:1px solid #56acf2}input[type=checkbox]:hover:not(:disabled)+label span{border:1px solid #175d8d;background-color:#c0bfc0}input[type=checkbox]:hover:not(:disabled)+label span.checkbox-dark{border:1px solid #009bef;background-color:#454646}input[type=checkbox]:active:not(:disabled)+label span{border:1px solid #1c496d;background-color:#777677}input[type=checkbox]:active:not(:disabled)+label span.checkbox-dark{border:1px solid #047cc0;background-color:#333334}input[type=checkbox]:disabled+label span{opacity:.6}input[type=checkbox]+label span img{position:absolute;display:none}input[type=checkbox]:checked+label span{background-color:#047cc0}input[type=checkbox]:checked+label span.checkbox-dark{background-color:#56acf2}input[type=checkbox]:checked:hover:not(:disabled)+label span{background-color:#175d8d}input[type=checkbox]:checked:hover:not(:disabled)+label span.checkbox-dark{background-color:#009bef}input[type=checkbox]:checked:active:not(:disabled)+label span{background-color:#1c496d}input[type=checkbox]:checked:active:not(:disabled)+label span.checkbox-dark{background-color:#047cc0}input[type=checkbox]:checked+label span img{display:inline}\n"] }]
        }], propDecorators: { value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }], label: [{
                type: Input
            }], inputId: [{
                type: Input
            }], dark: [{
                type: Input
            }], disabled: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }] } });
class ZluxCheckboxModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxCheckboxModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxCheckboxModule, declarations: [ZluxCheckboxComponent], imports: [CommonModule, FormsModule], exports: [ZluxCheckboxComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxCheckboxModule, imports: [CommonModule, FormsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxCheckboxModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, FormsModule],
                    exports: [ZluxCheckboxComponent],
                    declarations: [ZluxCheckboxComponent]
                }]
        }] });

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
// import '../../assets/css/inputtext.css';
class ZluxInputText {
    constructor() {
        this.dark = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxInputText, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.3", type: ZluxInputText, selector: "[zluxInputText]", inputs: { dark: "dark" }, host: { properties: { "class.text-input": "true", "class.text-input-dark": "dark" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxInputText, decorators: [{
            type: Directive,
            args: [{
                    selector: '[zluxInputText]',
                    host: {
                        '[class.text-input]': 'true',
                        '[class.text-input-dark]': 'dark'
                    },
                }]
        }], propDecorators: { dark: [{
                type: Input
            }] } });
class ZluxInputTextModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxInputTextModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxInputTextModule, declarations: [ZluxInputText], imports: [CommonModule], exports: [ZluxInputText] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxInputTextModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxInputTextModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxInputText],
                    declarations: [ZluxInputText]
                }]
        }] });

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
class ZluxVeilComponent {
    constructor() {
        this.isEnabled = false;
        this.enableSpinner = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxVeilComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.3", type: ZluxVeilComponent, selector: "zlux-veil", inputs: { isEnabled: "isEnabled", enableSpinner: "enableSpinner" }, ngImport: i0, template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<div class=\"veil\" [ngClass]=\"{'state-active': isEnabled}\">\n  @if (enableSpinner) {\n  <img class=\"rotated\" src=\"../../assets/images/veil-loaderrotate.png\" />\n  }\n</div>\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [".veil{display:none;position:absolute;opacity:.5;z-index:1;background:gray;background:#00000080;flex:1 1 auto;flex-direction:column;inset:0}.state-active{display:flex!important}.veil>img{position:absolute;left:calc(50% - 21px);top:calc(50% - 21px);height:42px;width:42px;z-index:2;transform:rotate(360deg)}.rotated{animation:swirl 3s linear infinite}@keyframes swirl{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxVeilComponent, decorators: [{
            type: Component,
            args: [{ selector: 'zlux-veil', template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<div class=\"veil\" [ngClass]=\"{'state-active': isEnabled}\">\n  @if (enableSpinner) {\n  <img class=\"rotated\" src=\"../../assets/images/veil-loaderrotate.png\" />\n  }\n</div>\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [".veil{display:none;position:absolute;opacity:.5;z-index:1;background:gray;background:#00000080;flex:1 1 auto;flex-direction:column;inset:0}.state-active{display:flex!important}.veil>img{position:absolute;left:calc(50% - 21px);top:calc(50% - 21px);height:42px;width:42px;z-index:2;transform:rotate(360deg)}.rotated{animation:swirl 3s linear infinite}@keyframes swirl{0%{transform:rotate(0)}to{transform:rotate(360deg)}}\n"] }]
        }], propDecorators: { isEnabled: [{
                type: Input
            }], enableSpinner: [{
                type: Input
            }] } });
class ZluxVeilModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxVeilModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxVeilModule, declarations: [ZluxVeilComponent], imports: [CommonModule], exports: [ZluxVeilComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxVeilModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxVeilModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxVeilComponent],
                    declarations: [ZluxVeilComponent]
                }]
        }] });

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
class ZluxPopupPanelComponent {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupPanelComponent, deps: [{ token: ZluxPopupManagerService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.3", type: ZluxPopupPanelComponent, selector: "zlux-popup-panel", inputs: { modal: "modal", autoShow: "autoShow", ignoreVeil: "ignoreVeil", blockDisplay: "blockDisplay" }, ngImport: i0, template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n@if (isActive) {\n<div [ngClass]=\"{'popup-panel': true, 'ignoreVeil': ignoreVeil, 'blockDisplay': blockDisplay}\">\n  <ng-content>\n  </ng-content>\n</div>\n}\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [".popup-panel{display:inline-block;position:relative;margin:0;padding:0;z-index:50}.blockDisplay{display:block}.ignoreVeil{z-index:200}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupPanelComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-popup-panel", template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n@if (isActive) {\n<div [ngClass]=\"{'popup-panel': true, 'ignoreVeil': ignoreVeil, 'blockDisplay': blockDisplay}\">\n  <ng-content>\n  </ng-content>\n</div>\n}\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [".popup-panel{display:inline-block;position:relative;margin:0;padding:0;z-index:50}.blockDisplay{display:block}.ignoreVeil{z-index:200}\n"] }]
        }], ctorParameters: () => [{ type: ZluxPopupManagerService }], propDecorators: { modal: [{
                type: Input
            }], autoShow: [{
                type: Input
            }], ignoreVeil: [{
                type: Input
            }], blockDisplay: [{
                type: Input
            }] } });
class ZluxPopupPanelModule {
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

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
class ZluxErrorReportComponent {
    constructor() {
        this.severity = 'error';
        this.title = '';
        this.theme = '';
        this.style = {};
        this.buttons = [];
        this.timestamp = undefined;
        this.callToAction = false;
        this.action = new EventEmitter();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxErrorReportComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.3", type: ZluxErrorReportComponent, selector: "zlux-error-report", inputs: { severity: "severity", title: "title", theme: "theme", style: "style", buttons: "buttons", timestamp: "timestamp", callToAction: "callToAction" }, outputs: { action: "action" }, ngImport: i0, template: "\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<div [ngClass]=\"'report ' + severity + ' ' + theme\" [ngStyle]=\"style\">\n  <div [ngClass]=\"'leftPanel ' + theme\">\n    <div [ngClass]=\"'severityIcon ' + theme\">\n    </div>\n  </div>\n  <div ngClass=\"mainPanel\">\n    <div ngClass=\"title\">\n      <div ngClass=\"titleText\">\n        {{title}}\n      </div>\n      @if (timestamp) {\n        <div class=\"timestamp\">\n          {{timestamp.toLocaleString()}}\n        </div>\n      }\n    </div>\n\n    <div ngClass=\"content\">\n      <ng-content>\n      </ng-content>\n    </div>\n    @if (buttons.length > 0) {\n      <div\n        ngClass=\"buttonArea\"\n        >\n        @for (button of buttons; track button) {\n          <zlux-button\n            [label]=\"button\"\n            (click)=\"action.emit(button)\"\n            [callToAction]=\"callToAction || false\"\n            >\n          </zlux-button>\n        }\n      </div>\n    }\n  </div>\n</div>\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n", styles: [".report{padding:0;border-left:none;display:flex;flex-direction:row}.report.error{background-color:#f7e6e6}.report.warning{background-color:#f2f2f2}.report.warning.dark{background-color:#24272d;color:#dddee0}.report.info{background-color:#f2f2f2}.leftPanel{margin:0;padding:0}.mainPanel{padding:10px 20px;flex-grow:1}.error .mainPanel{border:rgba(255,92,73,1) 1px solid}.warning .mainPanel{border:rgba(254,133,0,1) 1px solid}.info .mainPanel{border:rgba(0,182,203,1) 1px solid}.content{margin-top:16px;padding:5px 5px 0;user-select:text;-ms-user-select:text;-moz-user-select:text;-webkit-user-select:text}.severityIcon{width:32px;height:32px;margin:16px;background-repeat:no-repeat}.severityIcon.dark{filter:invert(50%) sepia(50%) saturate(4000%) hue-rotate(0deg)}.error .leftPanel{background-color:#ff5c49}.error .severityIcon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKLSURBVFhH7Zc9chNBEIVXSiFDOgoQIENsIp/BPgBcwjoAgR2RihNYJgY54RD2CYgQqcz3Zt+sRp7d9WjlKqooXlXXzLzuftO72vlR9R+l2Gw2U+wcu8F+3T+AOPsUM3Xa4ZAYduV5ikHOsqSQkdtWIHBK82k0Gj2rmapC+4bmG9yPmgncPc1r7C38m0AC6DXNx/F4/Llm9gCTLyQcwfiy5IkInRB3UWfVYPzF7jIowblKvsOO7CqGcrBby5QXQeCZc5R0iw3+oJQrDctJ78yudjghfOFK1NiuwbBmKMLaE7tyELBUoDEzfTDQPbKmilia3gWOqWMUdGF6B/ALiXmYgdQZ/tbfWpq1ekD+Fgg4t1MFZK9ewvatsawIcVj8+RamG0BP5BPwz01vAbmyU+s8A3w6wZqm+YnU7/KlwBfnWJnaIhHIqzPwqQhNoDhtvRrvFKaxwzPgm8dcU1vIYZyYaoUmkIAC1Sb9ziePwH+iWMFUNXZbDLbV72y3x2isaZ/L1Md1TD9/tQnSiSP2LqADvWdKH/YugIeYYV/jk8vo67C61s9TR7WDuKzQpgCEfrt9FYgW4NPk15pQE0O9l6nvIrSRdX4H+IK2c3dB9b3LUMLJBxdWgF0PP8zOlQDfuwzDEjGynQp/3Ig0UfaU8GkR2W4Il+60rRtRGnBpegcSxt35ivGriGwXFKRZqwf99kMOx987jARVhsWd7kmOY6R0Q2qO40c1CThVsODE7vP7ESg3Ti5I265+ENjcByWA9a7vNigHu7OMdIbfCwXGRZdSxWDFl9KDr+WMf9J/QfuS4Tv66bVcm9uHQdfyCD9RujqK4JzB308GFzLHVlhYKSngmr9mDJ9u4n8cVfUHwflgtdXFrDgAAAAASUVORK5CYII=)}.warning .leftPanel{background-color:#fe8500}.warning .leftPanel.dark{background-color:#dddee0}.info .leftPanel{background-color:#00b6cb}.warning .severityIcon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHYSURBVFhH7ZbRTcMwFEWbzACIEegPE9AZ2hnKCmUFBkCITgAbMEFZoAPAdyP+2v+Wc81tSBQHUjUJQuJIVp6vn+9zk9jp4J8/zXa7ndMe3O0XCg9pa9pmt9tdWO4PCj9TOKDYcj9Qc/JZusTEw93DL16qItcVLXO89HC3UOhGBQXxlHbtrvozp3UDBU5pKxfLf7Fia5lyLLcP5nMVEsQjy9JHlqXPLbcLxkPXUJHKWy/NwxofWm4PTBc239Aqt1kabe2cF8vtgGe+7TCvPfk05jTR3rbE+E2OXFeWAqEMuBtQjjSur5aOA6NZqALEY8sBy6UF0C3ereO2JQZ6rjrrZVY5aEIVcDdHudI1Vx6WD4fJj6ECEFfebA/FFlDcMU+WD6OJCboOntJ7sUdzPD26+B9h0v426pMbvY3KUXO3hObQah/fntTXEkwYJ0ly6e59mqbvjhvjOXeK5cU6mm9LFrD/wh29lfCIbuFaSLzVBFO7asZOyNVbvrEURR7BCeRtOQ4Jxee2sByFlEYLEPKy5/fbksFOPijysq1843/fGCh+Ulv/p4tn/imHK8tfkNDO6VUD1uGRuUZ5WyJMNdAnqqnaiReQsVfPFPcFa8g4K87d/ee3GAw+APlOJt5y8i66AAAAAElFTkSuQmCC)}.info .severityIcon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIvSURBVFhH7Zc/UgIxFMYXWu2EO9hZqTMqcBc4gF4CDmABla2eQHoZbKz0AnICK7EFvy/7JWTdLISFtXD8zbx5m/cvj7jJxuSfWBaLRRPShzxDPpc/oE0+xjSVtjssBnnUPNEgZxzTSE06CAp0oW5rtdpBakkS1H6GmsD2klqMbQl1DmnDfmmMAOY51E29Xr9LLVuAye9Z2ILxKOYXIbSBuGGalYLxg9xxMEG5TJ5BWnJFwxzIu8rEN4HAnnKYxALHcm0N8vn++E305AqjBPOGM5FjuXLA55YZzyOZc7AGaymOtRty5UHAmIHiSuYcLKoYh1xBEN9SGJsYy5zFL4rnocxBENJII1fIVQhrKpTkVwEBfTnZwMa33S+I58I/gQVhrmnED2ReAeNUTu7zSvDmmMqU1KXJifSTdBVMpO1cqwZwgh1KuxMuBH9BCLnXYmvbuYi/ApUTanTrBtC9QcOd+dUVCDXuGsDqfEmfGUMF2NrQ/Eoa/BV4le5IV0Fb+k0604DZIlilC3RYfF6XBHu/idr2rmC34woGYGIDnmNOtgwyF8KaCmX98EkLx8aPkXyFKCwD6m7+GBF2BpkrMPg5NlXWoDAHTLwhuc9xqGYGBHQZTJRY+n1grp2csLZc60Gguw+yAKTslWymMqxT/l5IMI66lDIGEn0p3flajvEHno+gTzHseFuNPh5u16Wu5Rb9In93RKGc/Z0namQAmULMTvGBzf1rhuHeD7K/SpJ8A3hbpnaeSm0cAAAAAElFTkSuQmCC)}.title{border-bottom:1px solid;font-kerning:normal;display:flex;flex-wrap:nowrap;justify-content:space-between;align-items:flex-end}.titleText{font-size:150%;font-size:21px}.error .title{border-bottom-color:#aa231f;color:#aa231f}.warning .title{border-bottom-color:#e99023;color:#e99023}.info .title{border-bottom-color:#188291;color:#188291}.buttonArea{margin:36px 10px 0;display:flex;flex-direction:row;justify-content:flex-end}.timestamp{font-size:12px;padding-left:12px}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: ZluxButtonComponent, selector: "zlux-button", inputs: ["buttonType", "label", "disabled", "callToAction", "lightSkin"], outputs: ["onClick"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxErrorReportComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-error-report", template: "\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<div [ngClass]=\"'report ' + severity + ' ' + theme\" [ngStyle]=\"style\">\n  <div [ngClass]=\"'leftPanel ' + theme\">\n    <div [ngClass]=\"'severityIcon ' + theme\">\n    </div>\n  </div>\n  <div ngClass=\"mainPanel\">\n    <div ngClass=\"title\">\n      <div ngClass=\"titleText\">\n        {{title}}\n      </div>\n      @if (timestamp) {\n        <div class=\"timestamp\">\n          {{timestamp.toLocaleString()}}\n        </div>\n      }\n    </div>\n\n    <div ngClass=\"content\">\n      <ng-content>\n      </ng-content>\n    </div>\n    @if (buttons.length > 0) {\n      <div\n        ngClass=\"buttonArea\"\n        >\n        @for (button of buttons; track button) {\n          <zlux-button\n            [label]=\"button\"\n            (click)=\"action.emit(button)\"\n            [callToAction]=\"callToAction || false\"\n            >\n          </zlux-button>\n        }\n      </div>\n    }\n  </div>\n</div>\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n", styles: [".report{padding:0;border-left:none;display:flex;flex-direction:row}.report.error{background-color:#f7e6e6}.report.warning{background-color:#f2f2f2}.report.warning.dark{background-color:#24272d;color:#dddee0}.report.info{background-color:#f2f2f2}.leftPanel{margin:0;padding:0}.mainPanel{padding:10px 20px;flex-grow:1}.error .mainPanel{border:rgba(255,92,73,1) 1px solid}.warning .mainPanel{border:rgba(254,133,0,1) 1px solid}.info .mainPanel{border:rgba(0,182,203,1) 1px solid}.content{margin-top:16px;padding:5px 5px 0;user-select:text;-ms-user-select:text;-moz-user-select:text;-webkit-user-select:text}.severityIcon{width:32px;height:32px;margin:16px;background-repeat:no-repeat}.severityIcon.dark{filter:invert(50%) sepia(50%) saturate(4000%) hue-rotate(0deg)}.error .leftPanel{background-color:#ff5c49}.error .severityIcon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKLSURBVFhH7Zc9chNBEIVXSiFDOgoQIENsIp/BPgBcwjoAgR2RihNYJgY54RD2CYgQqcz3Zt+sRp7d9WjlKqooXlXXzLzuftO72vlR9R+l2Gw2U+wcu8F+3T+AOPsUM3Xa4ZAYduV5ikHOsqSQkdtWIHBK82k0Gj2rmapC+4bmG9yPmgncPc1r7C38m0AC6DXNx/F4/Llm9gCTLyQcwfiy5IkInRB3UWfVYPzF7jIowblKvsOO7CqGcrBby5QXQeCZc5R0iw3+oJQrDctJ78yudjghfOFK1NiuwbBmKMLaE7tyELBUoDEzfTDQPbKmilia3gWOqWMUdGF6B/ALiXmYgdQZ/tbfWpq1ekD+Fgg4t1MFZK9ewvatsawIcVj8+RamG0BP5BPwz01vAbmyU+s8A3w6wZqm+YnU7/KlwBfnWJnaIhHIqzPwqQhNoDhtvRrvFKaxwzPgm8dcU1vIYZyYaoUmkIAC1Sb9ziePwH+iWMFUNXZbDLbV72y3x2isaZ/L1Md1TD9/tQnSiSP2LqADvWdKH/YugIeYYV/jk8vo67C61s9TR7WDuKzQpgCEfrt9FYgW4NPk15pQE0O9l6nvIrSRdX4H+IK2c3dB9b3LUMLJBxdWgF0PP8zOlQDfuwzDEjGynQp/3Ig0UfaU8GkR2W4Il+60rRtRGnBpegcSxt35ivGriGwXFKRZqwf99kMOx987jARVhsWd7kmOY6R0Q2qO40c1CThVsODE7vP7ESg3Ti5I265+ENjcByWA9a7vNigHu7OMdIbfCwXGRZdSxWDFl9KDr+WMf9J/QfuS4Tv66bVcm9uHQdfyCD9RujqK4JzB308GFzLHVlhYKSngmr9mDJ9u4n8cVfUHwflgtdXFrDgAAAAASUVORK5CYII=)}.warning .leftPanel{background-color:#fe8500}.warning .leftPanel.dark{background-color:#dddee0}.info .leftPanel{background-color:#00b6cb}.warning .severityIcon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHYSURBVFhH7ZbRTcMwFEWbzACIEegPE9AZ2hnKCmUFBkCITgAbMEFZoAPAdyP+2v+Wc81tSBQHUjUJQuJIVp6vn+9zk9jp4J8/zXa7ndMe3O0XCg9pa9pmt9tdWO4PCj9TOKDYcj9Qc/JZusTEw93DL16qItcVLXO89HC3UOhGBQXxlHbtrvozp3UDBU5pKxfLf7Fia5lyLLcP5nMVEsQjy9JHlqXPLbcLxkPXUJHKWy/NwxofWm4PTBc239Aqt1kabe2cF8vtgGe+7TCvPfk05jTR3rbE+E2OXFeWAqEMuBtQjjSur5aOA6NZqALEY8sBy6UF0C3ereO2JQZ6rjrrZVY5aEIVcDdHudI1Vx6WD4fJj6ECEFfebA/FFlDcMU+WD6OJCboOntJ7sUdzPD26+B9h0v426pMbvY3KUXO3hObQah/fntTXEkwYJ0ly6e59mqbvjhvjOXeK5cU6mm9LFrD/wh29lfCIbuFaSLzVBFO7asZOyNVbvrEURR7BCeRtOQ4Jxee2sByFlEYLEPKy5/fbksFOPijysq1843/fGCh+Ulv/p4tn/imHK8tfkNDO6VUD1uGRuUZ5WyJMNdAnqqnaiReQsVfPFPcFa8g4K87d/ee3GAw+APlOJt5y8i66AAAAAElFTkSuQmCC)}.info .severityIcon{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIvSURBVFhH7Zc/UgIxFMYXWu2EO9hZqTMqcBc4gF4CDmABla2eQHoZbKz0AnICK7EFvy/7JWTdLISFtXD8zbx5m/cvj7jJxuSfWBaLRRPShzxDPpc/oE0+xjSVtjssBnnUPNEgZxzTSE06CAp0oW5rtdpBakkS1H6GmsD2klqMbQl1DmnDfmmMAOY51E29Xr9LLVuAye9Z2ILxKOYXIbSBuGGalYLxg9xxMEG5TJ5BWnJFwxzIu8rEN4HAnnKYxALHcm0N8vn++E305AqjBPOGM5FjuXLA55YZzyOZc7AGaymOtRty5UHAmIHiSuYcLKoYh1xBEN9SGJsYy5zFL4rnocxBENJII1fIVQhrKpTkVwEBfTnZwMa33S+I58I/gQVhrmnED2ReAeNUTu7zSvDmmMqU1KXJifSTdBVMpO1cqwZwgh1KuxMuBH9BCLnXYmvbuYi/ApUTanTrBtC9QcOd+dUVCDXuGsDqfEmfGUMF2NrQ/Eoa/BV4le5IV0Fb+k0604DZIlilC3RYfF6XBHu/idr2rmC34woGYGIDnmNOtgwyF8KaCmX98EkLx8aPkXyFKCwD6m7+GBF2BpkrMPg5NlXWoDAHTLwhuc9xqGYGBHQZTJRY+n1grp2csLZc60Gguw+yAKTslWymMqxT/l5IMI66lDIGEn0p3flajvEHno+gTzHseFuNPh5u16Wu5Rb9In93RKGc/Z0namQAmULMTvGBzf1rhuHeD7K/SpJ8A3hbpnaeSm0cAAAAAElFTkSuQmCC)}.title{border-bottom:1px solid;font-kerning:normal;display:flex;flex-wrap:nowrap;justify-content:space-between;align-items:flex-end}.titleText{font-size:150%;font-size:21px}.error .title{border-bottom-color:#aa231f;color:#aa231f}.warning .title{border-bottom-color:#e99023;color:#e99023}.info .title{border-bottom-color:#188291;color:#188291}.buttonArea{margin:36px 10px 0;display:flex;flex-direction:row;justify-content:flex-end}.timestamp{font-size:12px;padding-left:12px}\n"] }]
        }], ctorParameters: () => [], propDecorators: { severity: [{
                type: Input
            }], title: [{
                type: Input
            }], theme: [{
                type: Input
            }], style: [{
                type: Input
            }], buttons: [{
                type: Input
            }], timestamp: [{
                type: Input
            }], callToAction: [{
                type: Input
            }], action: [{
                type: Output
            }] } });
class ZluxErrorReportModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxErrorReportModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxErrorReportModule, declarations: [ZluxErrorReportComponent], imports: [CommonModule, ZluxButtonModule], exports: [ZluxErrorReportComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxErrorReportModule, imports: [CommonModule, ZluxButtonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxErrorReportModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ZluxButtonModule],
                    exports: [ZluxErrorReportComponent],
                    declarations: [ZluxErrorReportComponent]
                }]
        }] });

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
class ZluxPopupManagerComponent {
    static { this.REPORT_VISIBLE_TIMEOUT = 15; }
    constructor(popupManager) {
        this.popupManager = popupManager;
        this.blockCount = 0;
        this.currentErrorBlocking = null;
        this.currentErrorNonblocking = null;
        this.errors = [];
        popupManager.on('block', this.block.bind(this));
        popupManager.on('unblock', this.unblock.bind(this));
        popupManager.on('createReport', (error) => this.createReport(error));
        popupManager.on('removeReport', (id) => this.removeReport(id));
    }
    updateErrors() {
        if (this.currentErrorBlocking == null) {
            const found = this.errors.find(elem => elem.modal);
            if (found) {
                this.currentErrorBlocking = found;
                this.errors = this.errors.filter(i => i !== found);
            }
        }
        if (this.currentErrorNonblocking == null) {
            const found = this.errors.find(elem => !elem.modal);
            if (found) {
                this.currentErrorNonblocking = found;
                this.errors = this.errors.filter(i => i !== found);
            }
        }
    }
    createReport(error) {
        error = Object.assign({}, error);
        error.buttonCaptions = error.buttons.map(b => b.caption);
        this.errors.push(error);
        if (error.modal) {
            this.block();
        }
        this.updateErrors();
    }
    removeReport(id) {
        if (this.currentErrorBlocking && this.currentErrorBlocking.id === id) {
            this.closeForegroundError(this.currentErrorBlocking);
        }
        else if (this.currentErrorNonblocking && this.currentErrorNonblocking.id === id) {
            this.closeForegroundError(this.currentErrorNonblocking);
        }
        else {
            for (let i = 0; i < this.errors.length; i++) {
                if (this.errors[i].id === id) {
                    this.errors.splice(i, 1);
                }
            }
        }
    }
    block() {
        this.blockCount++;
    }
    unblock() {
        this.blockCount--;
    }
    closeForegroundError(error) {
        if (error === this.currentErrorBlocking) {
            this.unblock();
            this.currentErrorBlocking = null;
        }
        else {
            this.currentErrorNonblocking = null;
        }
        this.updateErrors();
    }
    onChoose(error, buttonCaption) {
        const button = error.buttons.find(b => b.caption === buttonCaption);
        if (button.closeReport) {
            this.closeForegroundError(error);
        }
        error.subject.next(buttonCaption);
    }
    getClass() {
        const _class = 'popup-shadow-hover';
        if (this.blockCount === 0) {
            return _class + ' hidden';
        }
        return null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupManagerComponent, deps: [{ token: ZluxPopupManagerService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.3", type: ZluxPopupManagerComponent, selector: "zlux-popup-manager", ngImport: i0, template: "\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n@if (blockCount > 0) {\n  <div ngClass=\"popup-shadow-hover\">\n    @if (currentErrorBlocking) {\n      <zlux-popup-panel\n        [modal]=\"false\"\n        [autoShow]=\"true\"\n        [ignoreVeil]=\"true\"\n        ngClass=\"attachToCenter\"\n        >\n        <zlux-error-report\n          [severity]=\"currentErrorBlocking.severity\"\n          [title]=\"currentErrorBlocking.title\"\n          [timestamp]=\"currentErrorBlocking.timestamp\"\n          [buttons]=\"currentErrorBlocking.buttonCaptions\"\n          (action)=\"onChoose(currentErrorBlocking, $event)\"\n          [theme]=\"currentErrorBlocking.theme\"\n          [style]=\"currentErrorBlocking.style\"\n          [callToAction]=\"currentErrorBlocking.callToAction\"\n          >\n          {{currentErrorBlocking.text}}\n        </zlux-error-report>\n      </zlux-popup-panel>\n    }\n  </div>\n}\n@if (currentErrorNonblocking) {\n  <zlux-popup-panel\n    [modal]=\"false\"\n    [autoShow]=\"true\"\n    [blockDisplay]=\"true\"\n    ngClass=\"attachToCorner\"\n    >\n    <zlux-error-report\n      [severity]=\"currentErrorNonblocking.severity\"\n      [title]=\"currentErrorNonblocking.title\"\n      [timestamp]=\"currentErrorNonblocking.timestamp\"\n      [buttons]=\"currentErrorNonblocking.buttonCaptions\"\n      (action)=\"onChoose(currentErrorNonblocking, $event)\"\n      [theme]=\"currentErrorNonblocking.theme\"\n      [style]=\"currentErrorNonblocking.style\"\n      [callToAction]=\"currentErrorNonblocking.callToAction\"\n      >\n      {{currentErrorNonblocking.text}}\n    </zlux-error-report>\n  </zlux-popup-panel>\n}\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n", styles: [".popup-shadow-hover{background-color:#0006;position:absolute;inset:0;z-index:100}.hidden{display:none}.attachToCenter{min-width:400px;display:inline-block;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.attachToCorner{min-width:400px;max-width:650px;position:absolute;right:20px;bottom:20px}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: ZluxPopupPanelComponent, selector: "zlux-popup-panel", inputs: ["modal", "autoShow", "ignoreVeil", "blockDisplay"] }, { kind: "component", type: ZluxErrorReportComponent, selector: "zlux-error-report", inputs: ["severity", "title", "theme", "style", "buttons", "timestamp", "callToAction"], outputs: ["action"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupManagerComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-popup-manager", template: "\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n@if (blockCount > 0) {\n  <div ngClass=\"popup-shadow-hover\">\n    @if (currentErrorBlocking) {\n      <zlux-popup-panel\n        [modal]=\"false\"\n        [autoShow]=\"true\"\n        [ignoreVeil]=\"true\"\n        ngClass=\"attachToCenter\"\n        >\n        <zlux-error-report\n          [severity]=\"currentErrorBlocking.severity\"\n          [title]=\"currentErrorBlocking.title\"\n          [timestamp]=\"currentErrorBlocking.timestamp\"\n          [buttons]=\"currentErrorBlocking.buttonCaptions\"\n          (action)=\"onChoose(currentErrorBlocking, $event)\"\n          [theme]=\"currentErrorBlocking.theme\"\n          [style]=\"currentErrorBlocking.style\"\n          [callToAction]=\"currentErrorBlocking.callToAction\"\n          >\n          {{currentErrorBlocking.text}}\n        </zlux-error-report>\n      </zlux-popup-panel>\n    }\n  </div>\n}\n@if (currentErrorNonblocking) {\n  <zlux-popup-panel\n    [modal]=\"false\"\n    [autoShow]=\"true\"\n    [blockDisplay]=\"true\"\n    ngClass=\"attachToCorner\"\n    >\n    <zlux-error-report\n      [severity]=\"currentErrorNonblocking.severity\"\n      [title]=\"currentErrorNonblocking.title\"\n      [timestamp]=\"currentErrorNonblocking.timestamp\"\n      [buttons]=\"currentErrorNonblocking.buttonCaptions\"\n      (action)=\"onChoose(currentErrorNonblocking, $event)\"\n      [theme]=\"currentErrorNonblocking.theme\"\n      [style]=\"currentErrorNonblocking.style\"\n      [callToAction]=\"currentErrorNonblocking.callToAction\"\n      >\n      {{currentErrorNonblocking.text}}\n    </zlux-error-report>\n  </zlux-popup-panel>\n}\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n", styles: [".popup-shadow-hover{background-color:#0006;position:absolute;inset:0;z-index:100}.hidden{display:none}.attachToCenter{min-width:400px;display:inline-block;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}.attachToCorner{min-width:400px;max-width:650px;position:absolute;right:20px;bottom:20px}\n"] }]
        }], ctorParameters: () => [{ type: ZluxPopupManagerService }] });
class ZluxPopupManagerModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupManagerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupManagerModule, declarations: [ZluxPopupManagerComponent], imports: [CommonModule, ZluxPopupPanelModule, ZluxErrorReportModule], exports: [ZluxPopupManagerComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupManagerModule, providers: [ZluxPopupManagerService], imports: [CommonModule, ZluxPopupPanelModule, ZluxErrorReportModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPopupManagerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, ZluxPopupPanelModule, ZluxErrorReportModule],
                    exports: [ZluxPopupManagerComponent],
                    declarations: [ZluxPopupManagerComponent],
                    providers: [ZluxPopupManagerService]
                }]
        }] });

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
class ZluxFlyover {
    constructor(el) {
        this.el = el;
        this.showDelayMs = 200;
        this.zluxFlyoverDisabled = false;
        this.preparingToShow = false;
    }
    onMouseEnter(e) {
        if (this.flyover) {
            if (this.flyover.hideTimer) {
                clearInterval(this.flyover.hideTimer);
                this.flyover.forceHide();
            }
            if (!this.isEnabled()) {
                return;
            }
            this.preparingToShow = true;
            setTimeout(() => {
                if (this.preparingToShow) {
                    this.flyover.show(this.el.nativeElement, this.position);
                    this.preparingToShow = false;
                }
            }, this.showDelayMs);
        }
    }
    onMouseLeave(e) {
        this.preparingToShow = false;
        this.flyover.hide();
    }
    isEnabled() {
        return this.zluxFlyoverDisabled !== true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyover, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.1.3", type: ZluxFlyover, selector: "[zluxFlyover]", inputs: { flyover: "flyover", position: "position", showDelayMs: "showDelayMs", zluxFlyoverDisabled: "zluxFlyoverDisabled" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" }, properties: { "class.rel-positioned": "true" } }, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyover, decorators: [{
            type: Directive,
            args: [{
                    selector: '[zluxFlyover]',
                    host: {
                        '[class.rel-positioned]': 'true'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { flyover: [{
                type: Input
            }], position: [{
                type: Input
            }], showDelayMs: [{
                type: Input
            }], zluxFlyoverDisabled: [{
                type: Input
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
class ZluxFlyoverComponent {
    constructor(el) {
        this.el = el;
        this.hideDelayMs = 200;
        this.hover = false;
        this.targetHover = false;
        this.active = false;
        this.position = 'top';
        this.flyoverMarginRight = 15;
        this.flyoverMarginLeft = 15;
        this.flyoverMarginTop = 10;
        this.flyoverMarginBottom = 20;
    }
    ngOnInit() {
        this.arrowTopOffsetLeft = this.contentArea.nativeElement.clientWidth / 2 - 10;
        this.arrowTopOffsetBottom = -9;
        this.arrowBottomOffsetLeft = this.contentArea.nativeElement.clientWidth / 2 - 10;
        this.arrowBottomOffsetBottom = -10;
    }
    onMouseEnter(e) {
        this.hover = true;
        this.active = true;
    }
    onMouseLeave(e) {
        this.hover = false;
        this.hide();
    }
    show(onElement, onPosition = 'top') {
        if (this.hideTimer) {
            this.forceHide();
        }
        this.position = onPosition;
        switch (onPosition) {
            case 'top': {
                this.setTopPosition(onElement);
                break;
            }
            case 'bottom': {
                this.setBottomPosition(onElement);
                break;
            }
            case 'left': {
                this.setLeftPosition(onElement);
                break;
            }
            case 'right': {
                this.setRightPosition(onElement);
                break;
            }
        }
        this.targetHover = true;
        this.active = true;
    }
    GetRelativeShift(onEl, content) {
        let elem = onEl.offsetParent;
        let rect = {
            top: 0,
            left: 0,
            width: elem.clientWidth,
            height: elem.clientHeight
        };
        while (elem !== content.offsetParent) {
            rect.top += elem.offsetTop;
            rect.left += elem.offsetLeft;
            rect.width = elem.clientWidth;
            rect.height = elem.clientHeight;
            elem = elem.offsetParent;
        }
        return rect;
    }
    setTopPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop - content.clientHeight - 20;
        this.left = rect.left + onEl.offsetLeft - content.clientWidth / 2 + onEl.offsetWidth / 2;
        this.arrowTopOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowTopOffsetBottom = -9;
        this.arrowBottomOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowBottomOffsetBottom = -10;
        this.horizontalAlign(onEl, rect);
    }
    setBottomPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop + onEl.offsetHeight + 20;
        this.left = rect.left + onEl.offsetLeft - content.clientWidth / 2 + onEl.offsetWidth / 2;
        this.arrowTopOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowTopOffsetBottom = content.clientHeight - 12;
        this.arrowBottomOffsetLeft = content.clientWidth / 2 - 10;
        this.arrowBottomOffsetBottom = content.clientHeight - 11;
        this.horizontalAlign(onEl, rect);
    }
    horizontalAlign(onEl, rect) {
        let content = this.contentArea.nativeElement;
        let distToRightEdge = rect.width - onEl.offsetWidth / 2 - onEl.offsetLeft - rect.left;
        if (distToRightEdge < content.clientWidth / 2 + this.flyoverMarginRight) {
            let offset = content.clientWidth / 2 - distToRightEdge + this.flyoverMarginRight;
            this.left -= offset;
            if (distToRightEdge < this.flyoverMarginRight + 15)
                offset = content.clientWidth / 2 - 15;
            this.arrowTopOffsetLeft += offset;
            this.arrowBottomOffsetLeft += offset;
        }
        else {
            let distToLeftEdge = onEl.offsetWidth / 2 + onEl.offsetLeft + rect.left;
            if (distToLeftEdge < content.clientWidth / 2 + this.flyoverMarginLeft) {
                let offset = content.clientWidth / 2 - distToLeftEdge + this.flyoverMarginLeft;
                this.left += offset;
                if (distToLeftEdge < this.flyoverMarginLeft + 15)
                    offset = content.clientWidth / 2 - 15;
                this.arrowTopOffsetLeft -= offset;
                this.arrowBottomOffsetLeft -= offset;
            }
        }
    }
    setLeftPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop + onEl.offsetHeight / 2 - content.clientHeight / 2;
        this.left = rect.left + onEl.offsetLeft - content.clientWidth - 20;
        this.arrowTopOffsetLeft = content.clientWidth - 12;
        this.arrowTopOffsetBottom = content.clientHeight / 2 - 10;
        this.arrowBottomOffsetLeft = content.clientWidth - 11;
        this.arrowBottomOffsetBottom = content.clientHeight / 2 - 10;
        this.verticalAlign(onEl, rect);
    }
    setRightPosition(onEl) {
        let content = this.contentArea.nativeElement;
        let rect = this.GetRelativeShift(onEl, content);
        this.top = rect.top + onEl.offsetTop + onEl.offsetHeight / 2 - content.clientHeight / 2;
        this.left = rect.left + onEl.offsetLeft + onEl.offsetWidth + 20;
        this.arrowTopOffsetLeft = -9;
        this.arrowTopOffsetBottom = content.clientHeight / 2 - 10;
        this.arrowBottomOffsetLeft = -10;
        this.arrowBottomOffsetBottom = content.clientHeight / 2 - 10;
        this.verticalAlign(onEl, rect);
    }
    verticalAlign(onEl, rect) {
        let content = this.contentArea.nativeElement;
        let distToBottomEdge = rect.height + onEl.offsetHeight / 2 - onEl.offsetTop - rect.top;
        if (distToBottomEdge < content.clientHeight / 2 + this.flyoverMarginBottom) {
            let offset = content.clientHeight / 2 - distToBottomEdge + this.flyoverMarginBottom;
            this.top -= offset;
            if (distToBottomEdge < this.flyoverMarginBottom + 15)
                offset = content.clientHeight / 2 - 15;
            this.arrowTopOffsetBottom -= offset;
            this.arrowBottomOffsetBottom -= offset;
        }
        else {
            let distToTopEdge = onEl.offsetHeight / 2 + onEl.offsetTop + rect.top;
            if (distToTopEdge < content.clientHeight / 2 + this.flyoverMarginTop) {
                let offset = content.clientHeight / 2 - distToTopEdge + this.flyoverMarginTop;
                this.top += offset;
                if (distToTopEdge < this.flyoverMarginTop + 15)
                    offset = content.clientHeight / 2 - 15;
                this.arrowTopOffsetBottom += offset;
                this.arrowBottomOffsetBottom += offset;
            }
        }
    }
    hide() {
        this.targetHover = false;
        this.hideTimer = window.setTimeout(() => {
            this.forceHide();
        }, this.hideDelayMs);
    }
    forceHide() {
        if (!this.targetHover && !this.hover) {
            this.top = undefined;
            this.left = undefined;
            this.active = false;
        }
        this.hideTimer = null;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.1.3", type: ZluxFlyoverComponent, selector: "zlux-flyover", inputs: { hideDelayMs: "hideDelayMs" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, viewQueries: [{ propertyName: "contentArea", first: true, predicate: ["area"], descendants: true }], ngImport: i0, template: "<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->\r\n\r\n<div class=\"zlux-flyover-area\" [style.top]=\"(active==true?top:-9999)+'px'\" [style.left]=\"(active==true?left:-9999)+'px'\"\r\n  #area>\r\n  <div class=\"zlux-flyover-content\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n  <div class=\"zlux-flyover-arrow-top-layer\" [style.left]=\"arrowTopOffsetLeft+'px'\"\r\n    [style.bottom]=\"arrowTopOffsetBottom+'px'\" [ngClass]=\"{\r\n      'top': position=='top',\r\n      'bottom': position=='bottom',\r\n      'left': position=='left',\r\n      'right': position=='right'\r\n    }\"></div>\r\n  <div class=\"zlux-flyover-arrow-bottom-layer\" [style.left]=\"arrowBottomOffsetLeft+'px'\"\r\n    [style.bottom]=\"arrowBottomOffsetBottom+'px'\"></div>\r\n</div>\r\n\r\n\r\n<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->", styles: [":host{font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif}.rel-positioned{position:relative}.zlux-flyover-area{position:absolute;background:transparent;border:transparent;z-index:1}.zlux-flyover-content{padding:10px;border:1px solid #21649F;background:#fff;box-shadow:3px 3px #0000004d}.zlux-flyover-arrow-top-layer{position:absolute;width:20px;height:20px;transform:rotate(45deg);background:transparent}.zlux-flyover-arrow-top-layer.top{border-top:10px solid transparent;border-left:10px solid transparent;border-bottom:10px solid #fff;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.bottom{border-top:10px solid #fff;border-left:10px solid #fff;border-bottom:10px solid transparent;border-right:10px solid transparent}.zlux-flyover-arrow-top-layer.left{border-top:10px solid #fff;border-left:10px solid transparent;border-bottom:10px solid transparent;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.right{border-top:10px solid transparent;border-left:10px solid #fff;border-bottom:10px solid #fff;border-right:10px solid transparent}.zlux-flyover-arrow-bottom-layer{position:absolute;width:20px;height:20px;background:#21649f;transform:rotate(45deg);box-shadow:3px 0 #0101014d;z-index:-1}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-flyover", template: "<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->\r\n\r\n<div class=\"zlux-flyover-area\" [style.top]=\"(active==true?top:-9999)+'px'\" [style.left]=\"(active==true?left:-9999)+'px'\"\r\n  #area>\r\n  <div class=\"zlux-flyover-content\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n  <div class=\"zlux-flyover-arrow-top-layer\" [style.left]=\"arrowTopOffsetLeft+'px'\"\r\n    [style.bottom]=\"arrowTopOffsetBottom+'px'\" [ngClass]=\"{\r\n      'top': position=='top',\r\n      'bottom': position=='bottom',\r\n      'left': position=='left',\r\n      'right': position=='right'\r\n    }\"></div>\r\n  <div class=\"zlux-flyover-arrow-bottom-layer\" [style.left]=\"arrowBottomOffsetLeft+'px'\"\r\n    [style.bottom]=\"arrowBottomOffsetBottom+'px'\"></div>\r\n</div>\r\n\r\n\r\n<!-- \r\n  This program and the accompanying materials are\r\n  made available under the terms of the Eclipse Public License v2.0 which accompanies\r\n  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\r\n  \r\n  SPDX-License-Identifier: EPL-2.0\r\n  \r\n  Copyright Contributors to the Zowe Project.\r\n-->", styles: [":host{font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif}.rel-positioned{position:relative}.zlux-flyover-area{position:absolute;background:transparent;border:transparent;z-index:1}.zlux-flyover-content{padding:10px;border:1px solid #21649F;background:#fff;box-shadow:3px 3px #0000004d}.zlux-flyover-arrow-top-layer{position:absolute;width:20px;height:20px;transform:rotate(45deg);background:transparent}.zlux-flyover-arrow-top-layer.top{border-top:10px solid transparent;border-left:10px solid transparent;border-bottom:10px solid #fff;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.bottom{border-top:10px solid #fff;border-left:10px solid #fff;border-bottom:10px solid transparent;border-right:10px solid transparent}.zlux-flyover-arrow-top-layer.left{border-top:10px solid #fff;border-left:10px solid transparent;border-bottom:10px solid transparent;border-right:10px solid #fff}.zlux-flyover-arrow-top-layer.right{border-top:10px solid transparent;border-left:10px solid #fff;border-bottom:10px solid #fff;border-right:10px solid transparent}.zlux-flyover-arrow-bottom-layer{position:absolute;width:20px;height:20px;background:#21649f;transform:rotate(45deg);box-shadow:3px 0 #0101014d;z-index:-1}\n"] }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { hideDelayMs: [{
                type: Input
            }], contentArea: [{
                type: ViewChild,
                args: ['area']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
class ZluxFlyoverModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverModule, declarations: [ZluxFlyoverComponent, ZluxFlyover], imports: [CommonModule], exports: [ZluxFlyoverComponent, ZluxFlyover] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxFlyoverModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ZluxFlyoverComponent, ZluxFlyover],
                    declarations: [ZluxFlyoverComponent, ZluxFlyover]
                }]
        }] });

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
class ZluxPaginatorComponent {
    constructor() {
        this.rows = 0;
        this.totalRecords = 0;
        this.hasMoreRecords = false;
        this.onPageChange = new EventEmitter();
        this.onFetchMoreData = new EventEmitter();
        this.pageIndex = -1;
        this.loadedPageNumber = 0;
        this.isInputIncorrect = false;
        this.preventEvent = false;
    }
    get indexMax() {
        return this.totalRecords > (this.pageIndex + 1) * this.rows ? (this.pageIndex + 1) * this.rows : this.totalRecords;
    }
    get indexMin() {
        return this.indexMax > 0 ? this.pageIndex * this.rows + 1 : 0;
    }
    ngOnChanges(changes) {
        if (changes['rows']) {
            this.loadedPageNumber = Math.ceil(this.totalRecords / this.rows);
            if (this.loadedPageNumber === 0 || isNaN(this.loadedPageNumber))
                this.loadedPageNumber = 0;
            if (this.pageIndex >= this.loadedPageNumber) {
                this.pageIndex = this.loadedPageNumber - 1;
                this.pageChange();
            }
        }
    }
    ngAfterContentChecked() {
        this.loadedPageNumber = Math.ceil(this.totalRecords / this.rows);
        if (this.loadedPageNumber === 0 || isNaN(this.loadedPageNumber))
            this.loadedPageNumber = 0;
    }
    onChange(event) {
        let value = Number(event.target.value);
        if (value >= 1 && value <= this.loadedPageNumber) {
            if (this.pageIndex != value - 1) {
                this.pageIndex = value - 1;
                this.pageChange();
            }
            this.isInputIncorrect = false;
        }
        else {
            this.isInputIncorrect = true;
        }
    }
    onPrevButtonClick() {
        if (this.pageIndex <= 0) {
            return;
        }
        this.pageIndex--;
        this.isInputIncorrect = false;
        this.pageChange();
    }
    onNextButtonClick() {
        if (this.pageIndex + 1 >= this.loadedPageNumber && !this.hasMoreRecords) {
            return;
        }
        this.pageIndex++;
        this.isInputIncorrect = false;
        this.pageChange();
    }
    onFirstButtonClick() {
        this.pageIndex = 0;
        this.isInputIncorrect = false;
        this.pageChange();
    }
    pageChange() {
        if (!this.preventEvent && this.pageIndex >= 0) {
            this.onPageChange.emit({
                first: this.pageIndex * this.rows,
                rows: this.rows
            });
        }
    }
    changePage(pageIndex) {
        this.preventEvent = true;
        this.pageIndex = pageIndex;
        this.isInputIncorrect = false;
        this.preventEvent = false;
    }
    toLastPage() {
        if (this.pageIndex !== this.loadedPageNumber - 1) {
            this.pageIndex = this.loadedPageNumber - 1;
            this.isInputIncorrect = false;
            this.pageChange();
        }
    }
    fetchMoreData() {
        this.onFetchMoreData.emit();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPaginatorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.1.3", type: ZluxPaginatorComponent, selector: "zlux-paginator", inputs: { rows: "rows", totalRecords: "totalRecords", hasMoreRecords: "hasMoreRecords" }, outputs: { onPageChange: "onPageChange", onFetchMoreData: "onFetchMoreData" }, usesOnChanges: true, ngImport: i0, template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<div class=\"paginator-area\">\n  <zlux-button buttonType=\"button\" class=\"first-button\" [disabled]=\"pageIndex <= 0\" (onClick)=\"onFirstButtonClick()\">\n    <!-- <svg width=\"16px\" height=\"16px\" viewBox=\"0 0 16 16\">\n    <use xlink:href=\"#FirstPage\"></use>\n  </svg> -->\n    <img src=\"../../assets/images/FirstPage.svg\">\n  </zlux-button>\n  <zlux-button buttonType=\"button\" class=\"prev-button\" [disabled]=\"pageIndex <= 0\" (onClick)=\"onPrevButtonClick()\">\n    <!-- <svg width=\"16px\" height=\"16px\" viewBox=\"0 0 16 16\">\n  <use xlink:href=\"#PrevPage\"></use>\n</svg> -->\n    <img src=\"../../assets/images/PrevPage.svg\">\n  </zlux-button>\n\n  <div class=\"page-area\">\n    <input type=\"text\" class=\"current-page-field\" [ngClass]=\"{ 'input-error': isInputIncorrect }\" zluxInputText\n      [value]=\"pageIndex + 1\" (change)=\"onChange($event)\">\n    <ng-container i18n=\"of preposition in clause n-m of total@@paginator\">of</ng-container>\n    @if (hasMoreRecords) {\n    <a href=\"#\" (click)=\"toLastPage()\" zluxFlyover [flyover]=\"fetchMoreFlyover\"> {{loadedPageNumber}}*</a>\n    } @else {\n    <a href=\"#\" (click)=\"toLastPage()\"> {{loadedPageNumber}}</a>\n    }\n  </div>\n  <zlux-button buttonType=\"button\" [disabled]=\"(pageIndex >= loadedPageNumber - 1) && !hasMoreRecords\"\n    (onClick)=\"onNextButtonClick()\">\n    <!-- <svg width=\"16px\" height=\"16px\" viewBox=\"0 0 16 16\">\n    <use xlink:href=\"#NextPage\"></use>\n  </svg> -->\n    <img src=\"../../assets/images/NextPage.svg\">\n  </zlux-button>\n  <div class=\"right-page-area\">\n    {{indexMin}}-{{indexMax}} <ng-container i18n=\"of preposition in clause n-m of total@@paginator\">of</ng-container>\n    @if (hasMoreRecords) {\n    <a href=\"#\" (click)=\"toLastPage()\" zluxFlyover [flyover]=\"fetchMoreFlyover\"> {{totalRecords}}*</a>\n    } @else {\n    <a href=\"#\" (click)=\"toLastPage()\"> {{totalRecords}}</a>\n    }\n  </div>\n</div>\n<zlux-flyover #fetchMoreFlyover>\n  Not all items are loaded!\n  <br />\n  <a href=\"#\" (click)=\"fetchMoreData()\">Load More data</a>\n</zlux-flyover>\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [":host{font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif}.paginator-area{height:46px;width:100%;flex:none;display:flex;align-items:center;flex-direction:row}.page-area{margin:0 1rem 0 .5rem}.current-page-field{flex:none;background-color:#fff;width:4rem;padding-left:.5rem;margin-right:.5rem}.right-page-area{flex:auto;text-align:right;padding-right:2rem}.input-error{border-color:red}zlux-button{margin:0;width:32px}zlux-button svg{flex:1 1 auto}zlux-button>>>button{padding:0!important;display:flex;flex-direction:row;fill:#157cbd}zlux-button>>>button:hover:not([disabled]),zlux-button>>>button:active:not([disabled]){fill:#fff;background-color:#0d5d8d}.first-button{margin-left:1rem;margin-right:-1px}.first-button>>>button{border-top-right-radius:0;border-bottom-right-radius:0}.prev-button>>>button{border-top-left-radius:0;border-bottom-left-radius:0}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "component", type: ZluxButtonComponent, selector: "zlux-button", inputs: ["buttonType", "label", "disabled", "callToAction", "lightSkin"], outputs: ["onClick"] }, { kind: "directive", type: ZluxInputText, selector: "[zluxInputText]", inputs: ["dark"] }, { kind: "component", type: ZluxFlyoverComponent, selector: "zlux-flyover", inputs: ["hideDelayMs"] }, { kind: "directive", type: ZluxFlyover, selector: "[zluxFlyover]", inputs: ["flyover", "position", "showDelayMs", "zluxFlyoverDisabled"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPaginatorComponent, decorators: [{
            type: Component,
            args: [{ selector: "zlux-paginator", template: "<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->\n\n<div class=\"paginator-area\">\n  <zlux-button buttonType=\"button\" class=\"first-button\" [disabled]=\"pageIndex <= 0\" (onClick)=\"onFirstButtonClick()\">\n    <!-- <svg width=\"16px\" height=\"16px\" viewBox=\"0 0 16 16\">\n    <use xlink:href=\"#FirstPage\"></use>\n  </svg> -->\n    <img src=\"../../assets/images/FirstPage.svg\">\n  </zlux-button>\n  <zlux-button buttonType=\"button\" class=\"prev-button\" [disabled]=\"pageIndex <= 0\" (onClick)=\"onPrevButtonClick()\">\n    <!-- <svg width=\"16px\" height=\"16px\" viewBox=\"0 0 16 16\">\n  <use xlink:href=\"#PrevPage\"></use>\n</svg> -->\n    <img src=\"../../assets/images/PrevPage.svg\">\n  </zlux-button>\n\n  <div class=\"page-area\">\n    <input type=\"text\" class=\"current-page-field\" [ngClass]=\"{ 'input-error': isInputIncorrect }\" zluxInputText\n      [value]=\"pageIndex + 1\" (change)=\"onChange($event)\">\n    <ng-container i18n=\"of preposition in clause n-m of total@@paginator\">of</ng-container>\n    @if (hasMoreRecords) {\n    <a href=\"#\" (click)=\"toLastPage()\" zluxFlyover [flyover]=\"fetchMoreFlyover\"> {{loadedPageNumber}}*</a>\n    } @else {\n    <a href=\"#\" (click)=\"toLastPage()\"> {{loadedPageNumber}}</a>\n    }\n  </div>\n  <zlux-button buttonType=\"button\" [disabled]=\"(pageIndex >= loadedPageNumber - 1) && !hasMoreRecords\"\n    (onClick)=\"onNextButtonClick()\">\n    <!-- <svg width=\"16px\" height=\"16px\" viewBox=\"0 0 16 16\">\n    <use xlink:href=\"#NextPage\"></use>\n  </svg> -->\n    <img src=\"../../assets/images/NextPage.svg\">\n  </zlux-button>\n  <div class=\"right-page-area\">\n    {{indexMin}}-{{indexMax}} <ng-container i18n=\"of preposition in clause n-m of total@@paginator\">of</ng-container>\n    @if (hasMoreRecords) {\n    <a href=\"#\" (click)=\"toLastPage()\" zluxFlyover [flyover]=\"fetchMoreFlyover\"> {{totalRecords}}*</a>\n    } @else {\n    <a href=\"#\" (click)=\"toLastPage()\"> {{totalRecords}}</a>\n    }\n  </div>\n</div>\n<zlux-flyover #fetchMoreFlyover>\n  Not all items are loaded!\n  <br />\n  <a href=\"#\" (click)=\"fetchMoreData()\">Load More data</a>\n</zlux-flyover>\n\n\n<!--\nThis program and the accompanying materials are\nmade available under the terms of the Eclipse Public License v2.0 which accompanies\nthis distribution, and is available at https://www.eclipse.org/legal/epl-v20.html\n\nSPDX-License-Identifier: EPL-2.0\n\nCopyright Contributors to the Zowe Project.\n-->", styles: [":host{font-family:Helvetica,Open Sans,Arial,Lucida Grande,sans-serif}.paginator-area{height:46px;width:100%;flex:none;display:flex;align-items:center;flex-direction:row}.page-area{margin:0 1rem 0 .5rem}.current-page-field{flex:none;background-color:#fff;width:4rem;padding-left:.5rem;margin-right:.5rem}.right-page-area{flex:auto;text-align:right;padding-right:2rem}.input-error{border-color:red}zlux-button{margin:0;width:32px}zlux-button svg{flex:1 1 auto}zlux-button>>>button{padding:0!important;display:flex;flex-direction:row;fill:#157cbd}zlux-button>>>button:hover:not([disabled]),zlux-button>>>button:active:not([disabled]){fill:#fff;background-color:#0d5d8d}.first-button{margin-left:1rem;margin-right:-1px}.first-button>>>button{border-top-right-radius:0;border-bottom-right-radius:0}.prev-button>>>button{border-top-left-radius:0;border-bottom-left-radius:0}\n"] }]
        }], propDecorators: { rows: [{
                type: Input
            }], totalRecords: [{
                type: Input
            }], hasMoreRecords: [{
                type: Input
            }], onPageChange: [{
                type: Output
            }], onFetchMoreData: [{
                type: Output
            }] } });
class ZluxPaginatorModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPaginatorModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.1.3", ngImport: i0, type: ZluxPaginatorModule, declarations: [ZluxPaginatorComponent], imports: [FormsModule, CommonModule, ZluxButtonModule, ZluxInputTextModule, ZluxFlyoverModule], exports: [ZluxPaginatorComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPaginatorModule, imports: [FormsModule, CommonModule, ZluxButtonModule, ZluxInputTextModule, ZluxFlyoverModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.1.3", ngImport: i0, type: ZluxPaginatorModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [FormsModule, CommonModule, ZluxButtonModule, ZluxInputTextModule, ZluxFlyoverModule],
                    exports: [ZluxPaginatorComponent],
                    declarations: [ZluxPaginatorComponent]
                }]
        }] });

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
//We leave this a component and not a service, as to give each component the ability
//to set their own max tabs without conflicting with other components.
class ZluxTabbingComponent {
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
class ZluxTabbingModule {
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

/*
 * Public API Surface of zlux-widgets
 */
// export * from './lib/zlux-widgets.service';
// export * from './lib/zlux-widgets.component';

/**
 * Generated bundle index. Do not edit.
 */

export { ZluxButtonComponent, ZluxButtonModule, ZluxCheckboxComponent, ZluxCheckboxModule, ZluxErrorReportComponent, ZluxErrorReportModule, ZluxErrorSeverity, ZluxFlyover, ZluxFlyoverComponent, ZluxFlyoverModule, ZluxInputText, ZluxInputTextModule, ZluxPaginatorComponent, ZluxPaginatorModule, ZluxPopupManagerComponent, ZluxPopupManagerModule, ZluxPopupManagerService, ZluxPopupWindowButtonAreaComponent, ZluxPopupWindowComponent, ZluxPopupWindowModule, ZluxTabbingComponent, ZluxTabbingModule, ZluxVeilComponent, ZluxVeilModule };
//# sourceMappingURL=zlux-widgets.mjs.map
