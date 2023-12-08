const express=require('express')
const {join} = require("path");
const route=express.Router();


route.get('/getvid/:id', (req, res) => {

    const videoId = req.params.id;

    const videoPath = join( __dirname,'../../compressed_videos', `${videoId}`);
    console.log(videoPath)
    res.sendFile(videoPath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('video not found');
        }
    });
});




module.exports=route