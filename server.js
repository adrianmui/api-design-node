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
const _ = require('underscore');
let app = express();

app.set('view engine', 'ejs');

//middleware with IIFE
app.use(
    ((data) => {
        return (request, response, callback) => {
            request.body = {
                count: data.count,
                message: data.message
            };
            callback();
        }
    })(jsonData)
);

//entry point
app.get('/', (request, response) => {
    fs.readFile('index.html', (err, buffer) => {
        if (err) console.log(err);
        let map = {};
        let html = buffer.toString();
        let re = /[$]{([^}]*)}/g;
        // map assigns values to replace
        html.match(re).forEach((el, idx) => {
            map[el] = el.substring(2, el.length - 1);;
        });
        // replaces html
        _.each(map, (attr, idx) => {
            let name = map[idx].replace('request.body.', '');
            html = html.replace(idx, request.body[name]);
        });

        response.send(html);
    });
    // synchronously processes the view language
    // response.sendFile(__dirname + '/index.html', () => {});
    // app.use('/index.html', (req, res) => {
    //     fs.createReadStream('index.html')
    //         .pipe(res);
    // });
});

app.get('/data', (request, response) => {
    response.send(jsonData);
})

// port listen
app.listen('3000', () => {
    console.log('listening to port 3000...')
});