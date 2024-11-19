import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';



// Currency conversion rates object
const CURRENCY_RATES = {
  'MAD': 1,      // Base currency (MAD)
  'USD': 0.095,  // 1 MAD = 0.095 USD
  'EUR': 0.081   // 1 MAD = 0.081 EUR
};

// Currency display configuration
const CURRENCY_CONFIG = {
  'MAD': { symbol: 'DH', position: 'after' },
  'USD': { symbol: '$', position: 'before' },
  'EUR': { symbol: '€', position: 'after' }
};

// Format price with currency
const formatPrice = (price, currencyCode) => {
  const config = CURRENCY_CONFIG[currencyCode];
  const formattedNumber = price.toFixed(0);
  
  return config.position === 'before' 
    ? `${config.symbol}${formattedNumber}`
    : `${formattedNumber} ${config.symbol}`;
};

// Convert price between currencies
const convertPrice = (price, fromCurrency, toCurrency) => {
  // If the target currency is MAD, return the price directly
  if (toCurrency === 'MAD dh') {
      return price; // No conversion needed
  }

  // First convert to MAD (base currency)
  const priceInMAD = fromCurrency === 'MAD dh' 
    ? price 
    : price / CURRENCY_RATES[fromCurrency];
  
  // Then convert to target currency
  return toCurrency === 'MAD dh' 
    ? priceInMAD 
    : priceInMAD * CURRENCY_RATES[toCurrency];
};


