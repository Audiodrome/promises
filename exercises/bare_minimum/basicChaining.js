/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('request');


var fetchProfileAndWriteToFile = function (readFilePath, writeFilePath) {
  // TODO

  var promise = new Promise((resolve, reject) => {
    fs.readFile(readFilePath, 'utf8', (err, content) => {

      if (err) {
        reject(err);
      } else {
        var lines = content.split('\n');
        var githubUser = 'https://api.github.com/users/' + lines[0];
        request(githubUser, function (error, response, body) {
          console.log(body);
          if (error) {
            reject(error);
          } else {
            // return body;
            fs.writeFile(writeFilePath, body, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          }
        });
      }
    });
  });

  return promise;
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

// var fs = require('fs');
// var Promise = require('bluebird');
// var pluckFirstLineFromFileAsync = require('./promiseConstructor').pluckFirstLineFromFileAsync;
// var getGitHubProfileAsync = require('./promisification').getGitHubProfileAsync;


// var fileWriter = function(writeFilePath, profile, callback) {
//   fs.writeFile(writeFilePath, JSON.stringify(profile), 'utf8', function(err, file) {
//     if (err) {
//       return callback(err, null);
//     }
//     callback(null, profile);
//   });
// };

// var fileWriterAsync = Promise.promisify(fileWriter);

// var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {

//   return pluckFirstLineFromFileAsync(readFilePath)
//     .then(function(userName){
//       return getGitHubProfileAsync(userName);
//     })
//     .then(function(profile){
//       return fileWriterAsync(writeFilePath, profile);
//     })
//     .catch(function(err){
//     });

// };

// // Export these functions so we can test them
// module.exports = {
//   fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
// };
