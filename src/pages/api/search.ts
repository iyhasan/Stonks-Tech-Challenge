import axios from 'axios';

const sampleResponse = {
    Search: [
      {
        Title: 'The Big Lebowski',
        Year: '1998',
        imdbID: 'tt0118715',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_SX300.jpg'
      },
      {
        Title: 'The Big Lebowski 2',
        Year: '2011',
        imdbID: 'tt1879064',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/MV5BNTEwMmQ1MGQtZTQ0My00ODc3LWI3OWEtNjk5N2NhYjczZTY5L2ltYWdlXkEyXkFqcGdeQXVyNjg3MTUzMzY@._V1_SX300.jpg'
      },
      {
        Title: 'The Achievers: The Story of the Lebowski Fans',
        Year: '2009',
        imdbID: 'tt1276475',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMTU2Mzg1MDQwMV5BMl5BanBnXkFtZTcwNDU1Njk3Mg@@._V1_SX300.jpg'
      },
      {
        Title: "The Making of 'The Big Lebowski'",
        Year: '1998',
        imdbID: 'tt0391320',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMTcwODFlMzQtMmU3OC00Nzk0LWJlNmUtMmQ2YTg2Nzg1OGIyXkEyXkFqcGdeQXVyODEwNjkxNDE@._V1_SX300.jpg'
      },
      {
        Title: "Big Lebowski: Jeff Bridges' Photography",
        Year: '2005',
        imdbID: 'tt0824662',
        Type: 'movie',
        Poster: 'N/A'
      },
      {
        Title: 'Lebowski, My Czech Wife and Me',
        Year: '2009',
        imdbID: 'tt1467362',
        Type: 'movie',
        Poster: 'N/A'
      },
      {
        Title: 'The Big Lebowski Live Cast Reunion',
        Year: '2011',
        imdbID: 'tt3265918',
        Type: 'movie',
        Poster: 'N/A'
      },
      {
        Title: 'The Big Lebowski Renactment',
        Year: '2015',
        imdbID: 'tt5021088',
        Type: 'movie',
        Poster: 'N/A'
      },
      {
        Title: 'The Big Lebowski (II)',
        Year: '2016',
        imdbID: 'tt8632716',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/MV5BYzA2OTgxZmQtNmIxNy00NjY5LWI0NGYtNzZkZmE3MmY1Y2I1XkEyXkFqcGdeQXVyNjc0Mzc3ODE@._V1_SX300.jpg'
      },
      {
        Title: 'The Big Lebowski (1998) - Coen Brolympics',
        Year: '1998',
        imdbID: 'tt15337920',
        Type: 'movie',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMDgzZTNhOWUtNGRmZi00Mjg3LTlmMmMtMjkyZjJmMmVmNGIzXkEyXkFqcGdeQXVyNzYzMTgwMw@@._V1_SX300.jpg'
      }
    ],
    totalResults: '10',
    Response: 'True'
}

export default function handler(req, res) {
    
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