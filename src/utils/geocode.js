const request = require('request');

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibmF1ZmFsMzciLCJhIjoiY2syN211aXNuMGFqZjNsbXNvZjJib3pobiJ9.OWpi3191PjrmIAVe38LQmw&limit=1'

    request({url, json:true},(error,{body}={})=>{

        if (error){
            callback('Gagal Menyambung Ke Internet!',undefined)
        }
        else if(body.features.length === 0){
            callback('Lokasi Tidak Ditemukan!',undefined)
        }
        else{

            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }

    })
};
module.exports = geocode;