const fs = require('fs');
const path = require('path');

function getFileExtension(filePath) {
    if (fs.existsSync(filePath)) {
        return path.extname(filePath).toLowerCase();
    } else {
        return null; // File doesn't exist
    }
}
  module.exports=getFileExtension
