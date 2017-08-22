const router = require("express").Router();
const Article = require('../models/Article.js')
const Comment = require('../models/Comment.js')

router.post('/', (req, res) => {
	console.log('comment post: ', req.body)
	const newComment = {
		name: req.body.name,
		body: req.body.body
	}
	const article = req.body.articleID
	Comment.create(newComment, (err, doc) => {
		if (err) {
			console.log(err)
		} else {
			Article.update({_id: article}, {$push:{comment: doc._id}}, (err, doc) => {
				err ? console.log(err) : res.send(doc);
			})
		}
	})
})

router.delete('/:id', (req, res) => {
	Comment.remove({_id: req.params.id}).exec((err, doc) => {
		err ? console.log(err) : res.send(doc)
	})
})

module.exports = router;