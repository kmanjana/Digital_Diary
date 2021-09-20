import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css']
})
export class UpdatepostComponent implements OnInit {

  postItem = new PostModel("","","","");

  constructor(private postService: PostService, private _router: Router) { }

  ngOnInit(): void {
    let postId = localStorage.getItem("updatePostId");
    this.postService.getPost(postId)
    .subscribe((data)=>{
      this.postItem = JSON.parse(JSON.stringify(data)); //stringify = convert from object to JSON ; parse = convert from JSON to object
    })
  }

  UpdatePost(){
    let userid = localStorage.getItem("UserID");
    this.postService.updatePost(this.postItem ,userid);
    alert("success");
    this._router.navigate(['/myposts']);
  }

}
