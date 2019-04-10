import { getFileList, statAsync } from "./utils";
import { Router } from "express";
import bodyparser from "body-parser";
import { exec } from "child_process";
import multer from "multer";
import path from "path";
import serverConfig from "./config";
import url from "url";
import webpackConfig from "./../webpack.config.babel";

const urlencodedParser = bodyparser.urlencoded({ extended: true });
const isProduction = process.env.NODE_ENV === "production";
const entryPoint = isProduction ? "/build/" : "http://localhost:8080/";

// file upload configuration
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, serverConfig.uploads);
  },
  filename: (request, file, callback) => {
    let filename = file.originalname;
    if (file.mimetype.match("video/.*")) filename = `${filename}.mp4`;
    console.info(`UPLOADING FILE... ${filename}`);
    callback(null, filename);
  }
});
const upload = multer({
  storage,
  onFileUploadComplete: () => {
    console.log(finish);
  }
});

var fs = require("fs");
var encryptor = require("file-encryptor");

// Routes
const router = new Router();
router.get("/", (req, res) => {
  res.render("index", {
    bundle: url.resolve(entryPoint, webpackConfig.output.filename),
    title: "PiZilla"
  });
});

router.post("/upload", upload.any(), (req, res) => {
  console.log(req.body.private);
  if (req.body.private != "false") {
    encryptor.encryptFile(
      req.files[0].path,
      req.files[0].path + ".dat",
      req.body.password,
      err => {
        // Encryption complete.remove original file
        fs.unlink(req.files[0].path, () => {
          return res.status(200).send(req.files);
        });
      }
    );
  } else {
    return res.status(200).send(req.files);
  }
});

router.get("/download", async (req, res) => {
  if (!req.query.path) res.end();
  else {
    const filePath = path.resolve(req.query.path);
    console.log(req.query.pass);
    if (req.query.path.substr(-4) == ".dat") {
      try {
        encryptor.decryptFile(
          filePath,
          filePath.substr(0, filePath.length - 4),
          req.query.pass || "test",
          err => {
            console.log(err);
            if (err) {
              res.send("Wrong Password");
            } else {
              res.download(
                filePath.substr(0, filePath.length - 4),
                req.param("file"),
                () => {
                  fs.unlink(filePath.substr(0, filePath.length - 4), err => {
                    console.log(err);
                  });
                }
              );
            }
          }
        );
      } catch (err) {
        res.send(false);
      }
    } else {
      res.download(filePath);
    }
    // const isFile = await statAsync(filePath).isFile();
  }
});

// router.get("/download", async (req, res) => {
//   if (!req.query.path) res.end();
//   else {
//     const filePath = path.resolve(req.query.path);
//
//   }
// });

router.get("/files", async (req, res) => {
  let curDir = serverConfig.uploads;
  const query = req.query.path || "";
  if (query) curDir = path.resolve(query);
  const files = await getFileList(curDir);
  if (files === null) res.json({ error: `Access denied: ${curDir}` }).end(403);
  else res.json(files);
});

router.get("/pifire", (_, res) => {
  res.render("pifire");
});

router.post("/pifire", urlencodedParser, (req, res) => {
  const response = {
    selection_radio: req.body.group1,
    url_input: req.body.url
  };
  const url = response.url_input;
  const file = "/home/vinay/Desktop/PiZilla/uploads/";
  let type = "";

  if (response.selection_radio === "music") {
    type = "-f 140";
  }

  exec(
    `youtube-dl ${type} --no-check-certificate ` +
      "-c --audio-quality 0 --restrict-filenames --no-warnings " +
      `--no-check-certificate -o ${file}'%(title)s.%(ext)s' ` +
      `"${url}"`,
    error => {
      if (error) console.error(error);
      else
        exec(
          `youtube-dl ${type} --no-check-certificate ` +
            "-c --recode-video mp4 --restrict-filenames" +
            ` --no-warnings -o ${file}'%(title)s.%(ext)s' "${url}"`,
          error => {
            if (error) console.error(error);
          }
        );
    }
  );

  res.redirect("/pifire");
});

export default router;
