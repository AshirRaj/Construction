// src/pages/public/Home.jsx
import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Hero } from '../../components/home/Hero';
import { About } from '../../components/home/About';
import { Services } from '../../components/home/Services';
import { FeaturedProjects } from '../../components/home/FeaturedProjects';
import { Process } from '../../components/home/Process';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { Stats } from '../../components/home/Stats';
import { Testimonials } from '../../components/home/Testimonials';
import { CTA } from '../../components/home/CTA';
import { ContactForm } from '../../components/home/ContactForm';
import { getProjects, getServices, getTestimonials } from '../../services/api';
import bgImage from '../../assets/img1.jpeg';

export const Home = () => {
  const { showToast, openQuoteModal } = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projData, servData, testData] = await Promise.all([
          getProjects(),
          getServices(),
          getTestimonials()
        ]);
        setProjects(projData);
        setServices(servData);
        setTestimonials(testData.filter(t => t.status === 'Published'));
      } catch (err) {
        console.error('Error fetching public website data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative bg-[#0c0e12] text-slate-100 min-h-screen">

      {/* 1. Hero Section (Strictly video background only, no img1.jpeg behind hero) */}
      <Hero onOpenQuoteModal={openQuoteModal} />

      {/* 2. Entire Rest of Homepage: Continuous img1.jpeg Background with Fixed Parallax */}
      <div className="relative">

        {/* Continuous Fixed Background Layer for everything below Hero */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            filter: 'contrast(100%) brightness(80%)'
          }}
        >
          {/* Translucent Dark Gradient Overlay for optimal legibility */}
          <div className="absolute inset-0 bg-[#0c0e12]/60" />

          {/* Subtle Blueprint Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* 3. Sections scrolling over the continuous img1.jpeg background */}
        <div className="relative z-10">
          {/* Section 01: About */}
          <About />

          {/* Section 02: Services */}
          <Services services={services} />

          {/* Section 03: Featured Projects */}
          <FeaturedProjects projects={projects} />

          {/* Section 04: Process */}
          <Process />

          {/* Section 05: Why Choose Us */}
          <WhyChooseUs />

          {/* Section 06: Statistics Impact Strip */}
          <Stats />

          {/* Section 07: Testimonials */}
          <Testimonials testimonials={testimonials} />

          {/* Section 08: Call to Action */}
          <CTA onOpenQuoteModal={openQuoteModal} />

          {/* Section 09: Contact & Quote Form */}
          <ContactForm onShowToast={showToast} />
        </div>

      </div>
    </div>
  );
};
