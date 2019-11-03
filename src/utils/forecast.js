const request = require('request');

const forecast= (lat,long,callback)=>{
    const url = 'https://api.darksky.net/forecast/cc8062d09cc31afdfbd7789cd2beb3e6/' + encodeURIComponent(lat) + ','+ encodeURIComponent(long)+'?units=si';
    request({url, json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect!',undefined)
        }
        else if (body.error){
            callback('Unable to find the location!',undefined)

        }
        else{
            callback(undefined,' Suhu Sekarang '+ body.currently.temperature + ' Derajat.' + ' Dengan Probabilitas Hujan '+ body.currently.precipProbability + ' Persen')
        }
    })
};

module.exports= forecast;