// --------------------------------------------------------
// Written By: Mark Hannem with the help of Peter Rawsthorne
// Date: Sept 30 2022
// Assignment: QAP2 : Full Stack Javascript
// Filename: routes.js
// Purpose: Create routing for server and convert date to strings to log files
// --------------------------------------------------------

// Load packages
const fs = require("fs");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmit = new MyEmitter();

// load the logEvents module
const logEvents = require("./logEvents");

// Event listener to convert date to string to it can be stored in log file (logevents.js)
myEmit.addListener("route", (event, level, msg, statusCode) => {
  const d = new Date();
  const sc = statusCode;
  console.log(
    d.toLocaleString() +
      " * " +
      level.toUpperCase() +
      " * " +
      msg +
      " Status Code: " +
      sc
  );
  logEvents(event, level, msg, statusCode);
});

function indexPage(path, event, res, statusCode) {
  displayFile(path, res);
  myEmit.emit(
    "route",
    event,
    "Information",
    "Home Page was visited.",
    statusCode
  );
}

function aboutPage(path, event, res, statusCode) {
  displayFile(path, res);
  myEmit.emit(
    "route",
    event,
    "Information",
    "About Page was visited.",
    statusCode
  );
}

function contactPage(path, event, res, statusCode) {
  displayFile(path, res);
  myEmit.emit(
    "route",
    event,
    "Information",
    "Contact Page was visited.",
    statusCode
  );
}

function subscribePage(path, event, res, statusCode) {
  displayFile(path, res);
  myEmit.emit(
    "route",
    event,
    "Information",
    "Subscriber Page was visited.",
    statusCode
  );
}

function prodsPage(path, event, res, statusCode) {
  displayFile(path, res);
  myEmit.emit(
    "route",
    event,
    "Information",
    "Products Page Was Visted",
    statusCode
  );
}

function errorPage(path, event, res, statusCode) {
  displayFile(path, res);
  myEmit.emit(
    "route",
    event,
    "Information",
    "Error Test Page Was Visted",
    statusCode
  );
}

function testPage(path, event, res, statusCode) {
  displayFile(path, res);
  myEmit.emit(
    "route",
    event,
    "Information",
    "Test Page Was Visted",
    statusCode
  );
}

function forbiddenPage(path, event, res, statusCode) {
  displayFile(path, res);
  myEmit.emit(
    "route",
    event,
    "Information",
    "Forbidden Page Entered",
    statusCode
  );
}

function refreshPage(path, event, res, statusCode) {
  displayFile(path, res);
  myEmit.emit(
    "route",
    event,
    "Information",
    "Page Cached: Not Modified",
    statusCode
  );
}

function eFOFPage(path, event, res, statusCode) {
  displayFile(path, res);
  myEmit.emit(
    "route",
    event,
    "error",
    "Routing Error: 404" + event + " route.",
    statusCode
  );
}

function displayFile(path, res) {
  fs.readFile(path, function (err, data) {
    if (err) {
      console.log(err);
      res.end();
    } else {
      //console.log('file was served.')
      res.writeHead(res.statusCode, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    }
  });
}

module.exports = {
  indexPage,
  aboutPage,
  contactPage,
  subscribePage,
  prodsPage,
  errorPage,
  eFOFPage,
  refreshPage,
  forbiddenPage,
  testPage,
};
