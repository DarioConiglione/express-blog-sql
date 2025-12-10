const posts = require('../data/postsData');
const connection = require('../database/db.js')

//index
function index(req, res) {
    const sql = 'SELECT * FROM posts';
    connection.query(sql, (err, results) => {
        console.log(results);
        if (err) return res.status(500).json({ error: true, message: err.message });
        res.json(results);
    })

}
//show
function show(req, res) {
    const id = parseInt(req.params.id);
    const sql = 'SELECT * FROM posts WHERE id = ?'
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Post non trovato' })
        console.log(err, results);
        res.json(results[0]);
    })
    /* const post = posts.find(post => post.id === id);
    if (!post) {
        res.status(404);
        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    } */
}

//store
function store(req, res) {
    const newId = posts[posts.length - 1].id + 1;
    // Creiamo un nuovo post
    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }
    // Aggiungiamo il nuovo post
    posts.push(newPost);
    // controlliamo
    console.log(posts);

    // Restituiamo lo status corretto e il posto appena creata
    res.status(201);
    res.json(newPost);
    res.send('Creazione nuovo post');
}
//update
function update(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(post => post.id === id);
    if (!post) {
        res.status(404);
        return res.json({
            status: 404,
            error: "Not Found",
            message: "Post non trovato"
        })
    }
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags;
    console.log(posts);

    res.json(post);
}
//destroy
function destroy(req, res) {
    const id = parseInt(req.params.id)
    const sql = 'DELETE FROM posts WHERE id = ?'
    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: true, message: err.message })
        console.log(results);

    })
    res.send(`hai cancellato il post con id: ${id}`)
    /*  const post = posts.find(post => post.id === id);
     if (!post) {
         res.status(404);
         return res.json({
             status: 404,
             error: "Not Found",
             message: "Post non trovato"
         })
     } 
    // Rimuoviamo il post dal menu
    posts.splice(posts.indexOf(post), 1);
    console.log(posts);
    res.sendStatus(204); */
}


module.exports = { index, show, store, update, destroy }