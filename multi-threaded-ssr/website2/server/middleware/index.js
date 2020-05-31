import SomeComponent from "../../src/components/SomeComponent";

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const envMiddleware = require("./environmentMiddleware");

const createEdgeHandler = require("./edge-handler");

module.exports = (express, app, done) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(cookieParser());

  // environment based middlewares
  envMiddleware(express, app, done);

  app.use(
    "/edge",
    createEdgeHandler([
      {
        name: "SomeComponent",
        Component: SomeComponent,
      },
    ])
  );

  app.use((req, res, next) => {
    const cookie = req.cookies.jwToken;
    const jwToken = "fake"; // TRY: set to 'real' to authenticate ADMIN route

    if (cookie !== jwToken) {
      res.cookie("jwToken", jwToken, { maxAge: 900000 });
      req.cookies.jwToken = jwToken;
    }

    next();
  });
};
