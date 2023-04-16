import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BPMNEngineJsonFormModule } from 'projects/bpmn-engine-form/src/public-api';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BPMNEngineJsonFormModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
