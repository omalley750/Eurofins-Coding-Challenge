import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateBikeRoutingModule } from './create-bike-routing.module';
import { CreateBikeComponent } from './create-bike.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateBikeComponent
  ],
  imports: [
    CommonModule,
    CreateBikeRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateBikeModule { }
