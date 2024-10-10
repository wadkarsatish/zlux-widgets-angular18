import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  ZluxPopupWindowModule,
  ZluxButtonModule,
  ZluxCheckboxModule,
  ZluxInputTextModule,
  ZluxVeilModule,
  ZluxPopupManagerModule,
  ZluxPaginatorModule,
  ZluxFlyoverModule,
  ZluxErrorReportModule,
  ZluxTabbingModule
} from "zlux-widgets";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ZluxPopupWindowModule,
    ZluxButtonModule,
    ZluxCheckboxModule,
    ZluxInputTextModule,
    ZluxVeilModule,
    ZluxPopupManagerModule,
    ZluxPaginatorModule,
    ZluxFlyoverModule,
    ZluxErrorReportModule,
    ZluxTabbingModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'zlux-widgets-consumer';

  onValueChange(value) {
    console.log('Checkbox value', value);
  }

  errorReportAction(action: any) {
    console.log('errorReportAction', action);
  }

  onPageChange(action: any) {
    console.log('errorReportAction', action);
  }

  onFetchMoreData(action: any) {
    console.log('errorReportAction', action);
  }
}
