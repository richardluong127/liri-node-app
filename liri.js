var spotify = require('node-spotify-api');
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

var omdb = "http://www.omdbapi.com/?apikey=[yourkey]&";
var bit = "https://rest.bandsintown.com/artists/" + b + "/events?app_id=codingbootcamp";

if (a === "concert-this") {
  request(bit, function(err, res) {
    if (err) throw err;
    var data = JSON.parse(res.body);
    console.log(data[0].venue.name);
    console.log(data[0].venue.city + ", " + data[0].venue.country);
    //console.log(data[0].datetime);
    console.log(moment(data[0].datetime).format("L"));
  });
};

if (a=== "spotify-this-song") {
  request(spotify, function (err, res) {
  if (err) throw err;
  console.log(res);
  })
}

//var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";