import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(401).json({ message: "Invalid Token" });
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401).json({
      message: "You are not authenicated!",
    });
  }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, async () => {
    if (req.user._id === req?.params?.id || req?.user?.isAdmin) {
      next();
    } else {
      res.status(403).json({
        message: "You are not authorized to perform this action!",
      });
    }
  });
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, async () => {
    if (req.user?.isAdmin) {
      next();
    } else {
      res.status(403).json({
        message: "You are not authorized to perform this action!",
      });
    }
  });
};
