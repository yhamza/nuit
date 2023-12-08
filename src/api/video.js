const express = require('express');
const route = express.Router();

//services
const compresser = require('../service/compress/video.js');
const downloadVideo = require('../service/download/video.js');
const getSizeInMegabytes= require('../service/size/get_vid_size')
const getVideoResolution=require('../service/resolution/get_vid_res')
const remove=require('../service/deletefile/delete')
const getFileExtension = require("../service/format/getformat")



route.use(express.json());
route.use(require('../service/url/video'))

route.post('/video', async (req, res) => {
    try {
        const url = req.body.url;
        if (!url) {
            return res.status(400).send("Cannot get video ");
        }
        const savepath="C:\\Users\\Administrator\\WebstormProjects\\finalimg\\src\\compressed_videos"
        const nbfile = Number(new Date());
        const videoPath = `C:\\Users\\Administrator\\WebstormProjects\\finalimg\\src\\source\\${nbfile}.mp4`;
        const videoQuality = 'medium';

        downloadVideo(url, videoPath)
            .then(() => {
                compresser(videoPath,savepath,videoQuality, async (error, result) => {
                    if (error) {
                        console.error('Error compressing the video:', error);
                        res.status(500).send("Internal Server Error");
                    } else {
                        console.log("Compress done");

                        const videoPath2 = videoPath.replace("source", "compressed_videos");

                        const t1 = await getSizeInMegabytes(videoPath)
                        const t2 = await getSizeInMegabytes(videoPath2)

                        const r1=await getVideoResolution(videoPath);
                        const r2=await getVideoResolution(videoPath2);

                        const f1=getFileExtension(videoPath)
                        const f2=getFileExtension(videoPath2)

                        const result ={
                            "taille video (MB) :":t1,
                            "taille video compresse (MB) :":t2,
                            "resolution video ":r1,
                            "resolution video compresse ":r2,
                            "format video:":f1,
                            "format video compressee:":f2,
                            "url video compressee:":"http://localhost:3000/getvid/"+nbfile+".mp4"
                        }


                        //delete video not compressed
                        remove(videoPath, (err) => {
                            if (err) {
                                console.error(`Error deleting file: ${err.message}`);
                            } else {
                                console.log('File deleted successfully');
                            }
                        });


                        res.send(result)


                    }
                });
            })
            .catch((error) => {
                console.error('Error downloading the video:', error);
                res.status(500).send("Internal Server Error");
            });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = route;
