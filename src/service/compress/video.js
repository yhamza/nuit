// const ffmpeg = require('fluent-ffmpeg');
// const path = require('path');
// const fs = require('fs');
//
// function compressVideo(videoPath = null, videoQuality = 'medium', callback) {
//     try {
//         if (!videoPath) {
//             throw new Error('Video path is not provided.');
//         }
//
//         const videoAbsPath = path.resolve(videoPath);
//         const originalFileName = path.basename(videoAbsPath, path.extname(videoAbsPath));
//         const destFolder = path.resolve(path.dirname(videoAbsPath), 'compressed_videos');
//
//         // Create the destination folder if it doesn't exist
//         if (!fs.existsSync(destFolder)) {
//             fs.mkdirSync(destFolder, { recursive: true });
//         }
//
//         const destFileName = path.join(destFolder, `${originalFileName}_compressed.mp4`);
//
//         console.log(videoAbsPath)
//         ffmpeg(videoAbsPath)
//             .setFfmpegPath('C:\\\\Users\\\\Administrator\\\\AppData\\\\Local\\\\Microsoft\\\\WinGet\\\\Packages\\\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\\\ffmpeg-6.1-full_build\\\\bin\\\\ffmpeg.exe')
//             .outputOptions([
//                 '-c:v', 'libx264',
//                 '-crf', '23',
//                 '-preset', videoQuality
//             ])
//             .on('end', () => {
//                 const originalSize = fs.statSync(videoAbsPath).size;
//                 const compressedSize = fs.statSync(destFileName).size;
//                 callback(null, { originalSize, compressedSize });
//             })
//             .on('error', (error) => {
//                 callback(error, null);
//             })
//             .saveToFile(destFileName);
//     } catch (error) {
//         callback(error, null);
//     }
// }
//
// module.exports = compressVideo;

const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

function compressAndSaveVideo(inputPath, outputDirectory, videoQuality = 'medium', callback) {
    try {
        // Vérifier si le fichier vidéo d'entrée existe
        if (!fs.existsSync(inputPath)) {
            throw new Error('Le fichier vidéo d\'entrée n\'existe pas.');
        }

        // Créer le chemin absolu du fichier d'entrée
        const absoluteInputPath = path.resolve(inputPath);

        // Extraire le nom du fichier et le répertoire parent
        const originalFileName = path.basename(absoluteInputPath, path.extname(absoluteInputPath));
        const parentDirectory = path.dirname(absoluteInputPath);

        // Créer le dossier de destination s'il n'existe pas
        const absoluteOutputDirectory = path.resolve(outputDirectory);
        if (!fs.existsSync(absoluteOutputDirectory)) {
            fs.mkdirSync(absoluteOutputDirectory, { recursive: true });
        }

        // Construire le chemin du fichier de sortie
        const absoluteOutputPath = path.join(absoluteOutputDirectory, `${originalFileName}.mp4`);

        // Utiliser fluent-ffmpeg pour compresser la vidéo
        ffmpeg(absoluteInputPath)
            .output(absoluteOutputPath)
            .outputOptions([
                '-c:v', 'libx264',
                '-crf', '23',
                '-preset', videoQuality
            ])
            .on('end', () => {
                const originalSize = fs.statSync(absoluteInputPath).size;
                const compressedSize = fs.statSync(absoluteOutputPath).size;
                callback(null);
            })
            .on('error', (error) => {
                callback(error, null);
            })
            .run();
    } catch (error) {
        callback(error, null);
    }
}

module.exports=compressAndSaveVideo
