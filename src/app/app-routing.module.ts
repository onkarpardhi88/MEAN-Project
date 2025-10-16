import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './Posts/post-list/post-list.component';
import { PostComponent } from './Posts/post/post.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { AuthGuard } from './Auth/auth.guard';

const routes: Routes = [
  {
    path: '', component:  PostListComponent
  },
  {
    path: 'create', component: PostComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit/:postId', component: PostComponent, canActivate: [AuthGuard]
  },
  {
    path:'login', component:LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
