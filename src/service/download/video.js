const axios = require("axios");
const fs = require("fs");

async function downloadVideo(url, localPath) {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });

        // Assuming the response headers contain the appropriate check for video content type
        if (/* Check for video content type, e.g., response.headers['content-type'].startsWith('video') */ true) {
            // Save the video to the local filesystem
            fs.writeFileSync(localPath, Buffer.from(response.data, 'binary'));
            console.log('Video downloaded successfully.');
        } else {
            console.error('The provided URL does not point to a video.');
        }
    } catch (error) {
        console.error('Error downloading the video:', error.message);
        throw error;
    }
}

module.exports = downloadVideo;