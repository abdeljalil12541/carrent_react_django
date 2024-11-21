import { useEffect, useState } from 'react';
import axios from 'axios';

const CarsCategory = ({ 
    activeIndices, 
    contentRef3, 
    showFilter, 
    selectedCategories,
    onCategoryChange,
}) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/categories/');
                setCategories(response.data.data.map((category) => category.name));
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="relative transition-all border-y border-gray-600">
            <div 
                onClick={() => showFilter(3)} 
                className="w-full pl-3 py-4 text-left cursor-pointer"
            >
                <div className="flex items-center">
                    <span className={`transition-transform pr-1 duration-300 transform ${activeIndices.includes(3) ? "rotate-90" : ""}`}>
                        <svg viewBox="0 0 20 20" height={22} xmlns="http://www.w3.org/2000/svg" fill="#ffffff">
                            <path d="M8 6l6 4.03L8 14V6z"></path>
                        </svg>
                    </span>
                    <span className="tracking-wide">Catégorie de voiture</span>
                </div>
            </div>
            <div
                ref={contentRef3}
                className="relative overflow-hidden transition-all duration-300"
                style={{
                    maxHeight: activeIndices.includes(3) ? 
                        contentRef3?.current?.scrollHeight ? `${contentRef3.current.scrollHeight}px` : "500px" : "0px"
                }}
            >
                <section className="mb-2">
                    {categories.map((category, index) => (
                        <div key={index} className="px-6 pb-1 bg-neutral-950 text-white flex items-center">
                            <div className="inline-flex items-center">
                                <label className="flex mr-2 items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        onChange={() => onCategoryChange(category)}
                                        id={category}
                                        className="peer h-5 w-5 cursor-pointer transition-all appearance-none shadow hover:shadow-md border border-slate-300 hover:border-red-600 duration-150 checked:bg-red-600 checked:border-red-600"
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </label>
                                <label htmlFor={category} style={{ fontSize: '12px' }} className="cursor-pointer">{category}</label>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default CarsCategory;