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
import ClientIntakeForm from './components/ClientIntakeForm';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import WorkersCompensation from './components/WorkersCompensation';

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
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:id" element={<FullPost />} />
          <Route path="/client-intake" element={<ClientIntakeForm />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/workers-compensation" element={<WorkersCompensation />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;