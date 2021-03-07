"use strict";
var express = require('express');
var app = express();
var port = 3080;
app.listen(port, function () {
    console.log("Server listening on the port: " + port);
});
