import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";


const Tab = ({ index, children }) => {
  const [activeTab, setActiveTab] = useState(0);


  return (
    <div index={index}>{children}</div>

  );
};

export default Tab;
