var Spotify = require('node-spotify-api');
var request = require('request');
// request('http://www.google.com', function (error, response, body) {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });
var moment = require('moment');
var dotenv = require('dotenv').config;
var bands = require('bandsintown');
//var spotify = new Spotify(keys.spotify);


var a = process.argv[2];
var b = process.argv[3];

var omdb = "http://www.omdbapi.com/?apikey=trilogy&";
var bit = "https://rest.bandsintown.com/artists/" + b + "/events?app_id=codingbootcamp";
var spotify = new Spotify({
  id: "f11d8b254cc94fb68c347ba592b526b5",
  secret: "756a96e36df24d6584821f3daac1bcfc"
});

if (a === "concert-this") {
  request(bit, function(err, res) {
    if (err) throw err;
    var data = JSON.parse(res.body);
    console.log(data[0].venue.name);
    console.log(data[0].venue.city + ", " + data[0].venue.country);
    console.log(moment(data[0].datetime).format("L"));
  });
};
if (!process.argv[3]) {
      b = "Ace of Base";
    }
if (a === "spotify-this-song") {

  spotify.search({ type: 'track', query: b }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    
    console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);
  });
}

var queryUrl = "http://www.omdbapi.com/?t=" + b + "&y=&plot=short&apikey=trilogy";
if (!process.argv[3]) {
  queryUrl = "http://www.omdbapi.com/?t=" + "Mr.Nobody" + "&y=&plot=short&apikey=trilogy";
}
if (a === "movie-this") {
  request(queryUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      var jsonData = JSON.parse(body);

      console.log("Title: " + jsonData.Title);
      console.log("Released: " + jsonData.Year);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
      console.log("Produced In: " + jsonData.Country);
      console.log("Language(s): " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
    }
  });
};


