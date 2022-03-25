import { NextApiRequest, NextApiResponse } from "next";

export default function withHandler(
    method: "GET" | "POST" | "DELETE",
    fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
    return async function (req: NextApiRequest, res: NextApiResponse) {

        //// 함수가 또 다른 함수를 리턴하는 구조 -- 고차함수
        if (req.method !== method) {
            return res.status(405).end();  //bad request code 
        }
        try {
            await fn(req, res);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };
} 