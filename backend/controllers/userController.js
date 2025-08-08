import User from "../models/User.js";

export const getAllUsersHandler = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
//////////single user 
export const getSingleUserHandler = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


///////////// update

export const updateUserHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const isAdmin = req.user.role === "admin";
    const isSelf = req.user._id.toString() === userId;

    if (!isAdmin && !isSelf) {
      return res.status(403).json({ 
        success: false, 
        message: "Unauthorized access" 
      });
    }

    // Define updatable fields based on role
    const updatableFields = isAdmin 
      ? ["name", "email", "contact", "address", "status", "role"]
      : ["name", "contact", "address"];

    // Filter updates to only allowed fields
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (updatableFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Special handling for password if needed
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 12);
    }

    const user = await User.findByIdAndUpdate(
      userId, 
      { $set: updates },
      { 
        new: true,
        runValidators: true 
      }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
}

////////////// delete

export const deleteUserHandler = async (req,res)=>{
try {
   const userId = req.params.id;
    const isAdmin = req.user.role === "admin";
    const isSelf = req.user.id.toString() === userId;

  if (!isAdmin && !isSelf) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    await User.findByIdAndDelete(userId);

    res.json({
      success: true,
      message: "User deleted successfully",
    });

} catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });

}
}


// export const updateUserStatus = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { status } = req.body;

//     // Validate input
//     if (!["active", "blocked"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status value" });
//     }

//     // Find and update user
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { status },
//       { new: true, runValidators: true }
//     ).select("-password");

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.json({
//       success: true,
//       message: `User status updated to ${status}`,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };