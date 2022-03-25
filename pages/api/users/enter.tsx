import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method !== "POST") {
//         res.status(401).end();  //권한 없음 (접속실패). 
//     }
//     console.log(req.body);
//     res.status(200).end();  //전송성공 HTTP 상태코드
// }

async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);
    return res.status(200).end(); //전송성공 HTTP 상태코드
}

export default withHandler("POST", handler);