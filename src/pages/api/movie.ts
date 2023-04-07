import axios from 'axios';

const sampleData = {
    "Title": "Avengers: Endgame",
    "Year": "2019",
    "Rated": "PG-13",
    "Released": "26 Apr 2019",
    "Runtime": "181 min",
    "Genre": "Action, Adventure, Drama",
    "Director": "Anthony Russo, Joe Russo",
    "Writer": "Christopher Markus, Stephen McFeely, Stan Lee",
    "Actors": "Robert Downey Jr., Chris Evans, Mark Ruffalo",
    "Plot": "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    "Language": "English, Japanese, Xhosa, German",
    "Country": "United States",
    "Awards": "Nominated for 1 Oscar. 70 wins & 133 nominations total",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
    "Ratings": [
      {
        "Source": "Internet Movie Database",
        "Value": "8.4/10"
      },
      {
        "Source": "Metacritic",
        "Value": "78/100"
      }
    ],
    "Metascore": "78",
    "imdbRating": "8.4",
    "imdbVotes": "1,162,856",
    "imdbID": "tt4154796",
    "Type": "movie",
    "DVD": "30 Jul 2019",
    "BoxOffice": "$858,373,000",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
  }

export default function handler(req, res) {
    
    const { imdbID } = req.query;

    // // TODO: Remove
    // res.status(200).json(sampleData);

    // return;

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