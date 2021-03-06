var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var fs = require('fs');

var a = process.argv[2];
var b = process.argv[3];

var bit = "https://rest.bandsintown.com/artists/" + b + "/events?app_id=codingbootcamp";
var spotify = new Spotify({
  id: "f11d8b254cc94fb68c347ba592b526b5",
  secret: "756a96e36df24d6584821f3daac1bcfc"
});

if (a === "concert-this") {
  request(bit, function (err, res) {
    if (err) throw err;
    var data = JSON.parse(res.body);
    console.log("-----------------------------------------------");
    console.log("Venue: " + data[0].venue.name);
    console.log("Location: " + data[0].venue.city + ", " + data[0].venue.country);
    console.log("Date: " + moment(data[0].datetime).format("L"));
    console.log("-----------------------------------------------");
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
    console.log("-----------------------------------------------");
    console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
    console.log("Song: " + data.tracks.items[0].name);
    console.log("Sample Listen: " + data.tracks.items[0].preview_url);
    console.log("Album: " + data.tracks.items[0].album.name);
    console.log("-----------------------------------------------");
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
      console.log("-----------------------------------------------");
      console.log("Title: " + jsonData.Title);
      console.log("Released: " + jsonData.Year);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
      console.log("Produced In: " + jsonData.Country);
      console.log("Language(s): " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("-----------------------------------------------");
    }
  });
};

if (a === "do-what-it-says") {
  fs.readFile('random.txt', 'utf8', (err, data) => {
    if (err) throw err;
    var dataArr = data.split(',');
    if (!dataArr[1]) {
      dataArr[1] = "Ace of Base";
    }
    else if (dataArr[0] === "spotify-this-song") {
      spotify.search({ type: 'track', query: dataArr[1] }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log("-----------------------------------------------");
        console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Sample Listen: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("-----------------------------------------------");
      });
    }

    //Below: movie-this and concert-this are not working for random.txt

    var queryUrl = "http://www.omdbapi.com/?t=" + b + "&y=&plot=short&apikey=trilogy";
    if (!dataArr[1]) {
      queryUrl = "http://www.omdbapi.com/?t=" + "Mr.Nobody" + "&y=&plot=short&apikey=trilogy";
    }
    if (dataArr[0] === "movie-this") {
      request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {

          var jsonData = JSON.parse(body);
          console.log("-----------------------------------------------");
          console.log("Title: " + jsonData.Title);
          console.log("Released: " + jsonData.Year);
          console.log("IMDB Rating: " + jsonData.imdbRating);
          console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
          console.log("Produced In: " + jsonData.Country);
          console.log("Language(s): " + jsonData.Language);
          console.log("Plot: " + jsonData.Plot);
          console.log("Actors: " + jsonData.Actors);
          console.log("-----------------------------------------------");
        }
      });
    };
    if (dataArr[0] === "concert-this") {
      request("https://rest.bandsintown.com/artists/" + dataArr[1] + "/events?app_id=codingbootcamp", function (err, res) {
        if (err) throw err;
        var data = JSON.parse(res.body);
        console.log("-----------------------------------------------");
        console.log("Venue: " + data[0].venue.name);
        console.log("Location: " + data[0].venue.city + ", " + data[0].venue.country);
        console.log("Date: " + moment(data[0].datetime).format("L"));
        console.log("-----------------------------------------------");
      });
    };
  });
};