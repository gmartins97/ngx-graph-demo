import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule,  } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import {HttpClientModule} from "@angular/common/http";
import { OverlayContainer, FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { MdePopoverModule } from '@material-extended/mde';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MaterialModule, NgxGraphModule , HttpClientModule, MdePopoverModule],
  providers: [
    {
      provide: OverlayContainer,
      useClass: FullscreenOverlayContainer
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
