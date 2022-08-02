let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/weather-project'));

app.get('/*', (req, resp) => {
    resp.sendFile(__dirname+'/dist/weather-project/index.html');
})

app.listen(process.env.PORT || 8080);

// function requireHTTPS(req, res, next) {
//     // The 'x-forwarded-proto' check is for Heroku
//     if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//         return res.redirect('https://' + req.get('host') + req.url);
//     }
//     next();
// }
// const express = require('express');
// const app = express();
// const app = express();
// app.use(requireHTTPS);


// app.use(express.static(`./dist/package.json`));
