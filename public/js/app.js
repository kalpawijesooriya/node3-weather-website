console.log('client sise java script file')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
weatherForm.addEventListener('submit',(e)=>{

    document.getElementById('message-2').innerHTML="Lodding....."
    document.getElementById('message-1').innerHTML=""
    
    e.preventDefault()
    const location=search.value
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((responce)=>{
    responce.json().then((data)=>{
        if(data.error)
        {
            document.getElementById('message-1').innerHTML=data.error
            document.getElementById('message-2').innerHTML=""
          
        }else{
            document.getElementById('message-1').innerHTML=""
            document.getElementById('message-2').innerHTML=data.location +" "+ data.observation_time +" " +data.weather
           
        }
      
    })
})
  

})