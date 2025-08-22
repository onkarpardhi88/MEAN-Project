import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  constructor(public postsService:PostService){}

  posts:Post[] = [];
  isLoading = false;
  postSub:Subscription | undefined;

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdatedListener().subscribe((posts:Post[]) => {
      this.isLoading = false;
      this.posts = posts
    });
  }

  onDelete(postId: any){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postSub?.unsubscribe()
  }
}
