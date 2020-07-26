const request =require('request')

const focast=(latitute,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=32488a10c40f360f022c6ccbd3691529&query='+encodeURIComponent(latitute)+','+encodeURIComponent(longitude)

    request({url,json:true},(error,{body})=>{
        if (error)
        {
            callback("Unable to connect API",undefined)
           
        } else if(body.error){
            callback(body.error.info,undefined)
        }
        
        else{
            callback(undefined,body.current)
        }
    })
}

module.exports=focast