const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https")

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    var firstName=req.body.fName;
    var lastName=req.body.lName;
    var email=req.body.email;
    
    console.log(firstName,lastName,email);
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }

    const jsonData=JSON.stringify(data);
    const url="https://us18.api.mailchimp.com/3.0/lists/d95122d93f";
    
    const options={
        method:"POST",
        auth:"lichu:397597c1aa550c52af4bbfbe42abc8b5-us18"
    }
    const request=https.request(url,options,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.listen(3000,function(){
    console.log("Server is running on port 3000.");
});

//List Id
//d95122d93f

//API Key
//397597c1aa550c52af4bbfbe42abc8b5-us18