import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

// Mock data for leaderboard and heatmap
const leaderboardMock = [
  { name: 'John Doe', xp: 1500 },
  { name: 'Jane Smith', xp: 1200 },
  { name: 'Mike Johnson', xp: 1000 },
];

const heatmapMock = [
  { date: '2025-02-10', count: 1 },
  { date: '2025-02-11', count: 2 },
  { date: '2025-02-12', count: 3 },
  { date: '2025-02-13', count: 5 },
];

// Helper to extract YouTube video ID
const getYouTubeVideoId = (url) => {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/embed\/|.*\/v\/|.*\/e\/|.*watch\?v=|.*&v=))([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
};

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [xp, setXp] = useState(0); // User's XP Points
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null); // Selected course for video
  const [progress, setProgress] = useState({}); // Individual course progress
  const [overallProgress, setOverallProgress] = useState(0); // Overall course progress
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);

        // Initialize progress for each course
        const initialProgress = {};
        response.data.forEach((course) => {
          initialProgress[course._id] = 0; // Default progress for each course
        });
        setProgress(initialProgress);
      } catch (error) {
        console.error('Error fetching courses:', error.response);
      }
    };

    fetchCourses();
  }, []);

  // Update overall progress whenever individual course progress changes
  useEffect(() => {
    if (courses.length > 0) {
      const totalProgress = Object.values(progress).reduce(
        (acc, value) => acc + value,
        0
      );
      setOverallProgress((totalProgress / (courses.length * 100)) * 100);
    }
  }, [progress, courses]);
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/api/users/leaderboard'
        );
        setLeaderboard(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error.response);
      }
    };

    fetchLeaderboard();
  }, []);

  // Handle Mark as Complete
  const handleMarkComplete = async (courseId) => {
    try {
      const userId = localStorage.getItem('userId'); // Fetch userId from localStorage or session

      if (!userId) {
        alert('User not logged in!');
        return;
      }

      const response = await axios.post(
        'http://localhost:5000/api/courses/complete-course',
        {
          userId,
          courseId,
        }
      );

      // Update progress and XP
      setProgress((prev) => ({
        ...prev,
        [courseId]: 100, // Mark the course as 100% complete
      }));

      setXp(response.data.xp); // Update XP from backend response
      alert('Course marked as complete!');
    } catch (error) {
      console.error('Error marking course as complete:', error.response);
      alert(
        error.response?.data?.message || 'Failed to mark course as complete.'
      );
    }
  };

  // Handle Logout
  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = '/signup'; // Redirect to login/signup page
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-700 text-white flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-6">User Dashboard</h1>
        <button
          onClick={() => setSelectedSection('dashboard')}
          className={`mb-4 px-4 py-2 text-left rounded-lg ${
            selectedSection === 'dashboard'
              ? 'bg-blue-500'
              : 'hover:bg-blue-600'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setSelectedSection('myCourses')}
          className={`mb-4 px-4 py-2 text-left rounded-lg ${
            selectedSection === 'myCourses'
              ? 'bg-blue-500'
              : 'hover:bg-blue-600'
          }`}
        >
          My Courses
        </button>
        <button
          onClick={handleLogout}
          className="mt-auto px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-8 overflow-y-auto">
        {/* Dashboard Section */}
        {selectedSection === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

            {/* XP Points */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300 mb-6">
              <h3 className="text-xl font-bold mb-2">Your XP Points</h3>
              <p className="text-2xl font-bold text-blue-600">{xp} XP</p>
            </div>

            {/* Overall Course Progress */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300 mb-6">
              <h3 className="text-xl font-bold mb-2">
                Overall Course Progress
              </h3>
              <div className="relative w-full bg-gray-300 rounded-full h-4">
                <div
                  className="absolute top-0 left-0 h-4 bg-green-600 rounded-full"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Progress: {overallProgress.toFixed(2)}%
              </p>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300 mb-6">
              <h3 className="text-xl font-bold mb-4">Leaderboard</h3>
              {leaderboard.map((user, index) => (
                <div
                  key={user._id}
                  className="flex justify-between items-center p-2 border-b border-gray-200"
                >
                  <span>
                    {index + 1}. {user.name}
                  </span>
                  <span className="text-blue-600 font-bold">{user.xp} XP</span>
                </div>
              ))}
            </div>

            {/* Heatmap */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
              <h3 className="text-xl font-bold mb-4">
                Learning Activity Heatmap
              </h3>
              <Heatmap
                startDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() - 1))
                } // Show 1 year of data
                endDate={new Date()}
                values={heatmapMock}
                classForValue={(value) => {
                  if (!value) {
                    return 'color-empty';
                  }
                  return `color-scale-${value.count}`;
                }}
              />
              <p className="text-gray-600 text-sm mt-2">
                Heatmap shows daily XP gained. Darker tiles represent more
                activity.
              </p>
            </div>
          </div>
        )}

        {/* My Courses Section */}
        {selectedSection === 'myCourses' && (
          <div>
            {selectedCourse ? (
              <div>
                {/* Course Details with Video */}
                <h2 className="text-3xl font-bold mb-4">
                  {selectedCourse.title}
                </h2>
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    selectedCourse.youtubeUrl
                  )}`}
                  title="Course Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <p className="mt-4 text-gray-600">
                  {selectedCourse.description}
                </p>
                <button
                  onClick={() => handleMarkComplete(selectedCourse._id)}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Mark as Complete
                </button>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="mt-4 ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Back to Courses
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-3xl font-bold mb-6">My Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {courses.map((course) => (
                    <div
                      key={course._id}
                      className="bg-white rounded-lg shadow-md p-4 border border-gray-300 cursor-pointer hover:shadow-lg"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <h3 className="text-xl font-bold mt-4">{course.title}</h3>
                      <p className="mt-2 text-sm text-gray-600">
                        Progress: {progress[course._id] || 0}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
