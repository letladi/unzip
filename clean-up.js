const fs = require('fs');
const path = require('path');

const zipFilePath = path.join(__dirname, 'node_modules.zip');
const extractedFolderPath = path.join(__dirname, 'extracted_node_modules');

(async () => {
  try {
    if (fs.existsSync(zipFilePath)) {
      fs.unlinkSync(zipFilePath);
      console.log(`Removed ${zipFilePath}`);
    }
    if (fs.existsSync(extractedFolderPath)) {
      fs.rmSync(extractedFolderPath, { recursive: true, force: true });
      console.log(`Removed ${extractedFolderPath}`);
    }
  } catch (err) {
    console.error('Error during cleanup:', err);
  }
})();
