const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const formidableMiddleware = require('express-formidable');

const app = express();
app.engine('.hbs', hbs());
app.set('view engine', '.hbs');
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.use((req, res, next) => {
    res.show = (name) => {
        res.sendFile(path.join(__dirname, `/views/${name}`));
    };
    next();
});

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(formidableMiddleware());

app.get('/', (req, res) => {
    res.render('index' );
});

app.get('/about', (req, res) => {
    res.render('about' );
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/info', (req, res) => {
    res.render('info');
});

app.get('/history', (req, res, next) => {
    res.render('history');
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { name: req.params.name });
});

app.post('/contact/send-message', (req, res) => {
    const { author, sender, title, message } = req.fields;
    const file = req.files.file;

    if (author && sender && title && message && file && file.name) {
        res.render('contact', { isSent: true, file: file.name });
    } else {
        res.render('contact', { isError: true });
    }
});

app.use((req, res) => {
    res.status(404).send('404 not found...');
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});