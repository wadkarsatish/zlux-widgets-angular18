# ZluxWidgets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


This program and the accompanying materials are
made available under the terms of the Eclipse Public License v2.0 which accompanies
this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

SPDX-License-Identifier: EPL-2.0

Copyright Contributors to the Zowe Project.

# zLUX widgets library

Adding the library to your package:
`npm install "git+ssh://git@github.com:zowe/zlux-widgets.git" --save`

Popup Window
Imports:  
Module: `import { ZluxPopupWindowModule } from '@zlux/widgets'`  
Component: `import { ZluxPopupWindowComponent } from '@zlux/widgets'` template: `<zlux-popup-window>`  
Template parameters:
- header: string
- dark: boolean - if true - apply dark style to header
- width: string - force write content area width by this value
- onCloseWindow: EventEmitter

Popup Window Button Area  
Imports:  
Module: `import { ZluxPopupWindowModule } from '@zlux/widgets'`  
Component: `import { ZluxPopupWindowButtonAreaComponent } from '@zlux/widgets'` template:   `<zlux-popup-window-button-area>`

The buttons are rendered in the place corresponding to the style:
-  "popup-window-button-left"
-  "popup-window-button-center"
-  without style for right aligned

Button
Imports:  
Module: `import { ZluxButtonModule } from '@zlux/widgets'`  
Component: `import { ZluxButtonComponent } from '@zlux/widgets'` template: `<zlux-button>`  
Template parameters:
- buttonType: string -  attribute "type" of buttons tag
- label: string
- disabled: boolean
- style: any
- styleClass: string - attribute "class" of buttons tag
- callToAction: boolean - if true - apply "Call To Action" style to button
- onClick: EventEmitter

Example:
```
<zlux-popup-window [header]="'headerString'" (onCloseWindow)="closePopupHandle($event)">
  There is main content
  <zlux-popup-window-button-area>
    <zlux-button buttonType="submit"
                class="popup-window-button-left"
                label="Left aligned button"
                callToAction="true"></zlux-button>
    <zlux-button buttonType="button"
                class="popup-window-button-center"
                label="Center aligned button"></zlux-button>
    <zlux-button buttonType="button"
                label="Right aligned button"></zlux-button>
  </zlux-popup-window-button-area>
</zlux-popup-window>
```
# For Maintainers
Because this library is used as an npm package, you must remember to commit changes to index.js and index.js.map, and any other files that changed as the result of building the application (e.g. **/*.d.ts)

Also, remember to retain the copyright headers in those build products (they currently need to be restored "by hand")


This program and the accompanying materials are
made available under the terms of the Eclipse Public License v2.0 which accompanies
this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html

SPDX-License-Identifier: EPL-2.0

Copyright Contributors to the Zowe Project.