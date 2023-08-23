// Express application
import express from 'express';
import {dirname, sep}  from 'path';
import {fileURLToPath} from 'url';

// configuration
const
    cfg = {
        port: process.env.PORT || 3000
    };

// configuration
const
    __dirname = dirname(fileURLToPath(import.meta.url)) + sep,
    viewsCfg = {
        port: process.env.PORT || 3000,
        dir: {
            root: __dirname,
            static: __dirname + 'static' + sep,
            views: __dirname + 'views' + sep
        }
    };

// Express initiation
const app = express();

// use EJS templates
app.set('view engine', 'ejs');
app.set('views', viewsCfg.dir.views);

// home page route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// // another route
// app.get('/hello/', (req, res) => {
//     res.send('Hello again!');
// });

// /hello/ route
import { helloRouter } from './routes/hello.js';
app.use('/hello', helloRouter);


// serve static assets
app.use(express.static('static'));

// message home page route
app.get('/message/', (req, res) => {
    res.render('message', {title: 'Hello World!'});
});

// another route
app.get('/message/hello/', (req, res) => {
    res.render('message', {title: 'Hello again!'});
});

// 404 errors
app.use((req, res) => {
    res.status(404).render('message', {title: 'Not found'});
});

// start server
app.listen(cfg.port, () => {
    console.log(`Example app listening at http://localhost:${cfg.port}`);
});
