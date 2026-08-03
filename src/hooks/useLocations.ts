"use client";
import { useState, useEffect } from "react";
import { locationApi } from "@/lib/api";

export interface CountryItem {
  countryCode: number;
  name: string;
  sortName?: string;
}

export interface StateItem {
  stateCode: number;
  name: string;
  countryCode: number;
}

export interface CityItem {
  cityCode: number;
  name: string;
  stateCode: number;
}

// Initial fallback Indian states
const DEFAULT_INDIAN_STATES: StateItem[] = [
  { stateCode: 1, name: "Andaman and Nicobar Islands", countryCode: 101 },
  { stateCode: 2, name: "Andhra Pradesh", countryCode: 101 },
  { stateCode: 3, name: "Arunachal Pradesh", countryCode: 101 },
  { stateCode: 4, name: "Assam", countryCode: 101 },
  { stateCode: 5, name: "Bihar", countryCode: 101 },
  { stateCode: 6, name: "Chandigarh", countryCode: 101 },
  { stateCode: 7, name: "Chhattisgarh", countryCode: 101 },
  { stateCode: 8, name: "Dadra and Nagar Haveli", countryCode: 101 },
  { stateCode: 9, name: "Daman and Diu", countryCode: 101 },
  { stateCode: 10, name: "Delhi", countryCode: 101 },
  { stateCode: 11, name: "Goa", countryCode: 101 },
  { stateCode: 12, name: "Gujarat", countryCode: 101 },
  { stateCode: 13, name: "Haryana", countryCode: 101 },
  { stateCode: 14, name: "Himachal Pradesh", countryCode: 101 },
  { stateCode: 15, name: "Jammu and Kashmir", countryCode: 101 },
  { stateCode: 16, name: "Jharkhand", countryCode: 101 },
  { stateCode: 17, name: "Karnataka", countryCode: 101 },
  { stateCode: 19, name: "Kerala", countryCode: 101 },
  { stateCode: 20, name: "Lakshadweep", countryCode: 101 },
  { stateCode: 21, name: "Madhya Pradesh", countryCode: 101 },
  { stateCode: 22, name: "Maharashtra", countryCode: 101 },
  { stateCode: 23, name: "Manipur", countryCode: 101 },
  { stateCode: 24, name: "Meghalaya", countryCode: 101 },
  { stateCode: 25, name: "Mizoram", countryCode: 101 },
  { stateCode: 26, name: "Nagaland", countryCode: 101 },
  { stateCode: 29, name: "Odisha", countryCode: 101 },
  { stateCode: 31, name: "Pondicherry", countryCode: 101 },
  { stateCode: 32, name: "Punjab", countryCode: 101 },
  { stateCode: 33, name: "Rajasthan", countryCode: 101 },
  { stateCode: 34, name: "Sikkim", countryCode: 101 },
  { stateCode: 35, name: "Tamil Nadu", countryCode: 101 },
  { stateCode: 36, name: "Telangana", countryCode: 101 },
  { stateCode: 37, name: "Tripura", countryCode: 101 },
  { stateCode: 38, name: "Uttar Pradesh", countryCode: 101 },
  { stateCode: 39, name: "Uttarakhand", countryCode: 101 },
  { stateCode: 41, name: "West Bengal", countryCode: 101 },
];

export function useLocations(selectedCountryName: string = "India", selectedStateName: string = "") {
  const [countries, setCountries] = useState<CountryItem[]>([]);
  const [states, setStates] = useState<StateItem[]>(DEFAULT_INDIAN_STATES);
  const [cities, setCities] = useState<CityItem[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch all countries on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCountries() {
      setLoadingCountries(true);
      const data = await locationApi.getCountries();
      if (isMounted && data && data.length > 0) {
        setCountries(data);
      }
      setLoadingCountries(false);
    }
    loadCountries();
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch states whenever selected country changes
  useEffect(() => {
    let isMounted = true;
    async function loadStates() {
      if (!selectedCountryName) {
        setStates([]);
        return;
      }

      // Find country object to get its countryCode
      const matchedCountry = countries.find(
        (c) => c.name.toLowerCase() === selectedCountryName.toLowerCase()
      );

      const code = matchedCountry ? matchedCountry.countryCode : (selectedCountryName.toLowerCase() === "india" ? 101 : undefined);

      if (code !== undefined) {
        setLoadingStates(true);
        const data = await locationApi.getStates(code);
        if (isMounted) {
          if (data && data.length > 0) {
            setStates(data);
          } else if (code === 101) {
            setStates(DEFAULT_INDIAN_STATES);
          } else {
            setStates([]);
          }
        }
        setLoadingStates(false);
      } else {
        // If not found yet, and is India, keep default Indian states
        if (selectedCountryName.toLowerCase() === "india") {
          setStates(DEFAULT_INDIAN_STATES);
        } else {
          setStates([]);
        }
      }
    }

    loadStates();
    return () => {
      isMounted = false;
    };
  }, [selectedCountryName, countries]);

  // Fetch cities whenever selected state changes
  useEffect(() => {
    let isMounted = true;
    async function loadCities() {
      if (!selectedStateName) {
        setCities([]);
        return;
      }

      // Find state object to get its stateCode
      const matchedState = states.find(
        (s) => s.name.toLowerCase() === selectedStateName.toLowerCase()
      );

      if (matchedState && matchedState.stateCode) {
        setLoadingCities(true);
        const data = await locationApi.getCities(matchedState.stateCode);
        if (isMounted) {
          setCities(data || []);
        }
        setLoadingCities(false);
      } else {
        setCities([]);
      }
    }

    loadCities();
    return () => {
      isMounted = false;
    };
  }, [selectedStateName, states]);

  return {
    countries,
    states,
    cities,
    loadingCountries,
    loadingStates,
    loadingCities,
  };
}
