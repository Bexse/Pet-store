const mongoose = require("mongoose");
const Litter = require("../models/litterModel");
const User = require("../models/userModel");

exports.getAllLitters = async (req, res) => {
  let long = req.query.currentLong;
  let lat = req.query.currentLat;

  if (req.user.role === "buyer") {
    const documents = await Litter.find({
      location: { $near: [long, lat] },
    })
      .sort({ _id: 1 })
      .limit(10)
      .exec();
    res.json({ success: true, data: documents });
  } else {
    const documents = await Litter.find({ user: req.user._id })
      .limit(10)
      .sort({ birthdate: -1 });
    res.json({ success: true, data: documents });
  }
};

exports.getLitterById = async (req, res) => {
  const document = await Litter.findOne({ _id: req.params.id });
  res.json({ success: true, data: document });
};

exports.addLitter = async (req, res) => {
  const litterExists = await Litter.findOne({ _id: req.params.id });

  if (litterExists) {
    res.status(400).json({ message: "litter Exists already" });
  } else {
    const document = await Litter.create({
      ...req.body,
      user: req.user._id,
    });
    res.json({ success: true, data: document });
  }
};
exports.updateLitterById = async (req, res) => {
  const document = await Litter.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json({ success: true, data: document });
};

exports.requestManageById = async (req, res) => {
  const document = await Litter.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json({ success: true, data: document });
};

exports.deleteLitterById = async (req, res) => {
  const document = await Litter.deleteOne({ _id: req.params.id });
  res.json({ success: true, data: document });
};

exports.markasAdoptedById = async (req, res) => {
  const document = await Litter.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json({ success: true, data: document });
};
