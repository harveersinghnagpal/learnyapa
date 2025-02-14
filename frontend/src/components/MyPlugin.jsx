import React, { useEffect, useState } from 'react'; // ✅ Fix missing useState
import { Link } from 'react-router-dom'; // Import Link
import { useNavigate } from 'react-router-dom';

export const MyPlugin = () => {
  const [showScroll, setShowScroll] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth',
          });
        }
      });
    });

    // Active Navbar Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
      let scrollPosition = window.scrollY;
      sections.forEach((section) => {
        let offset = section.offsetTop - 100;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (scrollPosition >= offset && scrollPosition < offset + height) {
          navLinks.forEach((link) => {
            link.classList.remove('text-blue-600');
            document
              .querySelector(`nav a[href='#${id}']`)
              ?.classList.add('text-blue-600');
          });
        }
      });
    });
    // Scroll-to-top visibility toggle
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div id="webcrumbs">
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-110"
        >
          ⬆️
        </button>
      )}
      <div className="w-full bg-gray-100">
        {/* Navbar */}
        <nav className="bg-white shadow-md py-4 px-8 fixed top-0 w-full z-50">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">LearnHub</h1>
            <ul className="flex space-x-8">
              <li>
                <a
                  href="#home"
                  className="hover:text-blue-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#courses"
                  className="hover:text-blue-600 transition-colors"
                >
                  Courses
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-blue-600 transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
            {/* Sign Up Dropdown */}
            <Link to="/signup">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all">
                Login
              </button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="py-20 px-8 mt-16 text-center">
          <h1 className="text-5xl font-bold mb-6">Learn Anywhere, Anytime</h1>
          <p className="text-xl mb-8">
            Expand your knowledge with interactive courses.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700 transition-all"
          >
            Get Started
          </button>
        </section>
        {/* Learning Services Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800">
              Our Learning Services
            </h2>
            <p className="text-lg text-gray-500 mt-3">
              Explore advanced learning features designed to enhance your
              education experience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12">
              {[
                {
                  title: 'Personalized Learning Paths',
                  description: 'Customized study plans based on your progress.',
                  icon: '📚',
                  color: 'bg-blue-500',
                },
                {
                  title: 'Coding Progress Tracker',
                  description:
                    'Track your coding journey with real-time analytics.',
                  icon: '💻',
                  color: 'bg-green-500',
                },
                {
                  title: 'AI-Powered Content Summarizer',
                  description: 'Get AI-generated summaries for complex topics.',
                  icon: '🤖',
                  color: 'bg-yellow-500',
                },
                {
                  title: 'Personal Chatbot',
                  description:
                    '24/7 AI assistant for instant guidance and support.',
                  icon: '💬',
                  color: 'bg-purple-500',
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className="p-8 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl bg-white border border-gray-200"
                >
                  <div
                    className={`w-16 h-16 mx-auto flex items-center justify-center text-white text-3xl rounded-full ${service.color}`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold mt-4">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-16 px-8 bg-white">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Web Development',
                image:
                  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
                description: 'Learn modern web development techniques',
                price: '$99',
              },
              {
                title: 'Data Science',
                image:
                  'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
                description: 'Master data analysis and visualization',
                price: '$149',
              },
              {
                title: 'Digital Marketing',
                image:
                  'https://images.unsplash.com/photo-1533750516457-a7f992034fec',
                description: 'Learn effective online marketing strategies',
                price: '$79',
              },
            ].map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="mb-4">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">
                      {course.price}
                    </span>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section class="py-20 bg-white">
          <div class="max-w-6xl mx-auto text-center">
            <h2 class="text-4xl font-bold text-gray-800">Why Choose Us</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
              <div class="bg-blue-100 p-10 rounded-lg shadow-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <span class="text-5xl text-blue-600 mr-6">💻</span>
                <div>
                  <h3 class="text-2xl font-semibold">Access Anywhere</h3>
                  <p class="text-lg text-gray-600">
                    Learn on mobile, tablet, or desktop
                  </p>
                </div>
              </div>

              <div class="bg-green-100 p-10 rounded-lg shadow-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <span class="text-5xl text-green-600 mr-6">⏳</span>
                <div>
                  <h3 class="text-2xl font-semibold">Flexible Learning</h3>
                  <p class="text-lg text-gray-600">Study at your own pace</p>
                </div>
              </div>

              <div class="bg-yellow-100 p-10 rounded-lg shadow-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl">
                <span class="text-5xl text-yellow-600 mr-6">🆘</span>
                <div>
                  <h3 class="text-2xl font-semibold">24/7 Support</h3>
                  <p class="text-lg text-gray-600">
                    Get help whenever you need
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* About Us Section */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
            {/* Left Side - Text */}
            <div className="md:w-1/2 p-8">
              <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                LearnHub is a leading online learning platform that empowers
                students and professionals with high-quality courses taught by
                industry experts. Our mission is to provide accessible,
                engaging, and effective learning experiences to help individuals
                achieve their career goals.
              </p>
              <button className="mt-6 bg-gray-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-900 transition-all">
                Learn More
              </button>
            </div>

            {/* Right Side - Image */}
            <div className="md:w-1/2 flex justify-center">
              <img
                className="rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="About LearnHub"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section class="py-16" id="contact">
          <div class="max-w-5xl mx-auto px-6">
            <h2 class="text-4xl font-bold text-center text-gray-800 mb-10">
              Contact Us
            </h2>

            <div class="w-full h-96 overflow-hidden rounded-lg shadow-lg mb-8">
              <iframe
                class="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509367!2d144.9537353153183!3d-37.816279742021705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5772b7dbb2f8e0!2sMelbourne%2C%20Australia!5e0!3m2!1sen!2sin!4v1614121234567!5m2!1sen!2sin"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div class="bg-white p-8 rounded-lg shadow-lg">
              <h3 class="text-2xl font-semibold text-gray-700 mb-6 text-center">
                Get in Touch
              </h3>
              <form>
                <div class="mb-4">
                  <label class="block text-gray-600 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-600 font-medium">Email</label>
                  <input
                    type="email"
                    class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Email"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-gray-600 font-medium">Message</label>
                  <textarea
                    rows="4"
                    class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-900 text-white py-12 px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 - About */}
            <div>
              <h3 className="text-2xl font-bold mb-4">LearnHub</h3>
              <p className="text-gray-400">
                Empowering learners worldwide with high-quality education and
                expert-led courses.
              </p>
            </div>

            {/* Column 2 - Quick Links */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#courses"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <span className="font-semibold">Email:</span>{' '}
                  info@learnhub.com
                </li>
                <li>
                  <span className="font-semibold">Phone:</span> +1 234 567 890
                </li>
                <li>
                  <span className="font-semibold">Address:</span> 123 Education
                  St, Learning City
                </li>
              </ul>
            </div>

            {/* Column 4 - Subscribe */}
            <div>
              <h4 className="text-xl font-semibold mb-4">Subscribe</h4>
              <p className="text-gray-400 mb-4">
                Get updates on new courses and special offers.
              </p>
              <div className="flex items-center bg-gray-800 p-2 rounded-lg">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mt-8">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-2xl transition-transform transform hover:scale-125"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-2xl transition-transform transform hover:scale-125"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-2xl transition-transform transform hover:scale-125"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-2xl transition-transform transform hover:scale-125"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>

          {/* Bottom Text */}
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2024 LearnHub. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MyPlugin;
