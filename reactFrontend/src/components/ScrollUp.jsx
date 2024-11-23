import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [showGoTop, setShowGoTop] = useState(false); // Use boolean for visibility

  const handleVisibleButton = () => {
    const position = window.pageYOffset;
    setShowGoTop(position > 150); // Show button if scrolled down more than 150px
  };

  useEffect(() => {
    window.addEventListener("scroll", handleVisibleButton);
    
    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleVisibleButton);
    };
  }, []); // Empty dependency array to run only on mount and unmount

  const handleScrollUp = () => {
    const scrollStep = -window.scrollY / (500 / 15); // Calculate scroll step
    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep); // Scroll by the calculated step
      } else {
        clearInterval(scrollInterval); // Clear interval when at the top
      }
    }, 10); // Adjust the interval for smoother scrolling
  };

  return (
    showGoTop && ( // Render the button only if showGoTop is true
      <div 
        onClick={handleScrollUp} 
        style={{ position: 'fixed', right: '15px', bottom: '22px', zIndex: '9999', cursor: 'pointer' }}
      >
        <div className="bg-[#c53030] h-8 w-8 ScrollBackBtn">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M17 15L12 10L7 15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </svg>
        </div>
      </div>
    )
  );
}