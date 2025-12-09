const express = require('express')
const app = express()
const port = 3000
const postsRouter = require('./routers/posts');
const notFound = require('./middleware/notFound')
const serverError = require('./middleware/serverError')


app.use(express.static('public'));

//importiamo body parser per convertire una richiesta http in un oggetto json
app.use(express.json());
app.post("/", (req, res) => {
    console.log(req.body);
});

app.get('/', (req, res) => {
    res.send('Server del mio Blog!')
});

app.use("/posts", postsRouter);
app.use(notFound);
app.use(serverError);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
