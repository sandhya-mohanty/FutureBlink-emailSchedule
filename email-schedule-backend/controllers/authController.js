const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// User Registration
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        //check user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exist"})
        }
        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //save user database
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

module.exports = { register, login };
