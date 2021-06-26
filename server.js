const express = require('express');
const app = express();
const axios = require('axios');


app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

//AXIOS REQUEST
app.get('/results', (req, res)=>{
    let search = req.query.search;
    
    axios.get(`http://www.omdbapi.com/?apikey=aea3bc9d&s=${search}`)
    .then((response)=>{
        res.render('results',{results: response.data.Search});
    })
});

app.get('/results/:id', (req,res)=>{
    let id = req.params.id;
    axios.get(`http://www.omdbapi.com/?i=${id}&apikey=aea3bc9d`)
    .then((response)=>{
        res.render('search',{result: response.data});
    })
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server set up.');
});
