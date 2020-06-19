const csv = require('csv-parser');
const fs = require('fs');
 
module.exports = function () {
  return new Promise(function (resolve, reject) {
    const results = [];
  
    fs.createReadStream('triggers.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // console.log(results);
      resolve(results);
    })
    .on('error', (e) => {
      reject(e);
    });
  });
}
