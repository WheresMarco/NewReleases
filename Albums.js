"use strict";

var http = require("http");

let apiKey = "";

function getArtistID(callback) {

}

function getAlbums(callback) {
  var options = {
    hostname: 'api.musixmatch.com/ws/1.1',
    port: 80,
    path: '/artist.albums.get?artist_id=1039&s_release_date=desc&g_album_name=1&apikey=' + apiKey,
    method: 'GET'
  };

  var request = http.request(options, (result) => {
    //console.log(`STATUS: ${result.statusCode}`);
    //console.log(`HEADERS: ${JSON.stringify(result.headers)}`);

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
