import { WebUser} from "../schema/model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../constant.js";
import { sendEmail } from "../utilis/sendemail.js";

export let createWebuser = async (req, res) => {
  try {
    let webuserData = req.body;
    let hashPassword = await bcrypt.hash(webuserData.password, 10); 
    // ayeko data + isVerifiedEmail+ hashPassword lai as a object data ma send garyo.
    // ... ayeko data sabai tesma rakhdinxa
    let data = {
      ...webuserData,
      isVerifiedEmail: false,
      password: hashPassword,
    };

    // let result = await Webuser.create(webuserData);
    let result = await WebUser.create(data);

    //send mail with link after a registration
    //for purpose of making  isVerifiedEmail: false  to true so that we know that the user is genuine
    // but tyo link ma token attach garera pathauxm so that token supports expiry system ani tyo link kei time ma expire hunxa.

    //generate token

    let infoObj = {
      _id: result._id,
    };
    let expiryInfo = {
      expiresIn: `20d`,
    };

    let token = await jwt.sign(infoObj, secretKey, expiryInfo);

    // send email:

    await sendEmail({
      from: '"Account Created " <sgod7444@gmail.com>',
      to: data.email,
      subject: "Account Create",
      html: `
      <h1>Your account has been created successfully.</h1>
      <a href="http://localhost:3000/verify-email?token=${token}">
      http://localhost3000/verify-email?token=${token}</a>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Webuser data created successfully.",
      result: result,
      // token : token ,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    //get token.
    let tokenString = req.headers.authorization;
    // bearer+ token
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    //verify token:
    let infoObj = await jwt.verify(token, secretKey);
    // console.log(infoObj)

    // get id from token
    let userId = infoObj._id;
    console.log(userId);

    //set isVerifiedEmail: true of userId;

    let result = await WebUser.findByIdAndUpdate(
      userId, // k ko ?
      {
        isVerifiedEmail: true, // kun data ?
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      success: true,
      message: "user verified successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    // console.log(email , password)
    //find(gives all)(output in array) , findOne(gives only one from top of db)(output in object) :difference

    let user = await WebUser.findOne({ email: email });
    console.log(user);

    if (user) {
      if (user.isVerifiedEmail) {
        let isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          let infoObj = {
            _id: user._id,
          };
          let expiryInfo = {
            expiresIn: `100d`,
          };
          let token = await jwt.sign(infoObj, secretKey, expiryInfo);

          res.status(200).json({
            success: true,
            message: "user login successful.",
            data: token,
          });
        } else {
          throw new Error("credential error.");
        }
      } else {
        throw new Error("user not verified.");
      }
    } else {
      throw new Error("user doesn't exist.");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res, next) => {
  try {
    //getting value passed from previous middleware.
    let _id = req._id;

    let result = await WebUser.findById(_id);

    res.status(200).json({
      success: true,
      message: "user read successfully. ",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unable to read user.",
    });
  }
};

export const profileUpdate = async (req, res, next) => {
  try {
    let _id = req._id;
    let data = req.body;
    // console.log(data)

    delete data.email;
    delete data.password;
    // console.log(data)

    let result = await WebUser.findByIdAndUpdate(_id, data, { new: true });

    res.status(201).json({
      success: true,
      message: "profile updated successfully.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't update user profile.",
    });
  }
};

export const passwordUpdate = async (req, res, next) => {
  try {
    let _id = req._id;

    let oldPassword = req.body.oldPassword;
    let newPassword = req.body.newPassword;

    let data = await WebUser.findById(_id);
    // console.log(data)

    let hashPassword = data.password;
    // console.log(databasePassword);

    let isPasswordValid = await bcrypt.hash(oldPassword, hashPassword);

    if (isPasswordValid) {
      let newHashPassword = await bcrypt.hash(newPassword, 10);

      let result = await WebUser.findByIdAndUpdate(
        _id,
        { password: newHashPassword }, //yo matra update hunxa
        { new: true }
      );

      res.status(201).json({
        success: true,
        message: "Password updated successfully.",
        result: result,
      });
    } else {
      throw new Error(" Credential did not match");
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unable to update password.",
    });
  }
};

export const readAllWebusers = async (req, res) => {
  let result = await WebUser.find({});

  try {
    res.status(200).json({
      success: true,
      message: "Webuser data read(retrieve) successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readSpecificWebuser = async (req, res) => {
  let id = req.params.id;
  // console.log(id)
  try {
    let result = await WebUser.findById(id);

    res.status(200).json({
      success: true,
      message: "readSpecificWebuser successful.",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSpecificUser = async (req, res) => {
  let id = req.params.id;
  console.log(id);
  try {
    let data = req.body;
    delete data.email;
    delete data.password;

    let result = await WebUser.findByIdAndUpdate(id, data, { new: true });
    console.log(result);
    res.status(201).json({
      success: true,
      message: `updateSpecificUser successful. `,
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteSpecificUser = async (req, res) => {
  let id = req.params.id;
  // console.log(id)
  try {
    let result = await WebUser.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `deleteSpecificUser successful.`,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    let email = req.body.email;

    let result = await WebUser.findOne({ email: email });

    if (result) {
      //token generate
      let infoObj = {
        _id: result._id,
      };
      let expiryInfo = {
        expiresIn: "20d",
      };
      let token = await jwt.sign(infoObj, secretKey, expiryInfo);

      await sendEmail({
        from: '"Hello" <sgod7444@gmail.com>',
        to: email,
        subject: "Reset Password",
        html: `
        <h1>Please click given link to reset your password.</h1>
        <a href="http://localhost:3000/reset-password?token=${token}">
        http://localhost:3000/reset-password?token=${token}</a>
        `,

        /*
        Error : localhost8001 - Frontend ko halney
        <h1>Please click given link to reset your password.</h1>
        <a href="http://localhost8001/reset-password?token=${token}">
        http://localhost8001/reset-password?token=${token}</a>
        `,
        */
      

      });


      res.status(200).json({
        success: true,
        message: "reset password link sent to given email.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "email doesn't exist.",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const resetPassword = async (req, res) => {
  try {
    let _id = req._id;
    // let password = req.body.password
    let hashPassword = await bcrypt.hash(req.body.password, 10);

    let result = await WebUser.findByIdAndUpdate(_id,
      {password:hashPassword},
      {new:true},)

    res.status(201).json({
      success: true,
      message: "password reset successfully.",
      result : result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

