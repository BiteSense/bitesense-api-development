const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(400).json({
        status: "error",
        message: "Unauthorized",
      });

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decode) => {
      if (err)
        return res.status(403).json({
          status: "error",
          message: "Forbidden",
        });

      next();
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error,
    });
  }
};

module.exports = verifyToken;
