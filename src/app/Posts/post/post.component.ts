import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  mode = 'create';
  isLoading = false;
  postId:any
  post?: Post;

  constructor(public postService:PostService, public route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form:NgForm){
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create' ) {
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.addPost(form.value.title, form.value.content);
    }
    form.resetForm()
  }
}
