import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');

  const handleAddCourse = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/courses', {
        title,
        description,
        price,
        image,
        youtubeUrl,
      });

      if (response.status === 201) {
        alert('Course added successfully!');
        setTitle('');
        setDescription('');
        setPrice('');
        setImage('');
        setYoutubeUrl('');
      }
    } catch (error) {
      console.error('Error adding course:', error.response);
      alert('Failed to add course. Please try again.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <h2 className="text-2xl mb-4">Add a New Course</h2>
      <form onSubmit={handleAddCourse} className="max-w-md">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          required
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          required
        ></textarea>
        <input
          type="number"
          placeholder="Price (in USD)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="YouTube URL"
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AdminDashboard;
