const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require ('./utils/geocode');
const forecast = require ('./utils/forecast');
const port = process.env.PORT || 3000

//define path for express config
const dirpath = path.join(__dirname, '../public');
const viewspath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')
//set up static directory
app.use(express.static(dirpath))
//set up handlebars engine and templates location
hbs.registerPartials(partialpath);
app.set('view engine', 'hbs')
app.set('views',viewspath)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Aplikasi Cuaca',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Bantuan',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About ',
    })
})


app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'Anda Harus Memasukkan Alamat'
        })
    }
    geocode(req.query.address,(error, {latitude,longitude,location}={}) => {
        if(error){
            return res.send({
                error: error,
            });
        }
        forecast(latitude,longitude, (error, forecastdata) => {
            if (error){
                return res.send({
                    error: error,
                })
            }
            res.send({
                location: location,
                forecastdata: forecastdata,
                address: req.query.address
            });
        })
    })
});

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title: 'Error Page',
        name: 'Naufal A.F',
        error: 'Help Article Not Found',
    })

})

app.get('*',(req,res)=>{
    res.render('404page',{
        title: 'Error Page',
        name: 'Naufal A.F',
        error: 'Page Not Found',
    })
})

app.listen(port,()=>{
    console.log('Up and Running on port ' + port);
});