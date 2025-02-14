const express = require('express');
const User = require('../models/User'); // Ensure User model is imported
const router = express.Router();

// Get leaderboard data
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await User.find()
      .sort({ xp: -1 }) // Sort by XP descending
      .select('name xp') // Select only name and XP fields
      .limit(10); // Return top 10 users

    res.status(200).json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
