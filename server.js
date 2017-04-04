// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

// fake data
let jsonData = {
    count: 12,
    message: 'hey'
};

//express server
const express = require('express');
const fs = require('fs');
let app = express();

app.set('view engine', 'ejs');

//middleware with IIFE
app.use(
    ((data) => {
        return (request, response, callback) => {
            console.log('response has set data to: ', data);
            request.body = {};
            request.body.count = data.count;
            request.body.message = data.message;
            callback();
        }
    })(jsonData)
);

//entry point
app.get('/', (request, response) => {
    // synchronously processes the view language
    // response.sendFile(__dirname + '/index.html', () => {

    // });
    // response.send(` 
    //   ${request.user.name} + ${request.body.count} + ${request.body.message}
    // `);
    fs.readFile('index.html', (err, buffer) => {
        if (err) console.log(err);
        let html = buffer.toString();

        response.send(`
        {
           count: ${request.body.count},
           message: ${request.body.message}
        } + ${html}`);
    });
});

app.get('/data', (request, response) => {
    response.send(jsonData);
})

// port listen
app.listen('3000', () => {
    console.log('listening to port 3000...')
});