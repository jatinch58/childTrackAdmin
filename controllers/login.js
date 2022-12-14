const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");
const subscriptiondb = require("../models/subscription");
exports.signup = async (req, res) => {
  try {
    const adminSchema = Joi.object()
      .keys({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(5).required(),
      })
      .required();
    const isValidated = adminSchema.validate(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .json({ message: isValidated.error.details[0].message });
    }

    bcrypt.hash(req.body.password, 10, function (err, hash) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Something went wrong", error: e.name });
      }
      req.body.password = hash;
      const newAdmin = new Admin(req.body);
      newAdmin
        .save()
        .then((val) => {
          return res
            .status(201)
            .json({ message: "Created Successfully", result: val });
        })
        .catch((e) => {
          return res
            .status(500)
            .json({ message: "Something went wrong", error: e.name });
        });
    });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong", error: e });
  }
};
exports.login = async (req, res) => {
  try {
    const adminSchema = Joi.object()
      .keys({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(5).required(),
      })
      .required();
    const isValidated = adminSchema.validate(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .json({ message: isValidated.error.details[0].message });
    }
    const isAdminExist = await Admin.findOne({ username: req.body.username });
    if (!isAdminExist) {
      return res.status(400).json({ message: "Please enter valid username" });
    }
    bcrypt.compare(
      req.body.password,
      isAdminExist.password,
      function (err, result) {
        if (err) {
          return res
            .status(400)
            .json({ message: "Please enter valid password" });
        }
        if (!result) {
          return res
            .status(400)
            .json({ message: "Please enter valid password" });
        }
        const token = jwt.sign(
          { _id: isAdminExist._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        return res.status(200).json({ message: "Login successful", token });
      }
    );
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: e.name });
  }
};
exports.getSubscription = async (req, res) => {
  try {
    const getSubscription = await subscriptiondb.find();
    if (getSubscription) {
      return res.status(200).json({ result: getSubscription });
    }
    return res.status(500).json({ message: "Something went wrong" });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: e.name });
  }
};
exports.makeSubscription = async (req, res) => {
  try {
    const subscriptionSchema = Joi.object()
      .keys({
        subscriptionName: Joi.string().required(),
        subscriptionTenure: Joi.string().required(),
        subscriptionPrice: Joi.number().required(),
      })
      .required();
    const isValidated = subscriptionSchema.validate(req.body);
    if (isValidated.error) {
      return res
        .status(400)
        .json({ message: isValidated.error.details[0].message });
    }
    const isAlreadyExist = await subscriptiondb.findOne({
      subscriptionName: req.body.subscriptionName,
    });
    if (isAlreadyExist) {
      return res.status(409).json({
        message:
          "This subscription name already exists. Please try with another name.",
      });
    }
    const newSubscription = new subscriptiondb(req.body);
    newSubscription
      .save()
      .then(() => {
        return res
          .status(201)
          .json({ message: "New subscription made sucessfully" });
      })
      .catch((e) => {
        return res
          .status(500)
          .json({ message: "Something went wrong", error: e.name });
      });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Something went wrong", error: e.name });
  }
};
