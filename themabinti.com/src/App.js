import './App.css';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import NavbarBottom from './NavbarBottom';
import NavbarTop from './NavbarTop';
import Products from './Products';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <NavbarTop/>
      <Navbar/>
      <NavbarBottom/>
      <Hero/>
      <Products/>
      <Footer/>
    </div>
  );
}

export default App;
