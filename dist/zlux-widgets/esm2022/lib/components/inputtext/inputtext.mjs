/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/
import { NgModule, Directive, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
// import '../../assets/css/inputtext.css';
export class ZluxInputText {
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
export class ZluxInputTextModule {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXR0ZXh0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvemx1eC13aWRnZXRzL3NyYy9saWIvY29tcG9uZW50cy9pbnB1dHRleHQvaW5wdXR0ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBOzs7Ozs7OztFQVFFO0FBRUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFDL0MsMkNBQTJDO0FBUzNDLE1BQU0sT0FBTyxhQUFhO0lBUDFCO1FBUVcsU0FBSSxHQUFZLEtBQUssQ0FBQztLQUNoQzs4R0FGWSxhQUFhO2tHQUFiLGFBQWE7OzJGQUFiLGFBQWE7a0JBUHpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsSUFBSSxFQUFFO3dCQUNKLG9CQUFvQixFQUFFLE1BQU07d0JBQzVCLHlCQUF5QixFQUFFLE1BQU07cUJBQ2xDO2lCQUNGOzhCQUVVLElBQUk7c0JBQVosS0FBSzs7QUFRUixNQUFNLE9BQU8sbUJBQW1COzhHQUFuQixtQkFBbUI7K0dBQW5CLG1CQUFtQixpQkFUbkIsYUFBYSxhQUtkLFlBQVksYUFMWCxhQUFhOytHQVNiLG1CQUFtQixZQUpwQixZQUFZOzsyRkFJWCxtQkFBbUI7a0JBTC9CLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQ3hCLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQztpQkFDOUIiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbi8qXHJcbiAgVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmVcclxuICBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgdjIuMCB3aGljaCBhY2NvbXBhbmllc1xyXG4gIHRoaXMgZGlzdHJpYnV0aW9uLCBhbmQgaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC12MjAuaHRtbFxyXG4gIFxyXG4gIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXHJcbiAgXHJcbiAgQ29weXJpZ2h0IENvbnRyaWJ1dG9ycyB0byB0aGUgWm93ZSBQcm9qZWN0LlxyXG4qL1xyXG5cclxuaW1wb3J0IHsgTmdNb2R1bGUsIERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG4vLyBpbXBvcnQgJy4uLy4uL2Fzc2V0cy9jc3MvaW5wdXR0ZXh0LmNzcyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1t6bHV4SW5wdXRUZXh0XScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzcy50ZXh0LWlucHV0XSc6ICd0cnVlJyxcclxuICAgICdbY2xhc3MudGV4dC1pbnB1dC1kYXJrXSc6ICdkYXJrJ1xyXG4gIH0sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBabHV4SW5wdXRUZXh0IHtcclxuICBASW5wdXQoKSBkYXJrOiBib29sZWFuID0gZmFsc2U7XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgZXhwb3J0czogW1psdXhJbnB1dFRleHRdLFxyXG4gIGRlY2xhcmF0aW9uczogW1psdXhJbnB1dFRleHRdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBabHV4SW5wdXRUZXh0TW9kdWxlIHsgfVxyXG5cclxuXHJcbi8qXHJcbiAgVGhpcyBwcm9ncmFtIGFuZCB0aGUgYWNjb21wYW55aW5nIG1hdGVyaWFscyBhcmVcclxuICBtYWRlIGF2YWlsYWJsZSB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEVjbGlwc2UgUHVibGljIExpY2Vuc2UgdjIuMCB3aGljaCBhY2NvbXBhbmllc1xyXG4gIHRoaXMgZGlzdHJpYnV0aW9uLCBhbmQgaXMgYXZhaWxhYmxlIGF0IGh0dHBzOi8vd3d3LmVjbGlwc2Uub3JnL2xlZ2FsL2VwbC12MjAuaHRtbFxyXG4gIFxyXG4gIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBFUEwtMi4wXHJcbiAgXHJcbiAgQ29weXJpZ2h0IENvbnRyaWJ1dG9ycyB0byB0aGUgWm93ZSBQcm9qZWN0LlxyXG4qL1xyXG5cclxuIl19