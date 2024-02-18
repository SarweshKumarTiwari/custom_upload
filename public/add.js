document.getElementById("check").addEventListener('click',async ()=>{
    const file=document.getElementById("file").files[0];
    if (file===undefined) {
        return;
    }
    await chunkUpload(file);
})

async function chunkUpload(file) {
    const chunkSize=2*1024*1024;
    const chunksQuantity=Math.ceil(file.size/chunkSize);
    const totalChunks=new Array(chunksQuantity).fill(0).map((_,i)=>i).reverse();
    const total=totalChunks.length;
    while(totalChunks.length){
        const index=totalChunks.pop();
        try {
            const begin=index*chunkSize;
            const chunk=file.slice(begin,begin+chunkSize);
            console.log(chunk);
            const headers=new Headers();
            headers.append("X-Chunk-Index",index);
            headers.append("X-File-Name",file.name);
            headers.append("X-Total-Chunks",total);
            headers.append("Content-Type","application/json")
            const result=await(await fetch('/upload',{
                method:"POST",
                body:chunk,
                headers:headers
            })).json();
            console.log(result);
        } catch (error) {
            totalChunks.push(index);
            console.log(error);
        }
    }
}