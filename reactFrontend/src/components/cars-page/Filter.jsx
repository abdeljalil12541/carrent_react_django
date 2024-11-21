import React, { useState, useRef, useEffect } from "react";
import "tailwindcss/tailwind.css";
import PriceFilter from "./PriceFilter";
import FeaturesFilter from './FeaturesFilter';
import CarsCategory from "./CarCategory"; // Ensure this matches the correct file name
import PickupFeatures from "./PickupFeatures";
import DefaultEquipment from './DefaultEquipment';

const Filter = ({ selectedCurrency, selectedCategories, onCategoryChange, selectedPickupFeature, onPickupFeatureChange, selectedDefaultEquipement, onDefaultEquipementChange, selectedFeatures, onFeatureChange, filteredCarPrice, onFilterPriceChange }) => {
  const [activeIndices, setActiveIndices] = useState([]);
  const contentRef1 = useRef(null);
  const contentRef2 = useRef(null);
  const contentRef3 = useRef(null);
  const contentRef4 = useRef(null);
  const contentRef5 = useRef(null);
  
  const [isInitialized, setIsInitialized] = useState(false);
  const touchStartY = useRef(null);
  const isTouchMove = useRef(false);
  
  const isMobile = () => window.innerWidth <= 766;

  useEffect(() => {
    if (!isInitialized) {
      if (isMobile()) {
        setActiveIndices([]); 
      }
      setIsInitialized(true);
    }

    const handleResize = () => {
      if (isMobile()) {
        setActiveIndices([]); 
      } else {
        setActiveIndices([1, 2, 3, 4, 5]); 
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isInitialized]);

  // Handle touch start
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    isTouchMove.current = false;
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!touchStartY.current) return;
    
    const touchY = e.touches[0].clientY;
    const diff = Math.abs(touchY - touchStartY.current);
    
    // If finger moved more than 10px, consider it a scroll
    if (diff > 10) {
      isTouchMove.current = true;
    }
  };

  // Handle touch end and filter toggle
  const showFilter = (index, e) => {
    // If this was a touch event and we detected movement, don't toggle
    if (e?.type?.startsWith('touch') && isTouchMove.current) {
      return;
    }

    setActiveIndices((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
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
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        />
            
        <PriceFilter
          selectedCurrency={selectedCurrency}
          
          activeIndices={activeIndices}
          contentRef2={contentRef2}
          showFilter={showFilter}
          filteredCarPrice={filteredCarPrice}
          onFilterPriceChange={handlePriceFilteringChange}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        />

        <PickupFeatures
          activeIndices={activeIndices}
          contentRef4={contentRef4}
          showFilter={showFilter}
          selectedPickupFeature={selectedPickupFeature}
          onPickupFeatureChange={handlePickupFeatureChange}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        />

        <FeaturesFilter
          activeIndices={activeIndices}
          contentRef1={contentRef1}
          showFilter={showFilter}
          selectedFeatures={selectedFeatures}
          onFeatureChange={handleFeatureChange}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        />

        <DefaultEquipment
          activeIndices={activeIndices}
          contentRef5={contentRef5}
          showFilter={showFilter}
          selectedDefaultEquipement={selectedDefaultEquipement}
          onDefaultEquipementChange={handleDefaultEquipementChange}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        />      
      </div>
    </div>
  );
};

export default Filter;
