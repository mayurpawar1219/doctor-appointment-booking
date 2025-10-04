import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <p className="text-3xl sm:text-4xl font-bold text-gray-900">
          About <span className="text-[#5f6FFF]">Us</span>
        </p>
        <p className="mt-2 text-gray-600 text-lg">
          Learn more about our mission, vision, and values
        </p>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row items-center gap-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 sm:p-10">
        {/* About Image */}
        <div className="flex-shrink-0 w-full lg:w-1/2">
          <img
            src={assets.about_image}
            alt="About Us"
            className="rounded-xl w-full object-cover shadow-md"
          />
        </div>

        {/* About Content */}
        <div className="lg:w-1/2 space-y-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            We are committed to providing exceptional healthcare services with a focus on
            <span className="font-semibold text-gray-900"> patient-centered care</span>, innovation,
            and community well-being. Our team of dedicated professionals strives to deliver
            compassionate and comprehensive medical care to improve the health and quality of life
            for all individuals we serve.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg">
            Our mission is to enhance the health and well-being of our community through accessible,
            high-quality healthcare services, education, and research. We aim to foster a supportive
            environment that promotes healing, wellness, and lifelong health for all individuals.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              To be a leading healthcare institution recognized for excellence in patient care,
              innovation, and community engagement. We envision a future where every individual has
              access to the highest standard of healthcare, and we are dedicated to advancing
              medical knowledge and practices to improve health outcomes globally.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <p className="text-3xl font-bold text-gray-900">
            WHY <span className="text-[#5f6FFF]">Choose Us</span>
          </p>
          <p className="mt-2 text-gray-600 text-lg">
            Here’s why patients trust us for their healthcare needs
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Efficiency */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Efficiency</h3>
            <p className="text-gray-600 leading-relaxed">
              We prioritize timely and effective care, ensuring that patients receive the right
              treatment at the right time.
            </p>
          </div>

          {/* Convenience */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Convenience</h3>
            <p className="text-gray-600 leading-relaxed">
              Our user-friendly platform allows patients to easily book appointments, access
              medical records, and communicate with healthcare providers from the comfort of their
              homes.
            </p>
          </div>

          {/* Personalization */}
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalization</h3>
            <p className="text-gray-600 leading-relaxed">
              We understand that every patient is unique, and we tailor our services to meet their
              individual needs and preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
