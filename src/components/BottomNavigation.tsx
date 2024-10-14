import React from 'react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Tab[];
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-10 backdrop-blur-md">
      <ul className="flex justify-around">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex-1">
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full py-4 flex flex-col items-center ${
                activeTab === tab.id ? 'text-yellow-300' : 'text-white'
              }`}
            >
              {tab.icon}
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomNavigation;