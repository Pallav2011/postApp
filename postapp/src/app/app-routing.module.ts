import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostsComponent } from './posts/posts.component';
import { WildcardComponent } from './wildcard/wildcard.component';
import { AuthgaurdGuard } from './services/authgaurd.guard';


const routes: Routes = [
  {path : '', redirectTo : 'login', pathMatch : 'full'},
  {path : 'login', component : LoginComponent},
  {path : 'registration', component : RegistrationComponent},
  {path : 'posts', component : PostsComponent, canActivate:[AuthgaurdGuard]},
  {path : '**', component : WildcardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
