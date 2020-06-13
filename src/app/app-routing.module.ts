import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MahjongWrapperComponent } from './mahjong-wrapper/mahjong-wrapper.component';


const routes: Routes = [{
  path: '**',
  component: MahjongWrapperComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
