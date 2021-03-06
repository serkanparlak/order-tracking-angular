import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderListComponent } from './components/order-list/order-list.component';
import { SharedModule } from './shared/shared.module';

/* register locale tr */
registerLocaleData(localeTr, 'tr');

@NgModule({
  declarations: [AppComponent, OrderListComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    /* Shared Module */
    SharedModule,
  ],
  providers: [
    /* use locale tr */
    { provide: LOCALE_ID, useValue: 'tr' }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
