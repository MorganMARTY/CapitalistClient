import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { BigvaluePipe } from './bigvalue.pipe';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    BigvaluePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    FormsModule,
    MatSnackBarModule,
    MatBadgeModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
