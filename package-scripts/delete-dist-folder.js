const fs = require("fs");
const path = require("path");

function deleteFolderRecursive(directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach(file => {
            const currentPath = path.join(directoryPath, file);
            if (fs.lstatSync(currentPath).isDirectory()) {
                deleteFolderRecursive(currentPath);
            } else {
                fs.unlinkSync(currentPath);
            }
        });
        fs.rmdirSync(directoryPath);
    }
}

deleteFolderRecursive("./dist");
