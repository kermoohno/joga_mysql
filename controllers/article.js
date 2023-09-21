// import database connection
const con = require('../utils/db');


// show all articles - index page
/*const getAllArtticles = (req, res) =>  {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
};
*/

// show all articles - index page

//show article by this slug
/*const getArticleBySlug = (req, res) => {
    let query = `SELECT *,
    				article.name as article_name,
					author.name as author_name
					FROM article
					INNER JOIN author
					ON author.id = article.author_id WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        console.log(article)
        res.render('article', {
            article: article
        })
    });
};

//export controller functions
module.exports = {
    getAllArtticles,
    getArticleBySlug
};

 */
const Article = require('../models/article.model');

// show all articles - index page
const getAllArticles = (req, res) => {
    Article.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'Some error occurred retrieving articles data'
            })
        } else {
            console.log(data)
            res.render('index', {
                articles: data
            })
        }
    })
};

// show article by this slug
    const getArticleBySlug = (req, res) => {
        Article.getBySlug(req.params.slug, (err, data) => {
            if (err) {
                res.status(500).send({
                    message : err.message || 'Some error occurred retrieving article data'
                })
            } else {
                console.log('single data')
                console.log(data)
                res.render('article', {
                    article: data
                })
            }
        })
    };

// create new article
const createNewArticle = (req, res) => {
    //new article from Post data (example from form)
    console.log('new article')

    console.log({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        published: new Date().toISOString().slice(0, 19).replace('T', ''),
        author_id: req.body.author_id
    })

    const newArticle = {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' '),
        author_id: req.body.author_id
    }

    Article.createNew(newArticle, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occured sending article data'
            })
        } else {
            console.log(data)
            res.redirect('/')
        }
    })
};

//display article form
const showNewArticleForm = (req, res) => {
    res.render('create_article')
};


// export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug,
    createNewArticle,
    showNewArticleForm,
};




