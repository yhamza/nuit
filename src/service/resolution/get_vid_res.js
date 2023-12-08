const ffmpeg = require("fluent-ffmpeg");


function getVideoResolution(videoPath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) {
                reject(`Error reading video metadata: ${err.message}`);
            } else {
                const resolution = {
                    width: metadata.streams[0].width,
                    height: metadata.streams[0].height,
                };
                resolve(resolution);
            }
        });
    });
}


module.exports=getVideoResolution;