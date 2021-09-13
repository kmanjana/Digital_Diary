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

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.postService.getBlogs()
    .subscribe((blogs)=>{
      this.posts = JSON.parse(JSON.stringify(blogs));
    })
  } 

  categorySelect(catgselect : any){
    console.log("hai");
    console.log(catgselect);
    this.postService.getBlogsByCatg(catgselect)
    .subscribe((data)=>{
      this.posts = JSON.parse(JSON.stringify(data));
    })
  }

}