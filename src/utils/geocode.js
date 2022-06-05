const request=require('request')

const geocode = (address,callback)=>
{
    url_geocode='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiamFzb250c2FvIiwiYSI6ImNsM2l1djl4cTFweW4zZHJzOWtkNzltNTEifQ.Q1z_bWqxroVXtaouJtyRuw&limit=1'
    request({url:url_geocode,json:true},(error,{body})=>{
        if (error)
        {
            callback('Unable to connect to geo services',undefined)
        }
        else if(body.features.length===0)
        {
            callback('Unable to find location, try again',undefined)
        }
        else
        {
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode