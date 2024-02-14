"use client";

import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [first, setfirst] = useState<File | null>(null);
  const chunkSize = 10000;
  async function sendNext() {
    if (!first) return;
    const chunksQuantity = Math.ceil((first.size) / chunkSize);
    const newArr = new Array(chunksQuantity).fill(0).map((_, i) => i).reverse();
    const length = newArr.length;
    while (newArr.length) {
      const index = newArr.pop()!;
      console.log(index)
      const begin = index * chunkSize;
      const chunk = first.slice(begin, begin + chunkSize);
      try {
        const {data}=await axios({
          method: "post",
          url: "/api",
          data: chunk,
          headers: {
            "Content-Type": "application/octete-stream",
            "X-Content-Length": first.size,
            "X-Content-Name": first.name,
            "X-Content-Total-Chunk": length - 1,
            "X-Content-Index": index
          }
        })
        console.log(data.success);
      }
      catch (error) {
        newArr.push(index)
      }
    }
  }
  return (
    <div>
      <input type="file" name="f" id="f" onChange={e => setfirst(e.target.files![0])} />
      <button className="border-[1px] border-gray-700" onClick={sendNext}>submit</button>
    </div>
  );
}
