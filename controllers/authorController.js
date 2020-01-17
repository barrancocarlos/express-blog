var authorModel = require('../models/authorModel.js');

/**
 * authorController.js
 *
 * @description :: Server-side logic for managing authors.
 */
module.exports = {

    /**
     * authorController.list()
     */
    list: function (req, res) {
        authorModel.find(function (err, authors) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting author.',
                    error: err
                });
            }
            return res.json(authors);
        });
    },

    /**
     * authorController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        authorModel.findOne({_id: id}, function (err, author) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting author.',
                    error: err
                });
            }
            if (!author) {
                return res.status(404).json({
                    message: 'No such author'
                });
            }
            return res.json(author);
        });
    },

    /**
     * authorController.create()
     */
    create: function (req, res) {
        var author = new authorModel({
			name : req.body.name,
			lastName : req.body.lastName,
			user : req.body.user

        });

        author.save(function (err, author) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating author',
                    error: err
                });
            }
            return res.status(201).json(author);
        });
    },

    /**
     * authorController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        authorModel.findOne({_id: id}, function (err, author) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting author',
                    error: err
                });
            }
            if (!author) {
                return res.status(404).json({
                    message: 'No such author'
                });
            }

            author.name = req.body.name ? req.body.name : author.name;
			author.lastName = req.body.lastName ? req.body.lastName : author.lastName;
			author.user = req.body.user ? req.body.user : author.user;
			
            author.save(function (err, author) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating author.',
                        error: err
                    });
                }

                return res.json(author);
            });
        });
    },

    /**
     * authorController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        authorModel.findByIdAndRemove(id, function (err, author) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the author.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
