# liri-node-app

This app will allow users to access various information from different databases using node command line arguments.
Here's how to use it:

1. Open liri.js in terminal.
2. Run the following command (without the brackets):

node .\liri.js [input which action you'd like liri to perform] [input your specific parameter]

Here are some things liri can do:

Search upcoming concert venue information for a specific artist.
node .\liri.js concert-this [insert name of artist]

Search a song and find it's artist and album information as well as sample hearing.
node .\liri.js spotify-this-song [insert name of song]

Search a movie and find out actors, plot, ratings and other information.
node .\liri.js movie-this [insert name of movie]

Input text into random.txt file and Liri will run the information for you as well.
node .\liri.js do-what-it-says

Here's an example of what to expect:

![Image of Liri Node App](https://richardluong127.github.io/liri-node-app/LiriExample.png)
