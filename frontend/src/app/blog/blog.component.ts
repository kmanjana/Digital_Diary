import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from 'src/app/posts/post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  post = new PostModel("","","","");
  
  isClicked = false; 
  buttonName:any = 'Show';
  OnClick(){
    this.isClicked = !this.isClicked;
    if(this.isClicked)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  

  constructor(private postService: PostService) { }

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
