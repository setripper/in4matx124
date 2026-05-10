import { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Stats from './components/Stats.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState('Employee Management');

  return (
    <div className="app-shell">
      <Header />
      <main>
        <Hero />
        <Features selectedFeature={selectedFeature} onSelectFeature={setSelectedFeature} />
        <Stats />
        <ContactForm selectedFeature={selectedFeature} />
      </main>
      <Footer />
    </div>
  );
}
