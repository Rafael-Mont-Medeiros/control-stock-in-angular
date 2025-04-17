import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {DialogService} from 'primeng/dynamicdialog';
import { ToolBarNavigationComponent } from './components/tool-bar-navigation/tool-bar-navigation.component'



@NgModule({
  declarations: [
    ToolBarNavigationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //primeNG
    ToolbarModule,
    CardModule,
    ButtonModule,


  ],
  exports:[ToolBarNavigationComponent],
  providers: [DialogService, CurrencyPipe]
})
export class SharedModule { }
