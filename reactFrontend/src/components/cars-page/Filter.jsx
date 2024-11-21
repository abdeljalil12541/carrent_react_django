import React, { useState, useRef, useEffect } from "react";
import "tailwindcss/tailwind.css";
import PriceFilter from "./PriceFilter";
import FeaturesFilter from './FeaturesFilter';
import CarsCategory from "./CarCategory"; // Ensure this matches the correct file name
import PickupFeatures from "./PickupFeatures";
import DefaultEquipment from './DefaultEquipment';

const Filter = ({ selectedCurrency, selectedCategories, onCategoryChange, selectedPickupFeature, onPickupFeatureChange, selectedDefaultEquipement, onDefaultEquipementChange, selectedFeatures, onFeatureChange, filteredCarPrice, onFilterPriceChange }) => {
  const [activeIndices, setActiveIndices] = useState([]); // Tracks which accordions are open
  const contentRef1 = useRef(null);
  const contentRef2 = useRef(null);
  const contentRef3 = useRef(null);
  const contentRef4 = useRef(null);
  const contentRef5 = useRef(null);
  
  const [isInitialized, setIsInitialized] = useState(false); // Ensures logic runs only once after reload
  const [isScrolling, setIsScrolling] = useState(false); // Tracks if scrolling is happening

  const isMobile = () => window.innerWidth <= 766;

useEffect(() => {
  if (!isInitialized) {
    if (isMobile()) {
      setActiveIndices([]); // Close all filters on mobile
    }
    setIsInitialized(true); // Mark as initialized
  }

  const handleResize = () => {
    if (isMobile()) {
      setActiveIndices([]); // Close all filters on mobile
    } else {
      setActiveIndices([1, 2, 3, 4, 5]); // Open all filters on desktop
    }
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, [isInitialized]);

useEffect(() => {
  let scrollTimeout;

  const handleScroll = () => {
    setIsScrolling(true);
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      setIsScrolling(false);
    }, 200); // Adjust delay as needed
  };

  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
    clearTimeout(scrollTimeout);
  };
}, []);

const showFilter = (index) => {
  if (isScrolling) {
    return; // Ignore clicks during scrolling
  }
  setActiveIndices((prev) =>
    prev.includes(index)
      ? prev.filter((i) => i !== index) // Close this one
      : [...prev, index] // Open this one and keep others
  );
};

  

  // Handle category change and call the parent's handler
  const handleCategoryChange = (category) => {
    onCategoryChange(category);
  };

  const handlePriceFilteringChange = (price) => {
    onFilterPriceChange(price);
  };

  const handlePickupFeatureChange = (pickupFeature) => {
    onPickupFeatureChange(pickupFeature);
  };

  const handleFeatureChange = (feature) => {
    onFeatureChange(feature);
  };

  const handleDefaultEquipementChange = (DefaultEquipement) => {
    onDefaultEquipementChange(DefaultEquipement);
  };

  return (
    <div className="max-w-5xl w-full py-0 mx-auto mt-9 mr-4 tracking-wide">
      {/* Accordion */}
      <div className="rounded grid pt-8 mb-4 text-lg bg-neutral-950 leading-6 text-gray-100 md:gap-0 md:grid-cols-1">
        {/* Accordion Item 1 */}
        <CarsCategory
          activeIndices={activeIndices}
          contentRef3={contentRef3}
          showFilter={showFilter}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange} // Pass handler
        />
            
        <PriceFilter
          selectedCurrency={selectedCurrency}
          
          activeIndices={activeIndices}
          contentRef2={contentRef2}
          showFilter={showFilter}
          filteredCarPrice={filteredCarPrice}
          onFilterPriceChange={handlePriceFilteringChange}
        />

        <PickupFeatures
          activeIndices={activeIndices}
          contentRef4={contentRef4}
          showFilter={showFilter}
          selectedPickupFeature={selectedPickupFeature}
          onPickupFeatureChange={handlePickupFeatureChange}
        />

        <FeaturesFilter
          activeIndices={activeIndices}
          contentRef1={contentRef1}
          showFilter={showFilter}
          selectedFeatures={selectedFeatures}
          onFeatureChange={handleFeatureChange}
        />

        <DefaultEquipment
          activeIndices={activeIndices}
          contentRef5={contentRef5}
          showFilter={showFilter}
          selectedDefaultEquipement={selectedDefaultEquipement}
          onDefaultEquipementChange={handleDefaultEquipementChange}
        />      
      </div>
    </div>
  );
};

export default Filter;
