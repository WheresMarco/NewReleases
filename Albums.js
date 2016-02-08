"use strict";

// Get the requires in order
var http = require("http");
var config = require('./config');

/**
  * Get an artist_id that can be used with getAlbums()
  *
  * @param string artist
  * @return int artist_id
  */
function getArtistID(artist, callback) {
  var options = {
    hostname: 'api.musixmatch.com',
    port: 80,
    path: '/ws/1.1/artist.search?q_artist=' + artist + '&page_size=1&apikey=' + config.musixmatchAPI,
    method: 'GET'
  };

  var request = http.request(options, (result) => {
    result.setEncoding('utf8');

    var body = "";

    result.on('data', (chunk) => {
      body += chunk;
    });

    result.on('end', () => {
      callback(null, JSON.parse(body));
    });
  });

  request.on('error', (error) => {
    console.log(`problem with request: ${error.message}`);
  });

  request.end();
}

/**
  * Get albums that an artist have made.
  *
  * @param int artistID
  * @return array
  */
function getAlbums(artistID, callback) {
  var options = {
    hostname: 'api.musixmatch.com',
    port: 80,
    path: '/ws/1.1/artist.albums.get?artist_id=' + artistID + '&s_release_date=desc&g_album_name=1&apikey=' + config.musixmatchAPI,
    method: 'GET'
  };

  var request = http.request(options, (result) => {
    result.setEncoding('utf8');

    var body = "";

    result.on('data', (chunk) => {
      body += chunk;
    });

    result.on('end', () => {
      callback(null, JSON.parse(body));
    });
  });

  request.on('error', (error) => {
    console.log(`problem with request: ${error.message}`);
  });

  request.end();
}

// Functions that are available for outside file use
module.exports.getAlbums = getAlbums;
module.exports.getArtistID = getArtistID;
