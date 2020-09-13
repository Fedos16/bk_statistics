const express = require('express');
const router = express.Router();
const config = require('../config');

const multer = require('multer');
const mkdirp = require('mkdirp');

var path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    res.render('workspace');
});

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        fs.mkdir(config.DESTINATION, function(err) {
            if (err) console.log('Файл существует');
            callback(null, config.DESTINATION);
        })
    },
    filename: function (req, file, callback) {
      callback(null, 'source_file' + path.extname(file.originalname));
    }
});
// UPLOAD FILE
router.post('/saveexcel', async (req, res) => {

    var upload = multer({ storage : storage}).single('file');
    upload(req,res,function(err) {
        if(err) {
            return res.json({ok: true, text: "Error uploading file."});
        }
        res.json({ok: true, path: req.file.path}); // path: req.file.path
    });

});
router.get('/:page', (req, res) => {
    const params = req.params;
    res.render(params.page);
});

module.exports = router;
