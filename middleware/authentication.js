const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = function (req, res, next) {
  //check for header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid :No auth header");
  }

  //get token from header
  const token = authHeader.split(" ")[1];

  //verify token
  try {
    const payload = jwt.verify(token, process.env.JWT_TOKEN);

    // Attach the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid :Invalid token");
  }
};

module.exports = auth;
