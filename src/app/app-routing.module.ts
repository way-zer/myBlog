import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {PostViewComponent} from './pages/post-view/post-view.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'post/:id', component: PostViewComponent},
  {path: '404', redirectTo: ''},
  {path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
