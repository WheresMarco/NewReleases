"use strict";

var http = require("http");
var config = require('./config');

function getArtistID(callback) {
  // TEMP ARTIST
  var artist = "hellogoodbye";

  var options = {
    hostname: 'api.musixmatch.com',
    port: 80,
    path: '/ws/1.1/artist.search?q_artist=' + artist + '&page_size=1&apikey=' + config.musixmatchAPI,
    method: 'GET'
  };

  var request = http.request(options, (result) => {
    result.setEncoding('utf8');

    var resultData = "";

    result.on('data', (chunk) => {
      resultData += chunk;
    });

    result.on('end', () => {
      console.log(resultData);
    });
  });

  request.on('error', (error) => {
    console.log(`problem with request: ${error.message}`);
  });

  request.end();
}

function getAlbums(callback) {
  var options = {
    hostname: 'api.musixmatch.com',
    port: 80,
    path: '/ws/1.1/artist.albums.get?artist_id=1039&s_release_date=desc&g_album_name=1&apikey=' + config.musixmatchAPI,
    method: 'GET'
  };

  var request = http.request(options, (result) => {
    result.setEncoding('utf8');

    var resultData = "";

    result.on('data', (chunk) => {
      resultData += chunk;
    });

    result.on('end', () => {
      console.log(resultData);
    });
  });

  request.on('error', (error) => {
    console.log(`problem with request: ${error.message}`);
  });

  request.end();
}

module.exports.getAlbums = getAlbums;
module.exports.getArtistID = getArtistID;
