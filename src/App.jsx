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
import Careers from './components/Careers';
import Strengths from './components/Strengths';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Test from './components/Test';
import Patients from './components/Patients';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import Audit from './components/Audit';
import Intake from './components/Intake';
import WC from './components/WC';

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
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/admin-login" element={<Blog />} /> */}
          <Route path="/blog/admin-login" element={<Blog />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/audit" element={<Audit />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/workers-comp" element={<WC />} />
          {/* Add other routes as needed*/}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;