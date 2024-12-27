const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const isUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (isUser) {
      return res
        .status(403)
        .json({ message: "Bu kullanıcı adı veya e-posta zaten kullanılıyor" });
    }
    // save user and send response
    const user = await newUser.save();

    res
      .status(200)
      .json({ message: "kayıt işlemi gerçekleşti", user: user._id });
  } catch (error) {
    res.status(500).json({ message: "register başarısız", error });
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    // find user
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(404).json({ message: "aranılan kullanıcı bulunamadı" });
    }
    //validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "Kullanıcı adı ya da şifre yanlış" });
    }

    //send res
    res.status(200).json({
      message: "istek başarılı",
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
