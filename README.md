# File Uploading

This project is about uploading large files from client.

## Uploading via chunks

In this method , A file is divided into multiple chunks and then uploaded one by one by using blob.slice().
``` javascript
Blob.slice(begin,end) // this returns a blob of given size
```

## handling upload

When chunks are send with request then we append the incoming chunks in a file.
```javascript
fs.promises.appendFile(filePath,blob) //appends chunk to initialized file
```

## Initializing
```bash
git clone https://github.com/SarweshKumarTiwari/custom_upload.git
```
Install dependencies

```bash
npm install
```