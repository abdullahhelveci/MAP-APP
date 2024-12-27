const Pin = require("../models/pinModel");

exports.createPin = async (req, res) => {
  try {
    const newPin = new Pin(req.body);
    const savedPin = await newPin.save();
    res.status(200).json({ message: "pin işlemi başarılı", savedPin });
  } catch (error) {
    res.status(500).json({ message: "pinde eror var", error });
  }
};

// get all pins
exports.getPins = async (req, res) => {
  try {
    const pins = await Pin.find();
    res.status(200).json({ message: "Tüm Pinler", length: pins.length, pins });
  } catch (error) {
    res.status(500).json(error);
  }
};
