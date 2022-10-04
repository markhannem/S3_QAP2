// --------------------------------------------------------
// Written By: Mark Hannem with the help of Peter Rawsthorne
// Date: Sept 30 2022
// Assignment: QAP2 : Full Stack Javascript
// Filename: index.js
// Purpose: Create a server with routing
// --------------------------------------------------------

// Load http package
const http = require("http");
// Load the server routes from routes.js
const routes = require("./routes.js");

const all = require("everyday-fun");

// console.log(all.getRandomJoke());
const quote = JSON.stringify(all.getRandomQuote());

// Create server object
const server = http.createServer((req, res) => {
  // direct path to pages folder where all html files are
  let path = "./pages/";
  // switch statement with req.url to direct paths to specific html page
  // route function shows where path is and req/res objects
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      statusCode = res.statusCode;
      routes.indexPage(path, req.url, res, statusCode);
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      statusCode = res.statusCode;
      routes.aboutPage(path, req.url, res, statusCode);
      break;
    case "/contact":
      path += "contact.html";
      res.statusCode = 200;
      statusCode = res.statusCode;
      routes.contactPage(path, req.url, res, statusCode);
      break;
    case "/subscribe":
      path += "subscribe.html";
      res.setHeader("Set-cookie", "subscription=New");
      res.statusCode = 200;
      statusCode = res.statusCode;
      routes.subscribePage(path, req.url, res, statusCode);
      break;
    case "/prods":
      path += "products.html";
      res.setHeader("Set-cookie", "prods=New");
      res.statusCode = 200;
      statusCode = res.statusCode;
      routes.prodsPage(path, req.url, res, statusCode);
      break;
    // Page where the error codes are demonstrated
    case "/errortest":
      path += "errortest.html";
      res.statusCode = 200;
      statusCode = res.statusCode;
      routes.errorPage(path, req.url, res, statusCode);
      break;
    // Test case to show the npm "everyday-fun" package and the JSON data is logged to console and displayed on the screen
    // Still having trouble with extracting the JSON data and displaying it properly
    // Also having trouble with changing the content because right now it shows the same quote where i would like it to change with every click of the link
    case "/test":
      path += "test.html";
      res.statusCode = 200;
      statusCode = res.statusCode;
      routes.testPage(path, req.url, res, statusCode);
      res.write(quote, "utf8", () => {});
      res.end();
      break;
    // Example of Status Code: 304, when data is cached and a page is refreshed and the content is not modified
    // Clicking the button for 304, the page will refresh and show in the console which will emulate a refresh page and the content not changing
    case "/refresh":
      path += "refresh.html";
      res.statusCode = 304;
      statusCode = res.statusCode;
      routes.refreshPage(path, req.url, res, statusCode);
      break;
    // Example of Status Code: 403, when access to a specific route is denied from the the user it will direct to this page
    case "/forbidden":
      path += "forbidden.html";
      res.statusCode = 403;
      statusCode = res.statusCode;
      routes.forbiddenPage(path, req.url, res, statusCode);
      // res.setHeader("Location", "/forbidden");
      res.end();
      break;
    // Example of Status Code: 301, when a route is changed and moved permanently
    case "/contact-me":
      // this is a redirect for a deprecated route
      res.statusCode = 301;
      statusCode = res.statusCode;
      routes.contactPage(path, req.url, res, statusCode);
      res.setHeader("Location", "/contact");
      res.end();
      break;
    // common to have default in switch statement as the 404 page error
    // Example of Status Code: 404, when a route/path is not found the user is directed to the 404 error page so they can be directed back to the home page
    default:
      path += "404.html";
      res.statusCode = 404;
      statusCode = res.statusCode;
      routes.eFOFPage(path, req.url, res, statusCode);
      break;
  }
});
// Listener to show localhost is listening/running on the port: 3000
server.listen(3000, "localhost", () => {
  console.log("Server Running on Port: 3000");
});
