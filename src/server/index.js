/**
 * Lunatech E-Shop Server Entrypoint
 *
 * Description: This service is used to launch the E-Shop for Lunatech. Entrypoint for all others microservices
 *  that we will use
 *
 * Created by manueldupont on 2018-11-25.
 */

/***** Imports *****/
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const {call} = require('./api');

global.tracer = require('tracer').colorConsole(
  {
    format: [
      "{{timestamp}} [{{title}}] {{file}}:{{line}}: {{message}}", //default format
      {
        error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
      }
    ],
    filters: {
      //log : colors.black,
      trace: colors.white,
      debug: colors.blue,
      info: colors.white,
      warn: colors.yellow,
      error: [colors.red, colors.bold]
    },
    dateformat: "HH:MM:ss.L",
    preprocess: function (data) {
      data.title = data.title.toUpperCase();
    }
  });

const port = 3000;
const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  tracer.log('[api]', req);
  next()
});

app.get('/', (req, res) => {
  // Get params from the request.
  res.send("Lunatech E-Shop Server 1.0.0");
});

/**
 * GET Products.
 * @QueryParams path: The full path URL to pass to Lunatech API.
 * @QueryParams query: The query string to match the path to Lunatech API.
 */
app.get('/products', (req, res, next) => {
  if (req.query) {
    const query = require('querystring').stringify(req.query);

    call.get(`${req.path}?${query}`)
      .then((response) => {
        res.send(response);
      }).catch(next);
  } else {
    res.status(500).send({error: "Missing query string"});
  }
});

app.listen(port, () => tracer.info(`E-Shop Server listening on port ${port}!`));
