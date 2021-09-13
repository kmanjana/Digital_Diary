import { Component, OnInit } from '@angular/core';
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
  buttonNamer:any = 'Add'
  OnClick(){
    this.isClicked = !this.isClicked;
    if(this.isClicked)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  OnClickR(){
    this.isClicked = !this.isClicked;
    if(this.isClicked)  
      this.buttonNamer = "Submit";
    else
      this.buttonNamer = "Add";
  }
  

  constructor(private postService: PostService, public _auth:AuthService) { }

  ngOnInit(): void { 
    let postid = localStorage.getItem("postId");
    this.postService.getSinglePost(postid)
    .subscribe((data)=>{
      this.post = JSON.parse(JSON.stringify(data));
    })
  }
  Deletepost(id:any){
    this.postService.deletepost(id);
  }

}
