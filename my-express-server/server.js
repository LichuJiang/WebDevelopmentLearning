const express=require("express");
const app=express();

app.get("/",function(request,response){
    response.send("hello");
});

app.get("/hobbies",function(request,response){
    response.send("I like play the piano");
});

app.listen(3000,function(){
    console.log("Server started on port 3000");
});
