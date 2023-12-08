const fs=require('fs')
function del(filePath)
{
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
        } else {
            console.log('File deleted successfully');
        }
    });
}

module.exports=del