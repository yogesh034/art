import formidable from "formidable";
import fs from "fs";
const extract = require('extract-zip');


export const config = {
    api: {
        bodyParser: false
    }
};

const post = async(req, res) => {
    const form = new formidable.IncomingForm();
    console.log('form', form)
    console.log('req.body', req.body)
    form.parse(req, async function(err, fields, files) {
        console.log('files', files)
        console.log('err', err)

        await saveFile(files.file);
        
        try {
            await extract(`./public/avatars1.zip`, { dir: `E:/qolaba/genrative-art/art/public` });
            console.log('Extraction complete')
          } catch (err) {
            // handle any errors
            console.log('err', err)
          }
        return res.status(201).send("test msg");
    });
};

const saveFile = async(file) => {
    console.log('file data', file.filepath)
    console.log('file originalFilename', file.originalFilename)
    const data = fs.readFileSync(file.filepath);
    console.log('data', data)
    fs.writeFileSync(`./public/${file.originalFilename}`, data);
    await fs.unlinkSync(file.filepath);
    return;
};

export default (req, res) => {
    req.method === "POST" ?
        post(req, res) :
        req.method === "PUT" ?
        console.log("PUT") :
        req.method === "DELETE" ?
        console.log("DELETE") :
        req.method === "GET" ?
        console.log("GET") :
        res.status(404).send("test");
};