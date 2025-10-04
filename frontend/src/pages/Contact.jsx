import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="text-center mt-10">
        <p className="text-3xl font-semibold text-gray-800">
          CONTACT <span className="text-blue-600">US</span>
        </p>
      </div>

      {/* Main Content Section */}
      <div className="max-w-6xl mx-auto px-4 mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>

        {/* Contact Info Section */}
        <div className="space-y-8">
          {/* Our Office */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">OUR OFFICE</h3>
            <p className="text-gray-600 leading-relaxed">
              54709 Williams Station <br />
              Suite 350, Washington, USA
            </p>
            <p className="mt-3 text-gray-600">
              <strong>Tel:</strong> +1 (453) 505-0192
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong>{' '}
              <a
                href="mailto:sanjeevani@gmail.com"
                className="text-blue-600 hover:underline"
              >
                sanjeevani@gmail.com
              </a>
            </p>
          </div>

          {/* Careers Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">CAREERS AT PRESCRIPTO</h3>
            <p className="text-gray-600 leading-relaxed">
              Learn more about our teams and job openings.
            </p>
            <button className="mt-4 px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Add bottom spacing to separate from footer */}
      <div className="mt-20"></div>
    </div>
  );
};

export default Contact;
