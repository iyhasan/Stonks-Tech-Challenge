import axios from 'axios';



export default function handler(req, res) {
    
    const { imdbID } = req.query;

    axios.request({
        method: 'GET',
        url: `https://${process.env.API_HOST}`,
        params: {
            i: imdbID,
            r: 'json',
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