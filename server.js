// 1st Type of create server with arrow function:
// __________________________________________
// const http = require('http');

// http.createServer((req,resp)=>{
//     resp.write("Helloooo World");
//     resp.end();
// }).listen(8000);
// __________________________________________
// 2nd Type of create server with function:
const http = require('http');

function dataControl(req,resp)
{
    resp.write("Helllooo Worldd")
    resp.end();
}

http.createServer(dataControl).listen(8000);