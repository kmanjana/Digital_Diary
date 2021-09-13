import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { PostModel } from '../post.model';

@Component({
  selector: 'app-addnewpost',
  templateUrl: './addnewpost.component.html',
  styleUrls: ['./addnewpost.component.css']
})
export class AddnewpostComponent implements OnInit {

  postItem = new PostModel("","","","");

  constructor(private postService : PostService, private _router : Router) { }
  
  ngOnInit(): void {
  }
  
  AddPost(){
    let userid = localStorage.getItem("UserID");
    this.postService.newPost(this.postItem , userid);
    console.log("added");
    console.log(this.postItem);
    alert("success");
    this._router.navigate(['/myposts']); 
  }
}
