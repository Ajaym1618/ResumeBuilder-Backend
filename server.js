const express = require("express");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const SignUp = require("./model/sign");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

//posting signUp data

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new SignUp({ email, password:hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Login user
app.post('/LoginData', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await SignUp.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// //Getting data for login

app.get("/signup", async (req, res) => {
  try {
    const users = await SignUp.find({});
    console.log("Fetched Users:", users);
    res.json(users);
  } catch (error) {
    console.error("Error fetching sign-up data:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Define the GET route
app.get('/signup/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const user = await SignUp.findById(id).exec();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// for personalDetails
app.put('/SignUpData/personal/:id', async (req, res) => {
    const { id } = req.params;
    const personalDetails = req.body.personalDetails;

    try {
        const user = await SignUp.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update user's personal details
        user.personalInfo = personalDetails;
        await user.save();

        res.json({ message: 'Personal details updated successfully', user });
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//for experience
app.put('/SignUpData/experience/:id', async (req, res) => {
    const { id } = req.params;
    const experience = req.body.experience;

    try {
        const user = await SignUp.findByIdAndUpdate(
            id,
            { $set: { experience } },
            { new: true } // To return the updated document
        );
        await user.save();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Experience updated successfully', user });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//for education
app.put('/SignUpData/education/:id', async (req, res) => {
    const { id } = req.params;
    const education = req.body.education;

    try {
        const user = await SignUp.findByIdAndUpdate(
            id,
            { $set: { education } },
            { new: true } // To return the updated document
        );
        await user.save();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Education updated successfully', user });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//for project
app.put('/signup/project/:id', async (req, res) => {
    const { id } = req.params;
    const projects = req.body.projects;

    try {
        const user = await SignUp.findByIdAndUpdate(
            id,
            { $set: { projects } },
            { new: true } // To return the updated document
        );
        await user.save();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Project updated successfully', user });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//for skill
app.put('/SignUpData/skill/:id', async (req, res) => {
    const { id } = req.params;
    const skills = req.body.skills;

    try {
        const user = await SignUp.findByIdAndUpdate(
            id,
            { $set: { skills } },
            { new: true } // To return the updated document
        );
        await user.save();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Skills updated successfully', user });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//for Achievements
app.put('/SignUpData/achievement/:id', async (req, res) => {
    const { id } = req.params;
    const achievements = req.body.achievements;

    try {
        const user = await SignUp.findByIdAndUpdate(
            id,
            { $set: { achievements } },
            { new: true } // To return the updated document
        );
        await user.save();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Achievements updated successfully', user });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//for LANGUAGE
app.put('/SignUpData/language/:id', async (req, res) => {
    const { id } = req.params;
    const languages = req.body.languages;

    try {
        const user = await SignUp.findByIdAndUpdate(
            id,
            { $set: { languages } },
            { new: true } // To return the updated document
        );
        await user.save();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Language updated successfully', user });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//for hobbies
app.put('/SignUpData/hobby/:id', async (req, res) => {
    const { id } = req.params;
    const hobbies = req.body.hobbies;

    try {
        const user = await SignUp.findByIdAndUpdate(
            id,
            { $set: { hobbies } },
            { new: true } // To return the updated document
        );
        await user.save();

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Hobbies updated successfully', user });
    } catch (error) {
        console.error('Error updating experience:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


//delete for hobby
app.delete('/SignUpData/hobby/:userId/:hobbyIndex', async (req, res) => {
    const { userId, hobbyIndex } = req.params;
  
    try {
      // Fetch the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Remove the hobby at the specified index
      if (user.hobbies && user.hobbies.length > hobbyIndex) {
        user.hobbies.splice(hobbyIndex, 1);
      } else {
        return res.status(400).send('Invalid hobby index');
      }
  
      // Save the updated user document
      await user.save();
  
      res.status(200).send(user);
    } catch (error) {
      console.error('Error deleting hobby', error);
      res.status(500).send('Server error');
    }
  });

//delete for achievements
app.delete('/SignUpData/achievements/:userId/:achievementsIndex', async (req, res) => {
    const { userId, achievementsIndex } = req.params;
  
    try {
      // Fetch the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Remove the hobby at the specified index
      if (user.achievements && user.achievements.length > achievementsIndex) {
        user.achievements.splice(achievementsIndex, 1);
      } else {
        return res.status(400).send('Invalid achievements index');
      }
  
      // Save the updated user document
      await user.save();
  
      res.status(200).send(user);
    } catch (error) {
      console.error('Error deleting achievements', error);
      res.status(500).send('Server error');
    }
  });


//delete for skill
app.delete('/SignUpData/skill/:userId/:skillIndex', async (req, res) => {
    const { userId, skillIndex } = req.params;
  
    try {
      // Fetch the user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Remove the hobby at the specified index
      if (user.skills && user.skills.length > skillIndex) {
        user.skills.splice(skillIndex, 1);
      } else {
        return res.status(400).send('Invalid achievements index');
      }
  
      // Save the updated user document
      await user.save();
  
      res.status(200).send(user);
    } catch (error) {
      console.error('Error deleting skill', error);
      res.status(500).send('Server error');
    }
  });



app.listen(process.env.PORT, () => {
  console.log("server is running on port 3000");
});
