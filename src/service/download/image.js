const axios = require("axios");
const fs = require("fs");

async function downloadImage(url, localPath) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        if (/*response.headers['content-type'].startsWith('image')*/true) {
            // Save the image to the local filesystem
            fs.writeFileSync(localPath, Buffer.from(response.data, 'binary'));
            console.log('Image downloaded successfully.');
        } else {
            console.error('The provided URL does not point to an image.');
        }
    } catch (error) {
        console.error('Error downloading the image:', error.message);
        throw error;
    }
}

module.exports = downloadImage;
