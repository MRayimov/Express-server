import jwt from "jsonwebtoken";
import { Users } from "../models/usersModel.js";
import { catchAsync } from "../utils/catchAsync.js";
import { promisify } from "util";
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

export const signIn = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(404).json({
      status: "fail",
      message: "Please enter your username and password",
    });
  } else {
    const user = await Users.findOne({
      username,
    });
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(404).json({
        status: "fail",
        message: "Username or password is incorrect",
      });
    } else {
      const token = signToken(user._id);
      res.status(200).json({
        status: "success",
        token,
      });
    }
  }
});
export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await Users.create({
    username: req.body.username,
    password: req.body.password,
  });
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});
export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide token",
    });
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const freshuser = await Users.findById(decoded.id);
  if (!freshuser) {
    return res.status(400).json({
      status: "fail",
      message: "this user no longer exist",
    });
  }
  req.user = freshuser;
  next();
});
