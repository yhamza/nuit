const express=require('express')
const {join} = require("path");
const route=express.Router();


route.get('/get/:id', (req, res) => {

    const imageId = req.params.id;

    const imagePath = join( __dirname,'../../compressed_img', `${imageId}`);

    res.sendFile(imagePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('Image not found');
        }
    });
});




module.exports=route