// controllers/authController.js
import User from "../models/User.js";
import _sendEmail from "../utils/email.js";
import { signInToken } from "../utils/token.js";
import { signupValidation } from "../validators/authValidator.js";
import jwt from "jsonwebtoken"
export const signupHandler = async (req, res) => {
  try {
    // 1. Validate request
    const { error } = signupValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // 3. Create user (no need to hash manually here!)
    const user = User.create(req.body);
    const token = signInToken(user);

    res.status(201).json({
      user,
      token,
      success: true,
      message: "user created successfully!",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
//////////////////                                     Login Handler
export const signInHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    const token = signInToken(user);
    res.status(201).json({
      user: userWithoutPassword,
      token,
      success: true,
      message: "user logged in successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Signin Failed",
      error: error.message,
    });
  }
};

//////////////////////////             FORGOT PASSWORD HANDLER
export const forgotPswdHandler = async (req, res) => {
  
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  ////// reset token

  const resetToken = jwt.sign({ id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "12m" })

  // reset frontend url

  // const resetURL = `${process.env.WEBSITE_URL}/reset-password/${resetToken}`
  const resetURL = `${process.env.WEBSITE_URL}/reset-password?token=${resetToken}`

  try {

    await _sendEmail({
      to: user.email,
      subject: "Reset Password",
      html: `
         <div style="margin: 0 auto; width: 90%; height: 500px;">
          <h1 style="color: gold;" >Reset Password</h1>
          <p style="color: gray;">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam maxime vero libero.</p>
          <p>Click here to reset <a href="${resetURL}">Reset </a></p>
        </div>
        `
    })


     res.status(200).json({
      success: true,
      message: "Password reset email sent successfully!"
    });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Email send Failed",
      error: error.message
    });
  }
  
}




//////////////////////////             RESET PASSWORD HANDLER
export const ResetPswdHandler = async (req, res) => {
  const { token, password } = req.body;

  // Basic input validation
  if (!token || !password) {
    return res.status(400).json({
      success: false,
      message: "Token and password are required.",
    });
  }

  try {
    // Verify token
    let decodedUser;
    try {
      decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    // Find user
    const user = await User.findById(decodedUser.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Update and save password
    user.password = password;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    console.error("Password reset failed:", error);
    res.status(500).json({
      success: false,
      message: "Password reset failed.",
      error: error.message,
    });
  }
};




//////////////////////////// profile
export const profile = (req, res) => {
  res.status(200).json({ success: true, user: req.user })
}

