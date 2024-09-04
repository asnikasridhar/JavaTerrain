import React, { useState, useEffect } from 'react';
import './Home.css'; // Adjust the path as needed



const Home = () => {

  
useEffect(()=>{

  let userData = JSON.stringify({"userId":1, "propertyId":[1,2]});
  localStorage.setItem("userDetails",userData);
  localStorage.setItem("selProperty","1");

})

  return (
    <div className="home-container">
      <div className="text-center">
        <h2>Welcome to the Coffee Estate Management System</h2>
        <p>Select an option from the menu above to get started.</p>
      </div>
    </div>
  );
};

export default Home;
