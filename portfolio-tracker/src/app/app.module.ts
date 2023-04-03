import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCryptoComponent } from './add-crypto/add-crypto.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { FormsModule } from '@angular/forms';
import { CryptoTableComponent } from './crypto-table/crypto-table.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UpdateHoldingComponent } from './update-holding/update-holding.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    AddCryptoComponent,
    PieChartComponent,
    CryptoTableComponent,
    NavBarComponent,
    UpdateHoldingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
