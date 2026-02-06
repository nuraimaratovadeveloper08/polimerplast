import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTopPage: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; 
};

export default ScrollToTopPage;