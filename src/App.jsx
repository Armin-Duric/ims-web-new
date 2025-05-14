import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cards from './components/Cards';
import Info from './components/Info';
import Testimonial from './components/Testimonials';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <Hero />
      <Cards />
      <Info />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default App;