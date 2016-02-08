"use strict";

var Albums = require("./Albums");

Albums.getArtistID("hellogoodbye", function(error, result) {
  var artistID = result.message.body.artist_list[0].artist.artist_id;

  Albums.getAlbums(artistID, function(error, result) {
    console.dir(result.message.body.album_list[0].album);
  });
});
