const express=require("express");
const app=express();
const port=8080;
const path =require("path");
//requiring uuid
const {v4:uuidv4}=require('uuid');
//method override package require
const methodOverride=require("method-override");

app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));
app.set(express.json());

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

//ye sirf data hai 
let posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"I Love coding!"
    },

    {
        id:uuidv4(),
        username:"KanaPatidar",
        content:"Hard working is import to achieve success!"
    },

    {
        id:uuidv4(),
        username:"Hitman",
        content:"rohit sharma is my cricket hero and legend"
    },
];



app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
});


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
   let{username,content}=req.body;
   let id=uuidv4();
   posts.push({id,username,content,});
   res.redirect("/posts")
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
   
   let post=posts.find((p)=>id ===p.id);
   
   res.render("show.ejs",{post})
    
})



app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id ===p.id);
    post.content=newContent;
   res.redirect("/posts");                                                                                                                                                                                                                                                                                      
});



app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id ===p.id);
    res.render("edit.ejs",{post});
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>id !==p.id);
    res.redirect("/posts");
   
})


app.listen(port,()=>{
    console.log("listening to port : 8080");

});
