"use strict";

// Get the requires in order
var config = require('./config');
var SpotifyWebApi = require('spotify-web-api-node');

// Spotify API-object
var spotifyApi = new SpotifyWebApi({
  clientId : config.spotifyClientID,
  clientSecret : config.spotifyClientSecret,
  redirectUri : config.redirectUri,
});

/**
  * Function for sending the user to the auth-page.
  *
  * @return data
  */
function getUserAuth() {
  return new Promise(function(resolve) {
    var scopes = ['user-follow-read'];
    var state = 'some-state-of-my-choice';

    // Create the authorization URL
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

    // https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
    resolve(authorizeURL);
  });
}

/**
  * Function for getting a users access token. Stores it in the spotifyAPI-object
  *
  * @return data
  */
function getUserAccessToken(code) {
  return new Promise(function(resolve) {
    spotifyApi.authorizationCodeGrant(code)
      .then(function(data) {
        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);

        resolve();
      }, function(error) {
        throw error;
      });
  });
}

/**
  * Function for getting the followed artists for an user
  *
  * @return data
  */
function getFollowedArtists() {
  return new Promise(function(resolve) {
    spotifyApi.getFollowedArtists()
      .then(function(data) {
        resolve(data.body);
      }, function(error) {
        throw error;
      });
  });
}

/**
  * Main function that fires of all the rest
  *
  * @return array
  */
function getUsersArtists() {
  return new Promise(function(resolve) {
    getUserAuth()
      // 1. Get user auth
      .then(function(data) {
        return getUserAccessToken(data.code);
      })
      // 2. Get user accessToken
      .then(function(data) {
        return getFollowedArtists();
      })
      // 3. Get users followed artists
      .then(function(data) {
        resolve(data);
      })
      .catch(function(error) {
        throw error;
      });
  });
}

// Functions that are available for outside file use
module.exports.getUsersArtists = getUsersArtists;
