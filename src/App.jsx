import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cards from './components/Cards';
import Info from './components/Info';
import Content from './components/Content';
import Testimonial from './components/Testimonials';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Team from './components/Team';
import Strengths from './components/Strengths';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Test from './components/Test';
import FullPost from './components/FullPost';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen text-white">
        <Navbar />
        <Routes>
          {/* Homepage Route */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Cards />
                <Strengths />
                <Test />
                <Info />
                <Content />
                <Testimonial />
              </>
            }
          />
          {/* About Us Route */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:id" element={<FullPost />} />
          {/* Add other routes as needed (e.g., /services, /team, etc.) */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;