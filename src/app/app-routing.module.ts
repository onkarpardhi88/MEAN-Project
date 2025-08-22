import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './Posts/post-list/post-list.component';
import { PostComponent } from './Posts/post/post.component';

const routes: Routes = [
  {
    path: '', component:  PostListComponent
  },
  {
    path: 'create', component: PostComponent
  },
  {
    path: 'edit/:postId', component: PostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
