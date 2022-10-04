// --------------------------------------------------------
// Written By: Mark Hannem with the help of Peter Rawsthorne
// Date: Sept 30 2022
// Assignment: QAP2 : Full Stack Javascript
// Filename: logEvents.js
// Purpose: Write log files to new file in log folder
// --------------------------------------------------------

// NPM installed Modules
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

// load node packages
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

// Function to log info to log folder/file.
const logEvents = async (event, level, message, statusCode) => {
  const dateTime = `${format(new Date(), "MMM-dd-yyyy\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${level}\t${event}\t${statusCode}\t${message}\t${uuid()}`;

  try {
    if (!fs.existsSync(path.join(__dirname, "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "logs"));
    }
    const fileName = `${format(new Date(), "yyyyMMdd")}` + "_httpevents.log";
    await fsPromises.appendFile(
      path.join(__dirname, "logs", fileName),
      logItem + "\n"
    );
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
