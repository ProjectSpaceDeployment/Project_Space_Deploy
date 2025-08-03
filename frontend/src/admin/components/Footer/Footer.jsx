import React from "react";
import { FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { motion } from "framer-motion";

const Footer = () => {
  
  return (
    <footer className="py-28 bg-[#f7f7f7]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="container"
      >
        <div className="flex flex-col items-center justify-center text-center px-4">
        <p className={`text-center text-[#373a93] font-large transition-all duration-300 ease-in-out`}>
          Developed by <span className="font-bold">Prakruti Bhavsar</span>,
          <span className="font-bold"> Nimisha Idekar</span>,
          <span className="font-bold"> Akanksha Bhoir</span>, and
          <span className="font-bold"> Payal Gupta</span> under the guidance of
          <span className="font-bold"> Prof. Vishal S. Badgujar</span> and
          <span className="font-bold"> Prof. Seema Jadhav</span>.
        </p>
      </div>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 md:gap-4">
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">About Us</h1>
            <p className="text-dark2">
            we believe that effective project management is the key to academic success. Founded by a team of passionate students and professionals, our mission is to empower college students to collaborate seamlessly and manage their projects with ease.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Connect with us</h1>
              <div className="text-dark2">
                <ul className="space-y-2 text-lg">
                  <li className="cursor-pointer hover:text-secondary duration-200">
                  New Students
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                  Alumni
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                  Blogs
                  </li>
                  
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">Our Facilities</h1>
              <div className="text-dark2">
                <ul className="space-y-2 text-lg">
                  <li className="cursor-pointer hover:text-secondary duration-200">
                  Task Management
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                  Progress Tracking
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                  Notifications
                  </li>
                  <li className="cursor-pointer hover:text-secondary duration-200">
                  Analytics and Reporting
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="space-y-4 max-w-[300px]">
            <h1 className="text-2xl font-bold">Get In Touch</h1>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Enter your email"
                className="p-3 rounded-s-xl bg-white w-full py-4 focus:ring-0 focus:outline-none placeholder:text-dark2"
              />
              <button className="bg-primary text-white font-semibold py-4 px-6 rounded-e-xl">
                Go
              </button>
            </div>
          </div>
        </div> */}
      </motion.div>
    </footer>
  );
};

export default Footer;