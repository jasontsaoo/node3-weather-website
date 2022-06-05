const request=require('request')

const forecast = (latitude,longitude,callback)=>
{
    url_weather='http://api.weatherstack.com/current?access_key=fb794dcac6a3279956cde154a80fa207&query='+longitude+','+latitude+'&units=m'
    request({url:url_weather,json:true},(error, {body})=>{
        if(error)
        {
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find location',undefined)
        }
        else
        {
            callback(undefined,{
                temperature:body.current.temperature,
                feeltemp:body.current.feelslike
            })
        }
    })
}

module.exports=forecast