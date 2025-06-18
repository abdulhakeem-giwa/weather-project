const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "052f3c78990ef5d33ab9c3baca38fed9" ;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
        console.log(response.statusCode);

         response.on("data", function(data){
           const weatherData = JSON.parse(data)  
           const temp = weatherData.main.temp
           const weatherDescribtion = weatherData.weather[0].description
           const icon = weatherData.weather[0].icon
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
           res.write("<p>The weather is currently " + weatherDescribtion + "</p>");
           res.write("<h1>The temperature in " + query + " is " + temp + "degree Celcius.</h1>");
           res.write("<img src=" + imageURL + ">");
           res.send()
    });
      })
        
    })
    

app.listen(5000, function(){
    console.log("Server is running on port 5000.");
    
}) 
    

    