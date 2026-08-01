import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_URL } from '../lib/api'; // Ensure this points to your backend URL

const SeoContext = createContext();

export const SeoProvider = ({ children }) => {
  const [seoData, setSeoData] = useState([]);
  const [customSeo, setCustomSeo] = useState(null);

  useEffect(() => {
    const fetchSeoData = async () => {
      try {
        const response = await fetch(`${API_URL}/seo`);
        const data = await response.json();
        if (data.success) {
          setSeoData(data.data);
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      }
    };

    fetchSeoData();
  }, []);

  return (
    <SeoContext.Provider value={{ seoData, customSeo, setCustomSeo }}>
      {children}
    </SeoContext.Provider>
  );
};

export const useSeo = () => useContext(SeoContext);
