import mail from "@sendgrid/mail";
import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

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


// connectOrCreate - prisma 데이터 모델링 
// ID 또는 고유 식별자로 기존 관련 레코드에 레코드를 연결하거나 
// 레코드가 존재하지 않는 경우 새 관련 레코드를 생성

mail.setApiKey(process.env.SENDGRID_KEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  //console.log(req.body);
  // .upsert() // 수정할때, 생성할때 사용
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";  //<- 랜덤 6 숫자 만들고 문자열로 변환
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  //console.log(token);
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.MY_PHONE!,  //<- 뒤에 ! 붙이는거 확실히 존재하는 변수라고 타입스크립트에 알려주는거
    //   body: `Your login token is ${payload}.`,
    // });
    // console.log(message);
  } else if (email) {
    // const email = await mail.send({
    //   from: "newri0807@gmail.com",
    //   to: "newri0807@gmail.com",
    //   subject: "Your Carrot Market Verification Email",
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
    // console.log(email);
  }
  return res.json({
    ok: true,
  }); //전송성공 HTTP 상태코드 200
}

export default withHandler("POST", handler);