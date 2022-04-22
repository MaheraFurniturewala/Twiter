const express = require('express');
const app = express();
const axios = require('axios');
const port = 8000;
require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());

app.set("view engine", "ejs");
app.set('views', './views');
app.get('/',(req,res)=>{
    res.render('home');
});

app.post('/getTweet',(req,res)=>{
    var config = {
        method: 'get',
        url: `https://api.twitter.com/2/tweets/${req.body.id}`,
        headers: { 
          'Authorization': `Bearer ${process.env.BEARER}` , 
          'Cookie': 'guest_id=v1%3A165063605497992199'
        }
      };
      
      axios(config)
      .then(function (response) {
        const tweet = JSON.stringify(response.data.data.text);
        res.send(tweet);
      })
      .catch(function (error) {
        console.log(error);
        res.render('home');
      });
      
});

app.listen(port, (err) => {
    if (err) {
        console.log(`error in running server on port: ${port}`);
        return;
    } else {
        console.log(`Server running on port : ${port}`);
    }
    
});