const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require ('./utils/geocode');
const forecast = require ('./utils/forecast');

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
        title: 'Weather App',
        name: 'Naufal Ahmad Fauzan',
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name: 'Naufal Ahmad Fauzan',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: 'Naufal A.F'
    })
})


app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide the address'
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

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
  res.send({
      products: []
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

app.listen(3000,()=>{
    console.log('Up and Running');
});