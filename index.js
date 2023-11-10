const express  = require("express");
const cors = require('cors');
const app = express();

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(cors(corsOpts));
app.use(express.json());

app.post('/',require("./webScraper").scraper);
app.get('/fetchToken/:id',require("./tokenFetcher").fetcher);
app.post('/savedata',require('./processData').save);
app.get('/getdata',require('./processData').getData);
const port = 8000;

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in starting the server ${err}`);
        return;
    }

    console.log(`server is running at port ${port}`)
})
