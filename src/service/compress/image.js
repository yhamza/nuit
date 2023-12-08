const sharp = require('sharp');
const fs = require('fs');

async function compressImage(inputPath, outputPath, quality) {
    try {
        // Read the image file
        const inputBuffer = await fs.promises.readFile(inputPath);

        // Compress and save the image in WebP format
        await sharp(inputBuffer)
            .webp({ quality })
            .toFile(outputPath);

        console.log(`Image compressed and saved to: ${outputPath}`);





    } catch (error) {
        console.error('Error compressing image:', error.message);
        throw error;
    }
}


module.exports=compressImage;