import express, { application } from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:false}))

app.get("/", (req,res) =>{
    res.render("index.ejs")
})
const apiKey = "42df5252cdcda65564760ecb1db12eef";


app.post("/weather",async (req,res) =>{
    try {
        const locationName = req.body.location
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=metric&appid=${apiKey}`)
        console.log(result.data.weather[0].id);
        
        res.render("index.ejs", {
            name:result.data.name,
            temp:result.data.main.temp,
            wind:result.data.wind.speed,
            humidity:result.data.main.humidity,
            lon:result.data.coord.lon,
            lat:result.data.coord.lat,
            description:result.data.weather[0].description


        })
    } catch (error) {
        res.status(404).json({message:"City not found"})
    }
    
    // console.log(result.data);


    
})



app.listen(port, ()=>{
    console.log(`App is listening on port ${port}`);
    
})