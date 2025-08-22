import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";


const Tabs = (props) => {

  var children = props.children;
  var tabs = props.tabs;
  var navsWrapperClass = props.navsWrapperClass ?? "flex justify-center gap-2";
  var tabPanelClass = props.tabPanelClass;
  var navsItemClass = props.navsItemClass ?? "bg-gray-500 text-white rounded-sm px-5 py-2 cursor-pointer";
  var navsItemActiveClass = props.navsItemClass ?? "bg-gray-800 text-white rounded-sm px-5 py-2 cursor-pointer";


  const [activeTab, setActiveTab] = useState(0);
  const childrenArray = React.Children.toArray(children);


  return (
    <div className="w-full  mx-auto ">
      <div className={`flex flex-wrap ${navsWrapperClass}`}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${navsItemClass} ${activeTab === index
              ? navsItemActiveClass
              : " "
              }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className={`${tabPanelClass} mt-4 p-4`}>
        {childrenArray.find(child => child.props.index === activeTab)}
      </div>
    </div>


  );
};

export default Tabs;
