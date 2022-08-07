import React, { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ children, tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full md:min-w-[40vw] lg:min-w-[30vw]">
      {/* <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md"
          defaultValue={tabs.pop()}
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select> */}
      {/* </div> */}
      <div className="block">
        {/* <div className="hidden sm:block"> */}
        <nav
          className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <span
              key={tab.name}
              className={classNames(
                tab.current
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 cursor-pointer"
              )}
              aria-current={tab.current ? "page" : undefined}
              onClick={() => setActiveTab(tabIdx)}
            >
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tabIdx === activeTab ? "bg-orange-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </span>
          ))}
        </nav>
      </div>
      <div className="transition-all duration-150 ease-in-out">
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(
            child,
            index !== activeTab
              ? {
                  style: {
                    display: "none",
                  },
                }
              : {}
          );
        })}
      </div>
    </div>
  );
}
