import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  enteredValue = '';
  newPost= 'No Content';

  onAddPost(){
    this.newPost = this.enteredValue;
  }
}
