const express = require('express');
const route = express.Router();



route.use(express.json());


route.use(require('../service/url/image'))
const bodyParser = require('body-parser');
const fs = require('fs');
const imageSize = require('image-size');
const { URL } = require('url');

route.use(bodyParser.json());

//services
const downloadImage = require('../service/download/image.js');
const compresser = require('../service/compress/image.js')


//functions
function deleteImage(filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(filePath);
            }
        });
    });
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function extension(url){
    try {
        const pathName = new URL(url).pathname;
        const extension = pathName.match(/\.([^.]+)$/)[1];
        return extension
    } catch (error) {
        console.error('Error extracting file extension:', error.message);
    }
}



route.post('/image', async (req, res) => {
    // Open a file stream

    try {
        const url = req.body.url;
        if (!url) {
            return res.status(400).send("Cannot get image ");
        }


        const nbfile = Number(new Date());
        const imagePath = `C:\\Users\\Administrator\\WebstormProjects\\finalimg\\src\\source\\${nbfile}.${extension(url)}`;
        const imagePath2=`C:\\Users\\Administrator\\WebstormProjects\\finalimg\\src\\compressed_img\\${nbfile}.webp`;
        const compressionQuality = 10;


        downloadImage(url, imagePath)
            .then(async () => {
                console.log("Download done");

                //compress image
                await compresser(imagePath, imagePath2, compressionQuality)

                await sleep(3000);


                const dimension1=imageSize(imagePath)
                const dimension2=imageSize(imagePath2)
                const t1=fs.statSync(imagePath).size/1024
                const t2=fs.statSync(imagePath2).size/1024

                const result={
                    "taille image (Ko) :":t1,
                    "taille image compressee (Ko): ":t2,
                    "resolution image: ":dimension1.width+"*"+dimension1.height,
                    "resolution image compressee: ":dimension1.width+"*"+dimension2.height,
                    "url d'image compressee:":"http://localhost:3000/get/"+nbfile+".webp"
                }
                res.send(result)

                //delete not compressed image
                await deleteImage(imagePath)




            })
            .catch((error) => {
                    console.error('Error downloading the image:', error);
                    res.status(500).send("Internal Server Error");
                }
            )
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send("Internal Server Error");
    }

})













module.exports=route;