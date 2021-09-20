import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  getBlogs(){
    return this.http.get("http://localhost:3000/blogs");
  }

  getBlogsByCatg(category:any){
    return this.http.get("http://localhost:3000/blogsbyCatg/"+category);
  }

  getUsername(userid : any){
    return this.http.get("http://localhost:3000/getusername/"+userid);
  }

  getmyPosts(userid : any){
    return this.http.get("http://localhost:3000/myposts/"+userid)
  }

  newPost(item:any ,userid:any){
    return this.http.post("http://localhost:3000/insertpost/"+userid, {"post" : item})
    .subscribe(data => {console.log(data)})
  }
  
  getPost(postid:any){ //to get details of the post for update page 
    return this.http.get("http://localhost:3000/post/"+postid);
  }
  deletepost(id:any){
    return this.http.delete("http://localhost:3000/deletepost/"+id);
  }

  getSinglePost(postid:any){
    return this.http.get("http://localhost:3000/singlepost/"+postid);
  }

  updatePost(post: any,userid:any){
    return this.http.put("http://localhost:3000/updatepost/"+userid,post)
    .subscribe((data)=>{console.log(data)})
  }
  addReview(postId:any,post:any){
    return this.http.put("http://localhost:3000/blog/"+postId,post)
    .subscribe((data)=>{console.log(data)})
  }
  deletePost(id: any){
    return this.http.delete("http://localhost:3000/removepost/"+id);
  }

}
