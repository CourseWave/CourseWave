const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(cookieParser());

async function authorize(req, res, next) {
  try {
    if (!req.user) {
      const authorizationHeader = req.headers.authorization;
      if (authorizationHeader) {
        const user = jwt.verify(authorizationHeader, process.env.SECRET_KEY);
        if (user.role_id) {
          req.user = user;
          next();
        } else {
          res.status(401).json("Unauthorized user");
        }
      } else {
        res.status(401).json("You need to login first");
      }
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json(error);
  }
}

function hasRole(roleId) {
  return async (req, res, next) => {
    try {
      const userRoleId = req.user.role_id;

      if (userRoleId === roleId) {
        next();
      } else {
        res.status(403).json("Forbidden: Insufficient permissions");
      }
    } catch (error) {
      res.status(400).json(error);
    }
  };
}

module.exports = {
  authorize,
  hasRole,
};
