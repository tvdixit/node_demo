// var fs = require('fs');

// fs.appendFile('mynewfile1.html', 'hello content!', function (err) {
//     if (err) throw err;
//     console.log("saved!");
// });

var fs = require('fs');

fs.open('mynewfile2.txt', 'w', function (err, file) {
    if (err) throw err;
    console.log('Saved!');
});