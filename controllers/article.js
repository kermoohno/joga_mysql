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
                console.log(data)
                res.render('article', {
                    article: data
                })
            }
        })
    };


// export controller functions
module.exports = {
    getAllArticles,
    getArticleBySlug
};




