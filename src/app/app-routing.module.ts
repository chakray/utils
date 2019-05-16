import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilsMod } from '@chakray/utils';

const routes: Routes = [];

@NgModule({
  imports: [
    UtilsMod,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
