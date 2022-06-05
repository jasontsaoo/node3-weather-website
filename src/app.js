const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Jason Tsao'
    })
})
app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Jason Tsao'
    })
})
app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help',
        name: 'Jason Tsao',
        helpText: 'This is a helpful text'
    })
})

app.get('/weather', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={}) =>{
        if (error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help*', (req, res)=>{
    res.render('404', {
        title:'404',
        name:'Jason Tsao',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title:'404',
        name:'Jason Tsao',
        errorMessage:'Page not found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})