const PriceFilter = ({ activeIndices, contentRef2, showFilter, onFilterPriceChange, selectedCurrency }) => {
  const [maxPrice, setMaxPrice] = useState();
  const [minPrice, setMinPrice] = useState();

  // Extract currency code from selectedCurrency or default to MAD
  const currencyCode = selectedCurrency ? selectedCurrency.split(' ')[0] : 'MAD dh';

  // Format price with currency symbol
  const displayMinPrice = formatPrice(convertPrice(minPrice, 'MAD dh', currencyCode), currencyCode);
  const displayMaxPrice = formatPrice(convertPrice(maxPrice, 'MAD dh', currencyCode), currencyCode);

  const minPriceForScale = parseInt(displayMinPrice.replace(/[^\d.-]/g, ''));
  const maxPriceForScale = parseInt(displayMaxPrice.replace(/[^\d.-]/g, ''));

  useEffect(() => {
    const fetchPriceFilter = async () => {
      try {
        const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/price-filter/');
        setMinPrice(response.data.min_price);
        setMaxPrice(response.data.max_price);
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchPriceFilter();
  }, []);

  const [thumb1Position, setThumb1Position] = useState(0);
  const [thumb2Position, setThumb2Position] = useState(100);
  const sliderRef = useRef(null);
  const isDraggingRef = useRef(null);

  useEffect(() => {
    createScale();
  }, []);

  const setPosition = (thumbIndex, percent) => {
    percent = Math.min(Math.max(percent, 0), 100);
    
    if (thumbIndex === 1) {
      setThumb1Position(Math.min(percent, thumb2Position - 1));
    } else {
      setThumb2Position(Math.max(percent, thumb1Position + 1));
    }
  };

  const updateFill = () => {
    const left = Math.min(thumb1Position, thumb2Position);
    const width = Math.abs(thumb2Position - thumb1Position);
    return { left: `${left}%`, width: `${width}%` };
  };

  const createScale = () => {
    const step = (maxPriceForScale - minPriceForScale) / 5;
    const scale = [];
    for (let i = 0; i <= 5; i++) {
      const isLongTick = i % 1 === 0;
      const tickValue = Math.round(minPriceForScale + step * i);
      scale.push(
        <div
          key={i}
          className={`tick ${isLongTick ? 'long' : 'small'}`}
          style={{ left: `${i * 20}%` }}
        >
          {isLongTick && (
            <span className="tick-label" style={{ left: `${i * 20}%` }}>
              {tickValue}
            </span>
          )}
        </div>
      );
    }
    return scale;
  };

  const determineClosestThumb = (clickPercent) => {
    const distanceToThumb1 = Math.abs(clickPercent - thumb1Position);
    const distanceToThumb2 = Math.abs(clickPercent - thumb2Position);
    return distanceToThumb1 < distanceToThumb2 ? 1 : 2;
  };

  const onSliderClick = (e) => {
    if (e.target.classList.contains('thumb')) return; // Let thumb handling work as before
    
    const rect = sliderRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    
    // Determine which thumb to move based on click position
    const closestThumb = determineClosestThumb(percent);
    isDraggingRef.current = closestThumb;
    setPosition(closestThumb, percent);
  };

  const onMouseMove = (e) => {
    if (isDraggingRef.current === null) return;

    const rect = sliderRef.current.getBoundingClientRect();
    let percent = ((e.clientX - rect.left) / rect.width) * 100;
    percent = Math.min(Math.max(percent, 0), 100);

    if (isDraggingRef.current === 1) {
      if (percent <= thumb2Position - 1) {
        setPosition(1, percent);
      }
    } else if (isDraggingRef.current === 2) {
      if (percent >= thumb1Position + 1) {
        setPosition(2, percent);
      }
    }
  };

  const onMouseDown = (e, thumbIndex) => {
    e.stopPropagation(); // Prevent the slider click handler from firing
    isDraggingRef.current = thumbIndex;
  };

  const onMouseUp = () => {
    isDraggingRef.current = null;
  };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [thumb1Position, thumb2Position]);

  const getSelectedPriceRange = () => {
    const low = minPrice + ((thumb1Position / 100) * (maxPrice - minPrice));
    const high = minPrice + ((thumb2Position / 100) * (maxPrice - minPrice));
    
    return {
      low: Math.round(Math.min(low, high)),
      high: Math.round(Math.max(low, high))
    };
  };

  const handleFilterClick = () => {
    const selectedRange = getSelectedPriceRange();
    onFilterPriceChange(selectedRange);
  };


  return (
    <div className="relative -mt-0 transition-all">
      <div onClick={() => showFilter(2)} className="w-full pl-3 py-4 text-left cursor-pointer">
        <div className="flex items-center">
          <span
            className={`transition-transform pr-1 duration-300 transform ${activeIndices.includes(2) ? 'rotate-90' : ''}`}
          >
            <svg viewBox="0 0 20 20" height={22} xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
              <rect x="0" fill="none" width="20" height="20"></rect>
              <g>
                <path d="M8 6l6 4.03L8 14V6z"></path>
              </g>
            </svg>
          </span>
          <span className="tracking-wide">Price</span>
        </div>
      </div>
      <div
        ref={contentRef2}
        className="relative overflow-hidden transition-all duration-300"
        style={{
          maxHeight: contentRef2.current ? (activeIndices.includes(2) ? `${contentRef2.current.scrollHeight}px` : '0px') : '0px',
        }}
      >
        <div className="w-full px-6 pb-4 text-gray-600 App">
          <div>
            <div className="w-full flex justify-between text-sm text-gray-200">
              <p>{displayMinPrice}</p>
              <p>{displayMaxPrice}</p>
            </div>

            <div className="slider-container text-gray-200">
              <div 
                className="slider" 
                ref={sliderRef}
                onMouseDown={onSliderClick}
              >
                <div className="fill" style={updateFill()}></div>
                <div
                  className="thumb"
                  style={{ left: `${thumb1Position}%` }}
                  onMouseDown={(e) => onMouseDown(e, 1)}
                ></div>
                <div
                  className="thumb"
                  style={{ left: `${thumb2Position}%` }}
                  onMouseDown={(e) => onMouseDown(e, 2)}
                ></div>
              </div>
              <div className="scale">{createScale()}</div>
            </div>

            <button
              onClick={handleFilterClick}
              className="text-gray-200 bg-red-600 mb-1 py-2 px-4 hover:bg-red-500 rounded"
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;