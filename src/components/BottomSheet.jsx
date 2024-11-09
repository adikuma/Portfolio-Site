import React, { useState } from 'react';
import { ArrowRight, X, ChevronUp } from 'lucide-react';

const ProjectsBottomSheet = ({ projects, darkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDoubleClick = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={`fixed left-0 right-0 transition-transform duration-500 ease-in-out z-40
        ${isExpanded ? 'bottom-0 h-[90vh]' : 'bottom-[-65vh] h-[75vh]'}
        ${darkMode 
          ? 'bg-gray-900 bg-opacity-80 border-t border-gray-800' 
          : 'bg-white bg-opacity-80 border-t border-gray-200'} 
        backdrop-blur-lg rounded-t-3xl shadow-lg`}
      onDoubleClick={handleDoubleClick}
    >
      {/* Header */}
      <div className="sticky top-0 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm text-gray-500 uppercase">Projects</h2>
          <ChevronUp className={`w-4 h-4 text-gray-500 transition-transform duration-300 
            ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </div>
        {isExpanded && (
          <button 
            onClick={handleClose}
            className={`p-2 rounded-full ${
              darkMode 
                ? 'bg-gray-800 text-gray-400' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Draggable Indicator */}
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
        <div className={`w-12 h-1 rounded-full my-2 ${
          darkMode ? 'bg-gray-700' : 'bg-gray-300'
        }`} />
      </div>

      {/* Projects List */}
      <div className="px-6 overflow-y-auto h-full pb-20">
        <div className="space-y-3">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-between group px-4 py-7 transition-colors duration-300 border rounded-lg ${
                darkMode ? 'border-gray-700' : 'border-gray-300'
              }`}
            >
              <div>
                <h3 className={`text-md font-medium transition-colors ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                <h6 className={`text-xs transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {project.description}
                </h6>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsBottomSheet;