// const path = require("path");
const express = require("express");
const jwt = require ("jsonwebtoken");
const PostData = require ('./src/model/post');
const UserData = require ('./src/model/user');
// const mongoose = require("mongoose");
// const db = require("./db/db");
// const header_middleware = require("./middlewares/header");

// const postRouter = require("./Routes/post");
// const userRoutes = require("./Routes/user");
// const profileRoutes = require("./Routes/profile");

var cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

// app.use("/api/posts", postRouter)
// app.use("/api/user", userRoutes);

// app.use("/api/profile", profileRoutes);


//signup
app.post('/adduser' , function (req,res){
    console.log("add user");
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
    console.log("insert");
    console.log(req.body);

    // var password = req.body.user.paswd;
    // const hashedPsw =  bcrypt.hash(password,12);

    var user = {
        // fname : req.body.user.fname.trim(),
        // lname : req.body.user.lname.trim(),
        // email : req.body.user.email.trim(),
        // phno : req.body.user.phno.trim(),
        username : req.body.user.username.trim(),
        // paswd : req.body.user.paswd
    }

    var user = new UserData(user);
     user.save();
});

//login
app.post('/login' , function(req,res){
    console.log("login");
    let username = req.body.username;

    if(username == "admin"){
        let payload = {subject: username};
        let token = jwt.sign(payload,'secretKey');
        console.log(token);
        res.status(200).send({token,username});
    }
    else{

    UserData.findOne({username : username})
    .then(function(user){
            let payload = {subject: username};
            let token = jwt.sign(payload,'secretKey');
            console.log(token);
            let userid = user._id;
            res.status(200).send({token,userid});     
    })
    .catch(function(){
        res.status(401).send("Invalid username");
    })
    }
})

function verifyToken(req,res,next){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
    if(!req.headers.authorization){       
        return res.status(401).send('Unauthorized request');
    }
    
    let token = req.headers.authorization.split(' ')[1];  
    if(token == "null"){
        return res.status(401).send('Unauthorized request');
    }
    
    let payload = jwt.verify(token , 'secretKey');
    if(!payload){
        return res.status(401).send("Unauthorized request");
    }
    req.userId = payload.subject;
    next();   //if correct user request 

}

//show all blogs by category
app.get('/blogsbyCatg/:category' , function (req,res){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");

    let category = req.params.category;
    // console.log(category);
    PostData.find({"category":category})
    .then(function(blogs){ 
        res.send(blogs);
    });
});

//to get username
app.get('/getusername/:userid' , function (req,res){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const userId = req.params.userid;
    UserData.findOne({"_id":userId})
    .then(function(user){ 
        res.send(user);
    });
});

//show all users posts
app.get('/myposts/:userid' ,verifyToken, function (req,res){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");

    const userId = req.params.userid;
    // console.log(userID);
    PostData.find({"UserID":userId})
    .then(function(posts){ 
        res.send(posts);
    });
});

//single post
app.get('/singlepost/:postid',function(req,res){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
    const postId = req.params.postid;

    PostData.findOne({"_id":postId})
    .then(function(post){ 
        res.send(post);
    });
});

//to get details of the post for update page 
app.get('/post/:postid',function(req,res){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
    const postId = req.params.postid;

    PostData.findOne({"_id":postId})
    .then(function(post){ 
        console.log(post);
        res.send(post);
    });
});


// app.get('/post/:id' , (req,res)=>{

//     const id = req.params.id; 
    
//     PostData.findOne({"_id":id})
//     .then((post)=>{
//         res.send(post);
//     })
// })


//add new post
app.post('/insertpost/:userid' ,verifyToken, function (req,res){
    res.header("Access-control-Allow-Origin" , "*");
    res.header("Access-control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
    const UserId = req.params.userid;
    console.log("insert");
    console.log(req.body);
    var post = {
        UserID : UserId,
        title : req.body.post.title,
        category : req.body.post.category ,
        review :""     //check this section to add the review
    }

    var post = new PostData(post); 
    console.log(post);
    post.save();
});
app.get('/blogs',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods : GET,POST,PATCH,PUT,DELETE,OPTIONS");
    PostData.find()
    .then(function(post){ 
        res.send(post);
    });
});

//update a post
//update a post
app.put('/updatepost/:userid' ,verifyToken, function(req,res){
    console.log("update" +req.body);
    const UserId = req.params.userid;

    id = req.body._id,
    UserID = UserId,
    title = req.body.title,
    category = req.body.category
    console.log("update");
    console.log(req.body);

    PostData.findByIdAndUpdate({"_id" : id },
                                  {$set : {
                                      "UserID" : UserID,
                                      "title" : title,
                                      "category" : category, 
                                      "review" :""                            
                                  }})
    .then(function(){
        res.send();
    })                                  
})
//add a review 
app.put('/blog', function(req,res){
    console.log("Review" +req.body);
    const UserId = req.params.userid;

    id = req.body._id,
    UserID = UserId,
    // title = req.body.title,
    // category = req.body.category,
    review=req.body.review
    console.log("review");
    console.log(req.body);
    PostData.findByIdAndUpdate({"_id" : id },
                                  {$set : {
                                      "UserID" : UserID,
                                    //   "title" : title,
                                    //   "category" : category, 
                                      "review" : review                       
                                  }})
    .then(function(){
        res.send();
    })                                 
})

// delete post
app.delete('/removepost/:id' ,verifyToken, function(req,res){
    id = req.params.id;
    PostData.findByIdAndDelete({ "_id" : id })
    .then(()=>{
        console.log('success');
        res.send();
    })
})

app.delete('/deletepost/:id',function(req,res){
    const id = req.params.id;
    PostData.remove({_id: id})
    .then(function(){
        res.status(200).json({id});
    })
});

app.listen(port,()=>{console.log("Server Ready at "+port)});