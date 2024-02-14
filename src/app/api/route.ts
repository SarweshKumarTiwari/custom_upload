import fs from "fs";
import { NextResponse } from "next/server";
export async function GET(){
    return Response.json({any:"ghhgjf fchf"})
}
export async function POST(req:Request){
    if (!req.body) {
        return ;
    }
    
    const blob=(await req.body.getReader().read()).value!;
    //console.log(req.headers.get("x-content-index"),blob.byteLength)
    fs.promises.appendFile("./public/update.mp4",blob);
    return NextResponse.json({success:req.headers.get("x-content-index")});
}