const express = require('express');
const Course = require('../models/Course');
const User = require('../models/User'); // Import User model to handle XP updates

const router = express.Router();

// Add a new course (Admin Dashboard)
router.post('/', async (req, res) => {
  const { title, description, price, image, youtubeUrl } = req.body;

  try {
    const course = new Course({ title, description, price, image, youtubeUrl });
    await course.save();
    res.status(201).json({ message: 'Course added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add course' });
  }
});

// Get all courses (User Dashboard)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});

// Mark course as complete and update user XP
// Mark course as complete and update user XP
router.post('/complete-course', async (req, res) => {
  const { userId, courseId } = req.body; // Extract userId and courseId from the request

  try {
    console.log('Request received:', req.body); // Log request body for debugging

    // Validate input
    if (!userId || !courseId) {
      return res
        .status(400)
        .json({ message: 'User ID and Course ID are required' });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Simulate course completion (Add XP points)
    const xpGained = 100; // XP per course completion
    user.xp += xpGained;

    // Save updated user
    await user.save();

    res.status(200).json({ message: 'Course marked as complete', xp: user.xp });
  } catch (error) {
    console.error('Error in /complete-course route:', error); // Log error for debugging
    res.status(500).json({ message: 'Failed to mark course as complete' });
  }
});

module.exports = router;
