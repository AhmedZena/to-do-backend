const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
// create user schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      minlength: [8, "username must be atleast 8 characters long"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    firstName: {
      type: String,
      required: [true, "firstName is required"],
      minlength: [3, "firstName must be atleast 3 characters long"],
      maxlength: [15, "firstName must be atmost 15 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "lastName is required"],
      minlength: [3, "lastName must be atleast 3 characters long"],
      maxlength: [15, "lastName must be atmost 15 characters long"],
    },
    dob: {
      type: Date,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// hash password before saving
userSchema.pre("save", function (next) {
  let user = this;
  console.log(user);
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (error, salt) {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, function (error, hashedPassword) {
        if (error) {
          return next(error);
        }
        user.password = hashedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

// create user model
const UserModel = mongoose.model("User", userSchema);

// export user model
module.exports = UserModel;
