"use strict";

var Albums = require("./Albums");
var Spotify = require("./Spotify");

Albums.getArtistID("hellogoodbye")
  .then(function(data) {
    var artistID = data.message.body.artist_list[0].artist.artist_id;
    return Albums.getAlbums(artistID);
  })
  .then(function(data) {
    console.log(data.message.body.album_list[0].album);
  })
  .catch(function(error) {
    console.log(error);
  });
