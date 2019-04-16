const IncomingForm = require('formidable').IncomingForm;
const fs = require('fs');
const path = require('path');
var http = require("http");

const classifyUrl = 'http://localhost:5000/classifyReceipt';

var options = {
  host: 'localhost',
  port: 5000,
  path: '/classifyReceipt',
  method: "POST"
};

module.exports = function upload(req, res) {
  var form = new IncomingForm();
  let readStream;
  form.on('file', (field, file) => {
    let filename = file.name;
    let src = file.path;
    let destDir = path.join(__dirname, 'images_folder');

    fs.access(destDir, (err) => {
      if(err)
        fs.mkdirSync(destDir);

      var responseString = "";
      var req = http.request(options, function (res) {

        res.on("data", function (data) {
          responseString += data;
          // save all the data from response
          console.log(responseString)
          if ( responseString == "It is RECEIPT") {
            copyFile(src, path.join(destDir, filename)); }
        });
      });

      var reqBody = src;
      req.write(reqBody);
      req.end();


    });
  });
  form.on('end', () => {
    res.json();
  });
  form.parse(req);
};

function copyFile(src, dest) {

  console.log(dest);
  let readStream = fs.createReadStream(src);

  readStream.once('error', (err) => {
    console.log(err);
  });

  readStream.once('end', () => {
    console.log('done copying');
  });

  readStream.pipe(fs.createWriteStream(dest));
}
