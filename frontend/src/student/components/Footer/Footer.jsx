const Footer = ({ isSidebarOpen, isMobile }) => {
  return (
    <footer
      className={`p-4 md:p-6 bg-[#fbdc9b] shadow-lg rounded-lg  transition-all duration-300 space-y-6
    dark:bg-gray-800 dark:border-gray-600 dark:text-white
     ${isMobile ? (isSidebarOpen ? 'ml-64 w-auto' : 'ml-0 w-full') : 'ml-64 w-auto'}`}
    >
      <div className="flex flex-col items-center justify-center text-center px-4">
        <p className={`text-center text-[#373a93] font-medium transition-all duration-300 ease-in-out
          ${!isMobile && isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          Developed by <span className="font-bold">Prakruti Bhavsar</span>,
          <span className="font-bold"> Nimisha Idekar</span>,
          <span className="font-bold"> Akanksha Bhoir</span>, and
          <span className="font-bold"> Payal Gupta</span> under the guidance of
          <span className="font-bold"> Prof. Vishal S. Badgujar</span> and
          <span className="font-bold"> Prof. Seema Jadhav</span>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;