import React, { useEffect, useContext } from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { token } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    // If no token, redirect to login
    if (!token || !localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
    </div>
  );
};

export default Home;
