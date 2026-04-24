import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateBikeComponent } from './create-bike.component';

const routes: Routes = [{ path: '', component: CreateBikeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateBikeRoutingModule { }
