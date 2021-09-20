import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PostService } from 'src/app/services/post.service';
import { PostModel } from 'src/app/posts/post.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  post = new PostModel("","","","");
  
  isClicked = false; 
  buttonName:any = 'Show';
  // buttonNamer:any = 'Add'
  OnClick(){
    this.isClicked = !this.isClicked;
    if(this.isClicked)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  // OnClickR(){
  //   this.isClicked = !this.isClicked;
  //   if(this.isClicked)  
  //     this.buttonNamer = "Submit";
  //   else
  //     this.buttonNamer = "Add";
  // }
  

  constructor(private postService: PostService, public _auth:AuthService, private _router : Router) { }

  ngOnInit(): void { 
    // let userid = localStorage.getItem("UserID");
    let postid = localStorage.getItem("postId");
    this.postService.getSinglePost(postid)
    .subscribe((data)=>{
      this.post = JSON.parse(JSON.stringify(data));
    })
  }
  Deletepost(id:any){
    this.postService.deletepost(id);
  }
  AddReview(){
    let postId = localStorage.getItem("updatePostId");
    this.postService.addReview(postId,this.post.review);
    console.log("Review added is ",this.post.review);
    alert("success");
    this._router.navigate(['/blogs']); 
  }
}
