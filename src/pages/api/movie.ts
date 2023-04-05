import axios from 'axios';

const sampleData = {
    "Title": "The Big Lebowski",
    "Year": "1998",
    "Rated": "R",
    "Released": "06 Mar 1998",
    "Runtime": "117 min",
    "Genre": "Comedy, Crime",
    "Director": "Joel Coen, Ethan Coen",
    "Writer": "Ethan Coen, Joel Coen",
    "Actors": "Jeff Bridges, John Goodman, Julianne Moore",
    "Plot": "Ultimate L.A. slacker Jeff \"The Dude\" Lebowski, mistaken for a millionaire of the same name, seeks restitution for a rug ruined by debt collectors, enlisting his bowling buddies for help while trying to find the millionaire's miss...",
    "Language": "English, German, Hebrew, Spanish",
    "Country": "United States, United Kingdom",
    "Awards": "5 wins & 18 nominations",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_SX300.jpg",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.1/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "79%"
      },
      {
        "Source": "Metacritic",
        "Value": "71/100"
      }
    ],
    "Metascore": "71",
    "imdbRating": "8.1",
    "imdbVotes": "820,032",
    "imdbID": "tt0118715",
    "Type": "movie",
    "DVD": "18 Oct 2005",
    "BoxOffice": "$18,254,458",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
  }

export default function handler(req, res) {
    
    const { imdbID } = req.query;

    res.status(200).json(sampleData);

    // axios.request({
    //     method: 'GET',
    //     url: `https://${process.env.API_HOST}`,
    //     params: {
    //         i: imdbID,
    //         r: 'json',
    //     },
    //     headers: {
    //         'X-RapidAPI-Key': `${process.env.API_KEY}`,
    //         'X-RapidAPI-Host': `${process.env.API_HOST}`,
    //     }
    // })
    // .then((resp) => {
    //     console.log(resp.data)
    //     res.status(200).json(resp.data)
    // })
    // .catch((err) => {
    //     res.status(500).json({
    //         error: 'failed to load data'
    //     })
    // })
}