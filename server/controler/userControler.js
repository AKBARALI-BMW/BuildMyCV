import User from "../models/User.js";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";
import bcrypt from "bcrypt"; 

const generatedToken = (userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};

// controller for user registration
// POST api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // if the required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide name, email and password",
      });
    }

    // if the user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
      });
    }

    // create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // save user to database
    await newUser.save();

    // return the success message
    const token = generatedToken(newUser._id);
    
    // return user without password
    const userResponse = {
      _id: newUser._id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt,
    };

    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// controller for user login
// POST api/users/login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // generate token
    const token = generatedToken(user._id);

    // return user without password
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };

    res.status(200).json({
      message: "Login successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// controller for getting user by Id
// GET api/users/data
export const getUserById = async (req, res) => {
  try {
    // get user id from authenticated request (assumes auth middleware)
    const userId = req.user.id; 
    // find user by id and exclude password
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User retrieved successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// controller for getting the user resumes
// GET api/users/resumes

export const getUserResumes = async (req, res) => { // ADDED: export keyword
  try {
    const userId = req.user.id; 
    //  return user resume
    const resumes = await Resume.find({userId}) // CHANGED: resume to resumes (plural)
    return res.status(200).json({resumes}) // CHANGED: resume to resumes
  }
  catch (error) {
  return res.status(400).json({message: error.message})
  }

};