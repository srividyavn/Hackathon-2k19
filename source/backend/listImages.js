const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const path = require('path');
var http = require("http");

module.exports = function listImages(req, res) {
  var projectFolder = path.join(__dirname, 'images_folder');
  var files = fs.readdirSync(projectFolder);
  var files_f = [];
  for(var i = 0; i < files.length; i++) {
    file = path.join(__dirname, 'images_folder', files[i]);
    files_f.push(file);
  }
  res.send(files);
};
