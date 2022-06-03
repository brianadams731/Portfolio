import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(!req.body.name || !req.body.email || !req.body.message || req.method !== "POST" || !process.env.FORM_KEY){
        return res.status(400).send("Error: Malformed Request")
    }
    
    const messageRes = await fetch(process.env.FORM_KEY, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: req.body.email,
            name: req.body.name,
            message: req.body.message
        }),
    })
    
    res.status(messageRes.status).send(messageRes.body);
}