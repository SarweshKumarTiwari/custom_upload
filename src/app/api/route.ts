import fs from "fs";
import { NextResponse } from "next/server";
export async function GET(){
    return Response.json({any:"ghhgjf fchf"})
}
export async function POST(req:Request){
    if (!req.body) {
        return ;
    }
    
   try {
     const blob=(await req.body.getReader().read()).value!;
     //console.log(req.headers.get("x-content-index"),blob.byteLength)
     await fs.promises.appendFile(`./public/${req.headers.get("x-content-name")}`,blob);
     return NextResponse.json({success:req.headers.get("x-content-index")});
   } catch (error) {
    
   }
}