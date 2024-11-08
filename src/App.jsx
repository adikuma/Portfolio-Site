import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  Github,
  Linkedin,
  Download,
  Sun,
  Moon,
  ExternalLink,
  Mail,
  Send,
  ArrowRight,
} from "lucide-react";
import profileImage from "./assets/profile-pic.jpg";
import resume from "./assets/Resume.pdf";
import CommandSearch from "./components/CommandSearch";

const Portfolio = () => {
  const [showPreviousRoles, setShowPreviousRoles] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [blobPosition, setBlobPosition] = useState({ x: 0, y: 0 });
  const [darkMode, setDarkMode] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const previousRolesRef = useRef(null);
  const projectsRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [projectsHeight, setProjectsHeight] = useState(0);
  const [fontIndex, setFontIndex] = useState(0);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [projectsContentHeight, setProjectsContentHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1062 || window.innerHeight <= 800);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (projectsRef.current) {
      setProjectsContentHeight(projectsRef.current.scrollHeight + 20);
    }
  }, [showAllProjects]);

  const handleSendEmail = () => {
    const mailtoLink = `mailto:adityakuma0308@gmail.com?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailMessage)}`;
    window.location.href = mailtoLink;
    setShowEmailForm(false);
  };

  const fontFamilies = [
    "Satoshi, sans-serif",
    "JetBrains, sans-serif",
    "Lora, serif",
  ];

  useEffect(() => {
    document.body.style.fontFamily = fontFamilies[fontIndex];
  }, [fontIndex]);

  const toggleFont = () => {
    setFontIndex((prevIndex) => (prevIndex + 1) % fontFamilies.length);
    console.log(
      "Current font:",
      fontFamilies[(fontIndex + 1) % fontFamilies.length]
    );
  };

  const greetings = [
    "Hi",
    "Hola",
    "Bonjour",
    "Hallo",
    "Ciao",
    "नमस्ते",
    "こんにちは",
    "안녕하세요",
    "你好",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (previousRolesRef.current) {
      setContentHeight(previousRolesRef.current.scrollHeight + 10);
    }
  }, [showPreviousRoles]);

  useEffect(() => {
    if (projectsRef.current) {
      setProjectsHeight(projectsRef.current.scrollHeight);
    }
  }, [showAllProjects]);

  const handleMouseMove = (e) => {
    setBlobPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const experiences = [
    {
      title: "Undergraduate Researcher (UROP)",
      company: "Singapore University of Technology and Design",
      location: "Singapore",
      period: "May 2024 - Present",
      isCurrent: true,
    },
    {
      title: "AI/Full Stack Intern",
      company: "CPF Board",
      location: "Singapore",
      period: "Sep 2023 - Dec 2023",
      isCurrent: false,
    },
  ];

  const projects = [
    {
      title: "Mr. Weather App",
      description:
        "Interactive weather app with voice input, real-time weather data, and humorous responses. Built with React Native and Flask API.",
      link: "https://github.com/adikuma/Weather-App",
      bgColor: "from-blue-300 to-purple-900",
    },
    {
      title: "Penny Expense Tracker",
      description:
        "Expense tracking app using the Donut model to extract data from receipts with MongoDB storage. Includes scalable backend.",
      link: "https://github.com/adikuma/Penny-App",
      bgColor: "from-purple-300 to-pink-900",
    },
    {
      title: "Clause Genie",
      description:
        "Generative AI tool for legal contract interpretation using GPT, TF-IDF, and PyPDF2 for automated reviews.",
      link: "https://github.com/adikuma/Clause-Genie",
      bgColor: "from-pink-300 to-orange-900",
    },
    {
      title: "Moodify Music Recommender",
      description:
        "Music recommendation system using Conv1D with Attention for mood-based music predictions.",
      link: "https://github.com/adikuma/Moodify-Recommender",
      bgColor: "from-orange-300 to-yellow-900",
    },
    {
      title: "AI-Driven Urban Planning Platform",
      description:
        "Platform for public engagement in urban planning, converting community feedback into design insights using clustering.",
      link: "https://github.com/weetimo/spatialworld",
      bgColor: "from-green-300 to-blue-900",
    },
    {
      title: "Skin Lesion Classification System",
      description:
        "Classification system for skin cancer detection using Capsule Networks, with Grad-CAM for interpretability.",
      link: "https://github.com/adikuma/Skin-Lesion-Classification",
      bgColor: "from-yellow-300 to-red-900",
    },
  ];
  

  const BottomSheet = ({ projects, darkMode }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(window.innerHeight - 100);
    const sheetRef = useRef(null);
  
    // Heights for different states
    const minHeight = window.innerHeight - 100; // Just handle showing
    const halfHeight = window.innerHeight / 2; // Half screen
    const maxHeight = 100; // Nearly full screen
  
    // Handle mouse events
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartY(e.clientY);
    };
  
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaY = e.clientY - startY;
      const newY = Math.max(maxHeight, Math.min(minHeight, currentY + deltaY));
      setCurrentY(newY);
      setStartY(e.clientY);
    };
  
    const handleMouseUp = () => {
      if (!isDragging) return;
      handleDragEnd();
    };
  
    // Handle touch events
    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartY(e.touches[0].clientY);
    };
  
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      const deltaY = e.touches[0].clientY - startY;
      const newY = Math.max(maxHeight, Math.min(minHeight, currentY + deltaY));
      setCurrentY(newY);
      setStartY(e.touches[0].clientY);
    };
  
    const handleTouchEnd = () => {
      handleDragEnd();
    };
  
    // Common drag end handler
    const handleDragEnd = () => {
      setIsDragging(false);
      
      // Snap to nearest position
      if (currentY > minHeight - 100) {
        setCurrentY(minHeight); // Snap to closed
      } else if (currentY > halfHeight) {
        setCurrentY(halfHeight); // Snap to half
      } else {
        setCurrentY(maxHeight); // Snap to open
      }
    };
  
    // Add global mouse event listeners
    useEffect(() => {
      const handleGlobalMouseMove = (e) => {
        if (isDragging) {
          handleMouseMove(e);
        }
      };
  
      const handleGlobalMouseUp = () => {
        if (isDragging) {
          handleMouseUp();
        }
      };
  
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
  
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }, [isDragging]);
  
    // Add button to demonstrate opening
    const handleOpen = () => {
      setCurrentY(maxHeight);
    };
  
    return (
      <>
        {/* Backdrop overlay when sheet is opened */}
        {currentY < minHeight - 100 && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-0 transition-opacity duration-300"
            style={{
              opacity: 1 - (currentY / minHeight)
            }}
          />
        )}
        
        <div
          ref={sheetRef}
          className={`fixed left-0 right-0 z-0 transition-transform duration-300 ease-out ${
            isDragging ? 'transition-none' : ''
          }`}
          style={{
            transform: `translateY(${currentY}px)`,
            height: `calc(100vh - ${maxHeight}px)`,
          }}
        >
          {/* Sheet Content */}
          <div
            className={`w-full h-full rounded-t-3xl shadow-lg border ${
              darkMode 
                ? 'bg-black/70 border-gray-700/50 backdrop-blur-xl' 
                : 'bg-white/70 border-gray-200/50 backdrop-blur-xl'
            }`}
          >
            {/* Draggable Handle */}
            <div
              className="w-full py-4 touch-none cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className={`w-12 h-1 mx-auto rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`} />
              <button 
                onClick={handleOpen}
                className={`absolute right-4 top-4 text-sm ${
                  darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Open
              </button>
            </div>
  
            {/* Projects Header */}
            <div className="px-6">
              <h2 className={`text-sm uppercase mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Projects
              </h2>
            </div>
  
            {/* Projects List */}
            <div className="px-6 overflow-y-auto" style={{ height: 'calc(100% - 80px)' }}>
              <div className="space-y-3">
                {projects.map((project, index) => (
                  <a
                    key={index}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-between group px-4 py-7 transition-all duration-300 border rounded-lg hover:scale-[1.02] ${
                      darkMode 
                        ? 'border-gray-700/50 bg-gray-800/50 hover:bg-gray-800/70' 
                        : 'border-gray-200/50 bg-white/50 hover:bg-white/70'
                    }`}
                  >
                    <div>
                      <h3
                        className={`text-md font-medium transition-colors ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {project.title}
                      </h3>
                      <h6
                        className={`text-xs transition-colors ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {project.description}
                      </h6>
                    </div>
                    <ArrowRight className={`w-5 h-5 flex-shrink-0 ml-4 ${
                      darkMode ? 'text-gray-500 group-hover:text-gray-400' : 'text-gray-400 group-hover:text-gray-600'
                    }`} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
    
  const MobileLayout = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [emailSubject, setEmailSubject] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const cardsRef = useRef([]);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('translate-y-0', 'opacity-100');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '-10% 0px -10% 0px'
        }
      );
  
      cardsRef.current.forEach((card) => {
        if (card) {
          observer.observe(card);
        }
      });
  
      return () => observer.disconnect();
    }, []);
  
    return (
      <div className="flex flex-col min-h-screen pb-4">
        {/* Profile Section */}
        <div className="px-6 pt-8">
          <div className="flex flex-col items-center">
            <img
              src={profileImage}
              alt="Aditya Kumar"
              className="w-32 h-32 rounded-full object-cover mb-6"
              onClick={() => setShowModal(true)}
            />
            <h1 className="text-xl text-center mb-1">
              <span
                className={`font-bold ${
                  darkMode ? "text-blue-500" : "text-orange-500"
                }`}
              >
                {greetings[greetingIndex]}
              </span>
              , <span className="font-bold">I am Aditya Kumar</span>
            </h1>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-800"
              } text-sm text-center mb-4`}
            >
              AI Engineer & Full Stack Developer based in Singapore
            </p>
  
            {/* Social Links */}
            <div className="flex gap-4 mb-8">
              <a
                href="https://github.com/adikuma"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full ${
                  darkMode
                    ? "bg-gray-900 backdrop-blur-xl"
                    : "bg-gray-100 backdrop-blur-xl"
                } transition-colors duration-300`}
              >
                <Github
                  className={`w-5 h-5 ${
                    darkMode ? "text-white" : "text-gray-800"
                  } `}
                />
              </a>
              <a
                href="https://www.linkedin.com/in/adikum"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-full ${
                  darkMode
                    ? "bg-gray-900 backdrop-blur-xl"
                    : "bg-gray-100 backdrop-blur-xl"
                } transition-colors duration-300`}
              >
                <Linkedin
                  className={`w-5 h-5 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                />
              </a>
            </div>
          </div>
        </div>
  
        {/* Experiences Section */}
        <div className="px-4 mb-8">
          <h2 className="text-sm text-gray-500 uppercase mb-2">Experiences</h2>
          <div className="relative space-y-4 pl-2">
            {/* Vertical line */}
            <div className="absolute top-0 left-4 bottom-0 w-[1px] bg-gray-300 dark:bg-gray-700"></div>
            {experiences.map((exp, index) => (
              <div key={index} className="relative flex flex-col ml-6">
                <h3 className="text-md font-semibold">
                  {exp.title} @ {exp.company}
                </h3>
                <span className="text-sm text-gray-500">{exp.period}</span>
                <span className="text-sm text-gray-500">{exp.location}</span>
              </div>
            ))}
          </div>
        </div>
  
        {/* About Section */}
        <div className="px-6 mb-8">
          <h2 className="text-sm text-gray-500 uppercase mb-2">About</h2>
          <p
            className={`${
              darkMode ? "text-gray-400" : "text-gray-800"
            } text-sm`}
          >
            I am a final year student at the Singapore University of Technology
            and Design (SUTD) specializing in Design and Artificial
            Intelligence. Passionate about developing AI systems and creating
            user-centric applications.
          </p>
        </div>
  
        {/* Floating Bottom Navbar */}
        <div
          className={`fixed bottom-28 left-1/2 transform -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-full shadow-lg z-100 backdrop-blur-lg bg-opacity-20 z-100 ${
            darkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-gray-200 border border-gray-300"
          }`}
        >
          {/* Command K */}
          <button onClick={() => setIsSearchOpen(true)} className="py-2 px-2 ">
            <span className="text-sm">Ask me anything</span>
          </button>
  
          {/* Font Toggle */}
          <button onClick={toggleFont} className="p-2">
            <span className="text-md">Aa</span>
          </button>
  
          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="p-2">
            {darkMode ? (
              <Moon className="w-6 h-6" />
            ) : (
              <Sun className="w-6 h-6" />
            )}
          </button>
  
          <a
            href={resume}
            download
            className={`p-2 ${darkMode ? "text-white" : "text-black"}`}
          >
            <Download className="w-6 h-6" />
          </a>
        </div>
  
        {/* Email Form Popup */}
        {showEmailForm && (
          <div
            className={`fixed bottom-28 left-1/2 transform -translate-x-1/2 z-50 w-80 p-4 rounded-xl shadow-lg border ${
              darkMode
                ? "bg-opacity-80 bg-gray-900 border-gray-700 backdrop-blur-md"
                : "bg-opacity-90 bg-white border-gray-200 backdrop-blur-md"
            }`}
          >
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              Send an Email
            </h3>
            <span
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              to adityakuma0308@gmail.com
            </span>
            <input
              type="text"
              placeholder="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className={`w-full mb-2 p-2 mt-4 rounded border text-sm ${
                darkMode
                  ? "bg-gray-700 bg-opacity-0 text-gray-200 placeholder-gray-400 border-gray-700"
                  : "bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-400"
              }`}
            />
            <textarea
              placeholder="Message"
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              className={`w-full p-2 rounded text-sm mb-2 border ${
                darkMode
                  ? "bg-gray-700 bg-opacity-0 text-gray-200 placeholder-gray-400 border-gray-700"
                  : "bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-400"
              }`}
              rows="3"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSendEmail}
                className={`transition ${
                  darkMode
                    ? "text-white hover:text-blue-700"
                    : "text-gray-800 hover:text-orange-500"
                }`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
  
        {/* Modal for Profile Image */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-xs w-full">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-4 text-xl text-gray-200 dark:text-gray-200 hover:text-gray-300 dark:hover:text-gray-200"
              >
                &times;
              </button>
              <img
                src={profileImage}
                alt="Aditya Kumar"
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>
        )}
  
        {/* Bottom Sheet Projects */}
        <BottomSheet projects={projects} darkMode={darkMode} />
      </div>
    );
  };
  
  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-black text-gray-200" : "bg-white text-gray-800"
      } relative overflow-hidden transition-colors duration-500 ease-in-out cursor-default pb-20`} // Added "pb-20"
      onMouseMove={handleMouseMove}
    >
      {isMobile ? (
        // Mobile Layout
        <MobileLayout />
      ) : (
        <div className="max-w-lg mx-auto pt-10 relative z-10 px-4 sm:px-6 lg:max-w-3xl">
          <header className="flex items-center gap-4 mb-6 sm:mb-8">
            <img
              src={profileImage}
              alt="Aditya Kumar"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105"
            />
            <div>
              <h1 className="text-xl sm:text-2xl mb-1">
                <span
                  className={`font-bold ${
                    darkMode ? "text-blue-500" : "text-orange-500"
                  }`}
                >
                  {greetings[greetingIndex]}
                </span>
                , <span className="font-bold">I am Aditya Kumar</span>.
              </h1>
              <p
                className={`${
                  darkMode ? "text-gray-400" : "text-gray-800"
                } text-xs sm:text-sm`}
              >
                AI Engineer & Full Stack Developer based in Singapore
              </p>
            </div>
          </header>

          {/* Current Role */}
          <section className="mb-4">
            <h2 className="text-gray-500 uppercase text-xs sm:text-md mb-2">
              Currently
            </h2>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3
                  className={`${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  } mb-1`}
                >
                  {experiences[0].company}
                </h3>
                <span
                  className={`${
                    darkMode ? "text-blue-500" : "text-orange-500"
                  }`}
                >
                  {experiences[0].title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs sm:text-sm uppercase">
                  {experiences[0].period}
                </span>
                <div
                  className={`w-2 h-2 ${
                    darkMode ? "bg-blue-500" : "bg-orange-500"
                  } rounded-full`}
                ></div>
              </div>
            </div>
          </section>

          {/* Previous Roles */}
          <section className="mb-6 sm:mb-8">
            <div
              className="flex items-center gap-2 mb-2 cursor-pointer pl-2"
              onClick={() => setShowPreviousRoles(!showPreviousRoles)}
            >
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  showPreviousRoles ? "rotate-180" : "rotate-0"
                }`}
              />
              <h2 className="text-gray-500 text-xs sm:text-sm">
                Previous roles
              </h2>
            </div>
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                height: showPreviousRoles ? `${contentHeight}px` : "0px",
              }}
            >
              <div ref={previousRolesRef} className="pl-4 mt-2 space-y-4">
                {experiences.slice(1).map((exp, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-start pl-2 border-l-2 border-gray-500"
                  >
                    <div className="pl-4">
                      <h3
                        className={`${
                          darkMode ? "text-gray-200" : "text-gray-800"
                        } mb-1`}
                      >
                        {exp.company}
                      </h3>
                      <span
                        className={`${
                          darkMode ? "text-blue-500" : "text-orange-500"
                        }`}
                      >
                        {exp.title}
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs sm:text-sm uppercase">
                      {exp.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-gray-500 uppercase text-xs sm:text-md mb-2">
              About
            </h2>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-800"
              } text-xs sm:text-sm`}
            >
              I am a final year student at the Singapore University of
              Technology and Design (SUTD) specializing in Design and Artificial
              Intelligence. Passionate about developing AI systems and creating
              user-centric applications. Experienced in machine learning,
              full-stack development, and UI/UX design.
            </p>
          </section>

          {/* Projects Section */}
          <section className="mb-12 sm:mb-16">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-gray-500 uppercase text-xs sm:text-md">
                Featured Projects
              </h2>
            </div>

            {/* Featured Projects (Always Visible) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {projects.slice(0, 3).map((project, index) => (
                <a
                  key={index}
                  href={project.link}
                  className={`group relative overflow-hidden rounded-xl p-4 sm:p-6 aspect-[7/5] transition-all duration-300 hover:-translate-y-2 hover:shadow-md ${
                    darkMode
                      ? "bg-gray-900 border-gray-700"
                      : "bg-white border border-black"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* Gradient overlay only in dark mode */}
                  {darkMode && (
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                    />
                  )}
                  <div className="relative z-10">
                    <div className="mb-2">
                      <h3
                        className={`font-bold text-md ${
                          darkMode ? "text-white" : "text-black"
                        }`}
                      >
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-xs text-gray-400 transition-colors duration-300">
                      {project.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer mb-4 px-2"
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  showAllProjects ? "rotate-180" : "rotate-0"
                }`}
              />
              <span className="text-gray-500 text-xs sm:text-sm">
                {showAllProjects ? "Show less" : "Show more"}
              </span>
            </div>

            <div className="relative">
              <div
                className="transition-all duration-500 ease-in-out overflow-hidden pt-2"
                style={{
                  height: showAllProjects
                    ? `${projectsContentHeight}px`
                    : "0px",
                }}
              >
                <div
                  ref={projectsRef}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {projects.slice(3).map((project, index) => (
                    <a
                      key={index + 3}
                      href={project.link}
                      className={`group relative overflow-hidden rounded-xl p-4 sm:p-6 aspect-[7/5] transition-all duration-300 hover:-translate-y-2 hover:shadow-md ${
                        darkMode
                          ? "bg-gray-900 border-gray-700"
                          : "bg-white border border-black"
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {/* Gradient overlay only in dark mode */}
                      {darkMode && (
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                        />
                      )}
                      <div className="relative z-10">
                        <div className="mb-2">
                          <h3
                            className={`font-bold text-md ${
                              darkMode ? "text-white" : "text-black"
                            }`}
                          >
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-xs text-gray-400 transition-colors duration-300">
                          {project.description}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Email Form Popup */}
          {showEmailForm && (
            <div
              className={`fixed bottom-28 left-1/2 transform -translate-x-1/2 z-50 w-80 p-4 rounded-xl shadow-lg border ${
                darkMode
                  ? "bg-opacity-80 bg-gray-900 border-gray-700 backdrop-blur-md"
                  : "bg-opacity-90 bg-white border-gray-200 backdrop-blur-md"
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                Send an Email
              </h3>
              <span
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                to adityakuma0308@gmail.com
              </span>
              <input
                type="text"
                placeholder="Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className={`w-full mb-2 p-2 mt-4 rounded border text-sm ${
                  darkMode
                    ? "bg-gray-700 bg-opacity-0 text-gray-200 placeholder-gray-400 border-gray-700"
                    : "bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-400"
                }`}
              />
              <textarea
                placeholder="Message"
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
                className={`w-full p-2 rounded text-sm mb-2 border ${
                  darkMode
                    ? "bg-gray-700 bg-opacity-0 text-gray-200 placeholder-gray-400 border-gray-700"
                    : "bg-gray-100 text-gray-800 placeholder-gray-500 border-gray-400"
                }`}
                rows="3"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSendEmail}
                  className={`transition ${
                    darkMode
                      ? "text-white hover:text-blue-700"
                      : "text-gray-800 hover:text-orange-500"
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          <div
            className={`fixed sm:bottom-10 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-4 sm:px-2 py-2 border z-50 ${
              darkMode
                ? "bg-gray-900 border border-gray-600"
                : "bg-white border-gray-600"
            } bg-opacity-50 backdrop-blur-xl rounded-full text-sm`}
          >
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`px-3 py-2 rounded-full transition-transform transform hover:scale-110 ${
                darkMode
                  ? "bg-gray-800 text-white border border-gray-600 hover:text-blue-500"
                  : "bg-gray-200 text-black border border-gray-700 hover:text-orange-500"
              }`}
            >
              ⌘ + K
            </button>

            {/* Font Toggle Button */}
            <button
              onClick={toggleFont}
              className={`p-2 rounded-full transition-transform transform hover:scale-110 ${
                darkMode
                  ? "text-gray-200 hover:text-blue-500"
                  : "text-black hover:text-orange-500"
              }`}
            >
              Aa
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-transform transform hover:scale-110"
            >
              {darkMode ? (
                <Moon className="w-5 h-5 text-blue-400" />
              ) : (
                <Sun className="w-5 h-5 text-orange-500" />
              )}
            </button>

            {/* Resume Download Button */}
            <a
              href={resume}
              download
              className={`cursor-pointer transition-transform transform hover:scale-110 ${
                darkMode
                  ? "text-white hover:text-blue-500"
                  : "text-gray-800 hover:text-orange-500"
              } px-2 py-2`}
            >
              <Download className="w-5 h-5" />
            </a>

            {/* Email Form Toggle Button */}
            {/* <button
              onClick={() => setShowEmailForm((prev) => !prev)}
              className={`p-2 rounded-full transition-transform transform hover:scale-110 ${
                darkMode
                  ? "text-white hover:text-blue-500"
                  : "text-gray-800 hover:text-orange-500"
              }`}
            >
              <Mail className="w-5 h-5" />
            </button> */}

            {/* GitHub Link */}
            <a
              href="https://github.com/adikuma"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-transform transform hover:scale-110 ${
                darkMode
                  ? "text-white hover:text-blue-500"
                  : "text-gray-800 hover:text-orange-500"
              } px-2 py-2`}
            >
              <Github className="w-5 h-5" />
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/adikum"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-transform transform hover:scale-110 ${
                darkMode
                  ? "text-white hover:text-blue-500"
                  : "text-gray-800 hover:text-orange-500"
              } px-2 py-2`}
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}

      {/* Command K Search Modal */}
      <CommandSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Portfolio;
