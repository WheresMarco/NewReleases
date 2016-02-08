"use strict";

var http = require("http");
var Albums = require("./Albums");
var Spotify = require("./Spotify");

// Create the webserver
http.createServer(function(request, response) {
  response.writeHeader(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin' : '*'});
  response.end("A page here, please.");

}).listen(3000, '127.0.0.1');

// Console info
console.log("Server running at http://127.0.0.1:3000");


// Albums.getArtistID("hellogoodbye")
//   .then(function(data) {
//     var artistID = data.message.body.artist_list[0].artist.artist_id;
//     return Albums.getAlbums(artistID);
//   })
//   .then(function(data) {
//     console.log(data.message.body.album_list[0].album);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });

// Spotify.getUsersArtists()
//   .then(function(data) {
//     console.log(data);
//   });
