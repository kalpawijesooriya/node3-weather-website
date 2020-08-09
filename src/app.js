const path= require('path')
const express =require('express')
const hbs = require('hbs')
const geoCode=require('./utils/geoCode')
const focast=require('./utils/forcast')

const app =express()
const port =process.env.PORT ||3000
//defile paths
const publicDir=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templete/views')
const partialsPath=path.join(__dirname,'../templete/partials')

//setup handelers Engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



//setup static directory to serve
app.use(express.static(publicDir))

app.get('',(req,res)=>{

    res.render('index',{
      title:'weather',
      name:'Kalpa Wijesooriya'
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title:'About',
        name:'Kalpa Wijesooriya'
      })
})
app.get('/help',(req,res)=>{
    res.render("help",{
        title:'Help',
        name:'Kalpa Wijesooriya'
      })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        res.send({error:"No address is provided"})
    }else{

        geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{


            if(error){
                res.send({error:error})
           
            }else{
               
               focast(latitude,longitude,(error,{observation_time,weather_descriptions}={})=>{
                  if (error){
                    res.send({error:error})
                  }else{
                    res.send({
                        location,
                        observation_time,
                        weather: weather_descriptions[0]
                    })
                    
                  }
               
         
               })
         
            }
         
            })
      
    }
  
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title:'404',
        errorMessage:'Help airticale not found',
        name:'Kalpa Wijesooriya'
    })
})


app.get('*',(req,res)=>{
    res.render("404",{
        title:'404',
        errorMessage:'page Not Found',
        name:'Kalpa Wijesooriya'
    })
})

app.listen(port,()=>{
    console.log("Server is start on port "+ port)
})