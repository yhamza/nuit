const fs = require('fs');

function getSizeInMegabytes(videoPath) {
    return  new Promise((resolve, reject) => {
        fs.stat(videoPath,  (err, stats) => {
            if (err) {
                reject(`Erreur lors de la récupération des informations sur le fichier : ${err.message}`);
            } else {
                const fileSizeInBytes = stats.size;
                const fileSizeInKilobytes = fileSizeInBytes / 1024;
                const fileSizeInMegabytes = fileSizeInKilobytes / 1024;
                resolve(fileSizeInMegabytes)
            }
        });
    });
}




module.exports=getSizeInMegabytes;