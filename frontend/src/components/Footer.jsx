import React from 'react'
import { assets } from '../assets/assets'
import { Facebook, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Footer Main Section */}
        <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr] gap-12 py-16">
          
          {/* Company Info */}
          <div>
            <img className="mb-6 w-40" src={assets.logo} alt="Company Logo" />
            <p className="text-gray-600 leading-6 max-w-sm">
              Your trusted healthcare partner, delivering top-notch services with 
              compassion, innovation, and expertise for a healthier future.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition"
              >
                <Facebook size={20} />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-500 transition"
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 transition"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Company</h3>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li className="hover:text-blue-600 transition cursor-pointer">Home</li>
              <li className="hover:text-blue-600 transition cursor-pointer">About Us</li>
              <li className="hover:text-blue-600 transition cursor-pointer">Contact Us</li>
              <li className="hover:text-blue-600 transition cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Get in Touch</h3>
            <ul className="flex flex-col gap-3 text-gray-600">
              <li className="hover:text-blue-600 transition cursor-pointer">+91 52163 28594</li>
              <li className="hover:text-blue-600 transition cursor-pointer">hospitaldev@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 py-5 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} HospitalDev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
