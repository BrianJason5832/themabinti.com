import React from 'react'
import './Hero.css'
import {useState,useEffect } from 'react';


function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Array of background images and their corresponding text
  const slides = [
    {
      image: 'url(./HeroImage6.jpg)',
      title: 'First Slide Title',
      subtitle: 'This is the first slide subtitle',
    },
    {
      image: 'url(./HeroImage.png)',
      title: 'Second Slide Title',
      subtitle: 'This is the second slide subtitle',
    },
    {
      image: 'url(./HeroImage5.jpg)',
      title: 'Third Slide Title',
      subtitle: 'This is the third slide subtitle',
    },
  ];

  console.log()

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className='Hero'>
      {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: slide.image, width:'100%', height:'800px',position:'absolute',top:'0', left:'0'}}
          />
        ))}
      <div className='hero-inner-container'>
      <h2>Themabinti Online Services</h2>
      <p>Get services now from the comfort of your home.</p>
      <button className='hero-button'>Book Now!</button>
      </div>
    </div>
  )
}

export default Hero
