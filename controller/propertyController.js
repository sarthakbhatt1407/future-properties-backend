const Property = require("../models/propertyModel");
const fs = require("fs");
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

const dateAndTimeGettr = () => {
  const currentTime = new Date();

  const currentOffset = currentTime.getTimezoneOffset();

  const ISTOffset = 330; // IST offset UTC +5:30

  const date = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let hrs = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hrs < 10) {
    hrs = "0" + hrs;
  }

  if (hrs < 10) {
    hrs = "0" + hrs;
  }
  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }
  const fullDate = year + "-" + month + "-" + day;

  const time = hrs + ":" + min + ":" + sec;
  return { fullDate, time };
};

exports.createProperty = async (req, res) => {
  const {
    title,
    desc,
    locality,
    city,
    state,
    area,
    price,
    facing,
    propertyStatus,
    furnishing,
    floors,
    facingRoad,
    old,
    userId,
    category,
    subCategory,
  } = req.body;
  // console.log({
  //   title,
  //   desc,
  //   locality,
  //   city,
  //   state,
  //   area,
  //   price,
  //   facing,
  //   propertyStatus,
  //   furnishing,
  //   floors,
  //   facingRoad,
  //   old,
  //   userId,
  //   category,
  //   subCategory,
  // });
  // return;
  const dateAndTime = dateAndTimeGettr();

  if (!req.files) {
    return res
      .status(400)
      .json({ message: "Please upload images", status: false });
  }
  const files = req.files;

  let imgPath = "";
  let createdProperty;

  const arr = files.map((file, ind) => {
    if (ind + 1 === files.length) {
      imgPath += file.path;
      return;
    }
    imgPath += file.path + "+";
    return;
  });
  try {
    createdProperty = new Property({
      title,
      desc,
      locality,
      city: city.toLowerCase(),
      state,
      area,
      price,
      facing,
      propertyStatus,
      furnishing,
      floors,
      facingRoad,
      old,
      userId,
      category,
      status: "pending",
      deleted: false,
      images: imgPath,
      date: dateAndTime.fullDate,
      time: dateAndTime.time,
      subCategory,
    });

    await createdProperty.save();
  } catch (error) {
    console.log(error);

    for (const file of files) {
      fs.unlink(file.path, (err) => {});
    }
    return res
      .status(400)
      .json({ message: "Something went wrong!", status: false });
  }

  return res.status(201).json({
    message: "Property added successfully. ",
    status: true,
    createdProperty,
  });
};

exports.getPropertyById = async (req, res) => {
  const { id } = req.body;
  let property;
  try {
    property = await Property.findById(id);
    if (!property) {
      throw new Error();
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Property not found!", status: false });
  }
  return res.status(200).json({ property, status: true });
};
exports.getPropertyByUserId = async (req, res) => {
  const { userId } = req.body;

  let property;
  try {
    property = await Property.find({ userId: userId });
    if (property.length === 0) {
      throw new Error();
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Property not found!", status: false });
  }
  return res.status(200).json({
    properties: property.map((pro) => {
      return pro.toObject({ getters: true });
    }),
    status: true,
  });
};
exports.getPropertyByCity = async (req, res) => {
  const { city } = req.body;

  let property;
  try {
    property = await Property.find({ city: city.toLowerCase() });
    if (property.length === 0) {
      throw new Error();
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Property not found!", status: false });
  }
  return res.status(200).json({
    properties: property.map((pro) => {
      return pro.toObject({ getters: true });
    }),
    status: true,
  });
};
exports.getPropertyBySubCategory = async (req, res) => {
  const { subCategory, city } = req.body;

  let property;
  try {
    property = await Property.find({
      subCategory,
      city: city.toLowerCase(),
    });
    if (property.length === 0) {
      throw new Error();
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Property not found!", status: false });
  }
  return res.status(200).json({
    properties: property.map((pro) => {
      return pro.toObject({ getters: true });
    }),
    status: true,
  });
};

exports.getAllProperties = async (req, res) => {
  let properties;
  try {
    properties = await Property.find({});
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Property not found!", status: false });
  }
  return res.status(200).json({
    properties: properties.map((pro) => {
      return pro.toObject({ getters: true });
    }),
    status: true,
  });
};

exports.updatePropertyStatus = async (req, res) => {
  const { id, action, subC } = req.body;
  let property;
  try {
    property = await Property.findById(id);

    if (!property) {
      throw new Error();
    }
  } catch (error) {
    console.log(error);

    return res
      .status(404)
      .json({ message: "Property not found!", success: false });
  }
  if (action === "subC") {
    property.subCategory = subC;
    try {
      await property.save();
    } catch (error) {
      // console.log(error);

      return res
        .status(500)
        .json({ message: "Something went wrong.", success: false });
    }
    return res
      .status(200)
      .json({ message: "Property Updated.", success: true });
  }
  if (action === "status") {
    property.status = "approved";
    try {
      await property.save();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.", success: false });
    }
    return res
      .status(200)
      .json({ message: "Property Updated.", success: true });
  }
  if (action === "delete") {
    const images = property.images.split("+");

    try {
      await Property.deleteOne();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Something went wrong.", success: false });
    }
    for (const img of images) {
      fs.unlink(img, (err) => {});
    }
    return res
      .status(200)
      .json({ message: "Property deleted.", success: true });
  }
};
