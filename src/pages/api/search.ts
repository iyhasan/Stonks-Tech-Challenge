import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    
    const { s } = req.query


    axios.request({
        method: 'GET',
        url: `https://${process.env.API_HOST}`,
        params: {
            s: s ? s : '',
            r: 'json',
            page: '1'
        },
        headers: {
            'X-RapidAPI-Key': `${process.env.API_KEY}`,
            'X-RapidAPI-Host': `${process.env.API_HOST}`,
        }
    })
    .then((resp) => {
        console.log(resp.data)
        res.status(200).json(resp.data)
    })
    .catch((err) => {
        res.status(500).json({
            error: 'failed to load data'
        })
    })
}