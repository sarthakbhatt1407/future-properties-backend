const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

exports.userExists = async (req, res) => {
  const { contactNum } = req.body;

  if (!contactNum || contactNum.length === 0) {
    return res.status(400).json({ message: "Kindly fill contact number" });
  }

  let user = await User.findOne({ contactNum: contactNum });
  if (user) {
    return res
      .status(201)
      .json({ message: "User already exists.", exists: true });
  }
  return res.status(404).json({ message: "User not exists.", exists: false });
};

exports.userRegistration = async (req, res, next) => {
  const { name, contactNum, locality, city, state } = req.body;

  //
  const date = new Date();

  let month = date.getMonth();
  let year = date.getFullYear();

  let user = await User.findOne({ contactNum: contactNum });
  if (user) {
    return res
      .status(400)
      .json({ message: "User already exists.", exists: true });
  } else {
    const createdUser = new User({
      name,
      contactNum,
      userSince: months[month] + " " + year,
      address: {
        locality,
        city,
        state,
      },
      wishlist: [],
      verified: false,
      isAdmin: false,
    });

    try {
      await createdUser.save();
    } catch (err) {
      return res
        .status(403)
        .json({ message: "Unable to register user.", success: false });
    }
    res.status(200).json({
      message: "Sign up successful..",
      success: true,
    });
  }
};

exports.userLogin = async (req, res) => {
  const { contactNum } = req.body;
  let user, token;
  try {
    user = await User.findOne({ contactNum: contactNum });
    if (!user) {
      throw new Error();
    }
  } catch {
    return res.status(404).json({ message: "User not found", success: false });
  }
  token = jwt.sign(
    { userId: user.id, contactNum: user.contactNum },
    "secret_key"
  );
  return res.status(404).json({
    user: {
      name: user.name,
      id: user.id,
      contact: user.contactNum,
      address: user.address,
      userSince: user.userSince,
      token: token,
      city: user.address.city,
      isAdmin: user.isAdmin,
    },
    message: "Logged In",
    isloggedIn: true,
  });
};

exports.getUserByUserID = async (req, res) => {
  const { id } = req.body;
  let user;
  try {
    user = await User.findById(id);
    if (!user) {
      throw new Error();
    }
  } catch (error) {
    return res.status(404).json({ message: "User not found!", status: true });
  }
  return res
    .status(200)
    .json({ user: user.toObject({ getters: true }), status: true });
};
exports.getAllUsers = async (req, res) => {
  let users;
  try {
    users = await User.find({});
  } catch (error) {}
  return res.status(200).json({
    users: users.map((u) => {
      return u.toObject({ getters: true });
    }),
    status: true,
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.body;
  let user;
  try {
    user = await User.findById(id);
    console.log(user);

    if (!user) {
      throw new Error();
    }
  } catch (error) {
    return res.status(404).json({ message: "User not found!", success: false });
  }
  try {
    await user.deleteOne();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting user", success: false });
  }
  return res.status(200).json({ message: "User Deleted", success: true });
};
