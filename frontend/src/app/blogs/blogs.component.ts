import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from '../posts/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  posts : PostModel[] = [];

  constructor(private postService : PostService,private _router: Router) { }

  ngOnInit(): void {
    this.postService.getBlogs()
    .subscribe((blogs)=>{
      this.posts = JSON.parse(JSON.stringify(blogs));
    })
    let postId = localStorage.getItem("updatePostId");
    this.postService.getPost(postId)
    .subscribe((data)=>{
      this.posts = JSON.parse(JSON.stringify(data)); //stringify = convert from object to JSON ; parse = convert from JSON to object
    })
    console.log(postId);
  } 
  // UpdatePost(post:any){
  //   localStorage.setItem("updatePostId" , post._id.toString());
  //   console.log(post);
  //   this._router.navigate(['/updatepost']);
  // }

  categorySelect(catgselect : any){
    console.log("hai");
    console.log(catgselect);
    this.postService.getBlogsByCatg(catgselect)
    .subscribe((data)=>{
      this.posts = JSON.parse(JSON.stringify(data));
    })
  }
  Addreview(post:any){
    localStorage.setItem("updatePostId",post._id.toString());
    this._router.navigate(['/blog']);
  }
  setPostId(post:any){
    localStorage.setItem("postId",post._id.toString());
  }
}