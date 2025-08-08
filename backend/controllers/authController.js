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
       
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#e6f2f1;">
  <div style="max-width:600px; margin:40px auto; background:#ffffff; padding:40px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.1); text-align:center; height: 500px;">
    <h1 style="color: #004d40; font-size: 32px; margin-bottom: 20px;">Reset Password</h1>
    <p style="color: #00332f; font-size: 16px; line-height: 1.5; margin-bottom: 40px;">
      You requested to reset your password. Click the button below to proceed.
    </p>
    <a 
      href="${resetURL}" 
      style="
        display: inline-block;
        background-color: #004d40;
        color: #ffffff;
        text-decoration: none;
        padding: 15px 40px;
        font-size: 18px;
        border-radius: 6px;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0, 77, 64, 0.4);
        transition: background-color 0.3s ease;
      "
      onmouseover="this.style.backgroundColor='#00332f'"
      onmouseout="this.style.backgroundColor='#004d40'"
    >
      Reset Password
    </a>
    <p style="margin-top: 50px; color: #666666; font-size: 14px;">
      If you did not request a password reset, you can safely ignore this email.
    </p>
  </div>
</body>


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

