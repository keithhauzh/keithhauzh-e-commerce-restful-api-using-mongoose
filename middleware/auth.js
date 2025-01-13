// jwt import
const jwt = require("jsonwebtoken");

// import functions from user contorller
const { getUserByEmail } = require("../controllers/user");

// to check if the user is a valid user
const isValidUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get the user data by email
    const user = await getUserByEmail(decoded.email);

    // if user exists
    if (user) {
      req.user = user;
      // trigger the next function
      next();
    } else {
      res.status(400).send({ error: "YOU SHALL NOT PASS!" });
    }
  } catch (error) {
    res.status(400).send({ error: "YOU SHALL NOT PASS!" });
  }
};

// to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // get the user data by email
    const user = await getUserByEmail(decoded.email);

    // if user exists
    if (user && user.role === "admin") {
      //   add user data into request
      req.user = user;
      // trigger the next function
      next();
    } else {
      res.status(400).send({ error: "YOU SHALL NOT PASS!" });
    }
  } catch (error) {
    res.status(400).send({ error: "YOU SHALL NOT PASS!" });
  }
};

module.exports = {
  isValidUser,
  isAdmin,
};
