const request = require('request')

const geoCode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoia2FscGF3IiwiYSI6ImNrOHExdHRvbzAwZzgzbm82NTBpdm5yOGUifQ.a9fw7ctW6DoaQ_dv_sa1-A'
    
    request({ url,'json':true},(error,{body,message}={})=>{
    
      if(error){
        callback("Unable to Connect Geo API",undefined)
      }
     else if(message){
        callback(message,undefined)
      }else if(body.features.length===0){
        callback("Unable to find theLocation",undefined)
      } 
      else{
        callback(undefined,{
            latitude: body.features[0].center[0],
            longitude:body.features[0].center[1],
            location:body.features[0].place_name

        })
      }

        
    })
    
    }

    module.exports=geoCode