import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private router: Router) {}

  private posts: Post[] = []
  private postsUpdated = new Subject<{posts:Post[], postCount: number}>();

  getPosts(postsPerPage: number, currentPage: number){
    const querryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
   this.http.get<{message: String, posts:any, maxPosts: number}>('http://localhost:3000/api/posts' + querryParams)
   .pipe(map((postData) => {
    return {posts: postData.posts.map((post: { title: any; content: any; _id: any; imagePath:any }) => {
      return {
        title:post.title,
        content: post.content,
        id: post._id,
        imagePath: post.imagePath
      };
    }),
    maxPosts: postData.maxPosts
  }
   }))
   .subscribe((transformedPostsData) => {
    this.posts = transformedPostsData.posts;
    this.postsUpdated.next({posts:[...this.posts], postCount: transformedPostsData.maxPosts}); 
   });
  }

  getPostUpdatedListener(){
    return this.postsUpdated.asObservable();
  }

  getPost(id: any){
    return this.http.get<{_id:any, title: String, content: String, imagePath: String }>('http://localhost:3000/api/posts/'+ id);
  }

  addPost(title: string, content: string, image: File){
    const postData =  new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http.post<{message:String, post:Post}>('http://localhost:3000/api/posts/', postData). subscribe((responseData) => {
      
      this.router.navigate(["/"]);
    })
  }

  updatePost(id:any, title: string, content:string, image:File | String | any){
    let postData: Post | FormData
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);

    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      }
    }
    this.http.put('http://localhost:3000/api/posts/' + id, postData)
    .subscribe(response => {
     
      this.router.navigate(["/"]);

    });
    
  }

  deletePost(postId:any) {
    return this.http.delete('http://localhost:3000/api/posts/' + postId);
  }

}
