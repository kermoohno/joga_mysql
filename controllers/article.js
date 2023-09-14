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
const Article = require('../models/article.models');

// show all articles - index page
const getAllArticles = (req, res) => {
    Article.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message : err.message || 'Some error occurred retrieving aritcles data'
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
    let query = `SELECT article.*, author.name AS authorName 
                 FROM article 
                 INNER JOIN author ON article.author_id = author.id 
                 WHERE article.slug="${req.params.slug}"`;

    con.query(query, (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Some error occurred retrieving the article data'
            });
        } else {
            const article = result[0]; // Assuming you expect one result
            res.render('article', {
                article: article
            });
        }
    });
};


// export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug
};




