const Query = require("../models/queryModel");
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
exports.createNewQuery = async (req, res) => {
  const { name, contactNum, message, property, userTo, userFrom } = req.body;
  const dAndT = dateAndTimeGettr();
  let createdQuery;

  try {
    createdQuery = new Query({
      name,
      contactNum,
      message,
      userTo,
      userFrom,
      property,
      dateTime: dAndT.fullDate + "_" + dAndT.time,
    });
    await createdQuery.save();
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Something went wrong", success: false });
  }

  return res.status(200).json({
    message: "Query created. We will get back to you soon.",
    createdQuery,
    success: true,
  });
};

exports.getQueryByUserId = async (req, res) => {
  const { id } = req.body;
  let queries;
  try {
    queries = await Query.find({ userTo: id });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something went wrong", success: false });
  }
  return res.status(200).json({
    queries: queries.map((q) => {
      return q.toObject({ getters: true });
    }),
    success: true,
  });
};

exports.deleteQuery = async (req, res) => {
  const { id } = req.body;
  console.log(id);

  let query;
  try {
    query = await Query.findById(id);
    if (!query) {
      throw new Error();
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something went wrong", success: false });
  }
  try {
    await query.deleteOne();
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Something went wrong", success: false });
  }

  return res.status(200).json({ message: "Query Deleted", success: true });
};
