const bodyParser = require('body-parser');
const express = require('express');
const config = require('./config');
const wpjs = require('./wp');

wpjs.connect({number: '919490844988', password: 'heR+w8TtdExFWHlrwuq7hdEUvhM=', yowsup:`C:\\Users\\AMANI DEEPTHI\\yowsup`}, function(state){
 console.log(state)
}); 


let app = express();

// adding middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Custom function for sending data in YM JSON format


app.use((req, res, next) => {
    res.publish = function (success, message, data) {
        this.send({
            success,
            message: message || '',
            data: data || {}
        });
    };
    next();
});

app.use('/health-check', function (req, res) {
    res.send('Working!');
});
// End of Router

app.post('/send' , (req,res) => {
    wpjs.send({to: '919866086895', type: 'txt', data: 'whatsapp is done'});
});
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
app.listen(config.APP_PORT);
