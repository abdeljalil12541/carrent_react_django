import { useEffect, useState } from 'react';
import axios from 'axios';

const FeaturesFilter = ({ activeIndices, contentRef1, showFilter, onFeatureChange }) => {

    const [features, setFeatures] = useState([])

    useEffect(() => {
        const fetchFeatures = async () => {
            try {
                const response = await axios.get('https://carrent-polished-shadow-812.fly.dev/api/features/');
                setFeatures(response.data.data.map((feature) => feature.name))
                } catch (error) {
                console.error('Error fetching features:', error);
            } 
        };

        fetchFeatures();
    }, []);

    return(
        <div className="relative transition-all border-t border-gray-600">
            <div onClick={() => showFilter(1)} className="w-full pl-3 py-4 text-left cursor-pointer">
                <div className="flex items-center">
                    <span className={`transition-transform pr-1 duration-300 transform ${activeIndices.includes(1) ? "rotate-90" : ""}`}>
                    <svg viewBox="0 0 20 20" height={22} xmlns="http://www.w3.org/2000/svg" fill="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="0" fill="none" width="20" height="20"></rect> <g> <path d="M8 6l6 4.03L8 14V6z"></path> </g> </g></svg>
                    </span>
                    <span className="tracking-wide">Caractéristiques</span>
                </div>
            </div>
            <div
                ref={contentRef1}
                className="relative overflow-hidden transition-all duration-300"
                style={{
                    maxHeight: contentRef1.current ? activeIndices.includes(1) ? `${contentRef1.current.scrollHeight}px` : "0px": "0px",
                }}
                >
                    
                <section className="mb-2">
                    {features.map((feature, index) => (
                        <div key={index} className="px-6 pb-1 bg-neutral-950 text-white flex items-center">
                        <div class="inline-flex items-center">
                            <label class="flex mr-2 items-center cursor-pointer relative">
                            <input 
                                id={feature} 
                                type="checkbox" 
                                class="peer h-5 w-5 cursor-pointer transition-all appearance-none shadow hover:shadow-md border border-slate-300 hover:border-red-600 duration-150 checked:bg-red-600 checked:border-red-600" 
                                onChange={() => onFeatureChange(feature)}
                            />
                            <span class="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" stroke-width="1">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                            </svg>
                            </span>
                            </label>
                            <label htmlFor={feature} style={{fontSize: '12px'}} className="cursor-pointer">{feature}</label>
                        </div>
                        </div>
                    ))}
                    </section>
            </div>
        </div>
    )
}

export default FeaturesFilter;