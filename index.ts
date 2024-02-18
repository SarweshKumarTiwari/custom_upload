import express from "express";
import parser from "body-parser";
import fs from "fs";

const app=express();
const PORT=3000;

app.use(express.static("./public"));
app.use(parser.raw({type:"*/*",limit:"3mb"}))
app.post('/upload',async (req,res)=>{
    if (!req.body) {
        return res.status(400).json({error:"bad request"});
    }
    const totalChunks=Number(req.headers["x-total-chunks"]);
    const chunkIndex=Number(req.headers["x-chunk-index"]);
    const fileName=req.headers["x-file-name"];
    if (!fs.existsSync('./public/temp')) {
        fs.mkdirSync('./public/temp');
    }
    const filePath=`./public/temp/${fileName}`;
    await fs.promises.appendFile(filePath,req.body);
    if (chunkIndex===totalChunks-1) {
        return res.status(200).json({success:"uploaded successfully"})
    }
    res.status(200).json({success:"ok"});
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})