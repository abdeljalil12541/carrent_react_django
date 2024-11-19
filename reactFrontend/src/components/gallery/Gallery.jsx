import AboutHeaderImg from '../../styles/images/about-header.jpg';
import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import BrandSlider from '../Brands';
import Location from '../Location';
import axios from 'axios';


const Gallery = () => {
    const [galleries, setGalleries] = useState([])
    const [galleriesCategories, setGalleriesCategory] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const GelleryCategory = async () => {
            try{
                const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/gallery-categroy/')
                setGalleriesCategory(response.data)
                console.log('galleries category', response.data)
            }
            catch(error)  {
                console.log('error', error)
            }
        }
        GelleryCategory();
    }, [])

    useEffect(() => {
        const Gellery = async () => {
            try{
                const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/gallery/')
                setGalleries(response.data)
                console.log('galleries', response.data)
            }
            catch(error)  {
                console.log('error', error)
            }
        }
        Gellery();
    }, [])

    const [activeCategory, setActiveCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const imagesPerPage = 6; // Show 3 images per page

    const categories = [{ id: 'all', label: 'Show All' }].concat(
        galleriesCategories.map(category => ({
            id: category.title,
            label: category.title,
        }))
    );
    

    const images = galleries.map(gallery => ({
        id: gallery.id,
        src: `https://carrentreactdjango-production.up.railway.app/${gallery.image}`,
        category: gallery.category.title,
        alt: gallery.title,
    }))
    

    // Filter images based on active category
    const filteredImages = activeCategory === 'all' 
        ? images 
        : images.filter(img => img.category === activeCategory);

    // Calculate the total number of pages
    const pageCount = Math.ceil(filteredImages.length / imagesPerPage);

    // Get the images for the current page
    const startIndex = (currentPage - 1) * imagesPerPage;
    const paginatedImages = filteredImages.slice(startIndex, startIndex + imagesPerPage);

    // Handle page change
    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    return (
        <div className='w-full mx-auto'>
            <div className='w-full relative'>
                <img className='w-full h-56 object-cover' src={AboutHeaderImg} alt="" />
                <div className='aboutUsBg'></div>
                <div className='aboutUsContent w-full flex justify-center items-center'>
                    <div>
                        <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-white'>Galeqsdqrie</p>
                        <p className='text-center mt-4 font-semibold text-white'>Home / <span className='text-red-600'>Contact Us</span></p>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-6xl mx-auto px-4 py-8">
                {/* Category Navigation */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map(category => (
                        <div key={category.id} className="relative inline-block">
                        {activeCategory === category.id ? (
                            <div className="">
                            <div className="bg-red-500 text-white  px-6 py-2 rounded">
                            {category.label}
                            </div>
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-[-4px] w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-red-500"></div>
                            </div>
                        ) : (
                            <button
                            onClick={() => {setActiveCategory(category.id); setCurrentPage(1)}}
                            className="px-6 py-2 rounded-md transition-colors bg-gray-100 hover:bg-gray-200"
                            >
                            {category.label}
                            </button>
                        )}
                        </div>
                    ))}
                </div>

                {/* Image Grid */}
                {paginatedImages.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedImages.map((image) => (
                            <div 
                                key={image.id} 
                                className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="w-full pt-[75%] relative">
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-lg font-semibold">{image.alt}</p>
                                        <p className="text-sm capitalize">{image.category}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No images found in this category</p>
                    </div>
                )}

                {/* Pagination */}
                {pageCount > 1 && (
                    <div className="w-full my-9 flex justify-center">
                        <Pagination 
                            shape='rounded' 
                            count={pageCount} 
                            page={currentPage} 
                            onChange={handlePageChange} 
                            variant='outlined'
                        />
                    </div>
                )}
            </div>

            <BrandSlider />
            <Location />
        </div>
    );
};

export default Gallery;



// const categories = [
//     { id: 'all', label: 'Show All' },
//     { id: 'brakes', label: 'Brakes' },
//     { id: 'wheels', label: 'Wheels' },
//     { id: 'suspension', label: 'Suspension' },
//     { id: 'steering', label: 'Steering' },
// ];

// const images = [
//     { id: 1, src: 'https://fnqcarrental.com/wp-content/uploads/2024/08/IMG_7087.jpeg', category: 'brakes', alt: 'Brake System' },
//     { id: 2, src: 'https://www.carrentalgateway.com/_astro/hero-phone.2TLJXHN5_7ahkX.webp', category: 'wheels', alt: 'Wheel Service' },
//     { id: 3, src: 'https://easywayrentacar.com/fotos/blogs/foto-1610564892.jpg', category: 'steering', alt: 'Car Interior' },
//     { id: 4, src: 'https://d2n7lymu30cgf.cloudfront.net/assets/images/gallery/g_gal_12.jpg', category: 'suspension', alt: 'Classic Car' },
//     { id: 5, src: 'https://d2n7lymu30cgf.cloudfront.net/assets/images/gallery/g_gal_2.jpg', category: 'brakes', alt: 'Speedometer' },
//     { id: 6, src: 'https://d2n7lymu30cgf.cloudfront.net/assets/images/gallery/g_gal_1.jpg', category: 'wheels', alt: 'Steering Wheel' },
//     { id: 7, src: 'https://d2n7lymu30cgf.cloudfront.net/assets/images/gallery/g_gal_9.jpg', category: 'brakes', alt: 'Steering Wheel' },
//     { id: 8, src: 'https://d2n7lymu30cgf.cloudfront.net/assets/images/gallery/g_gal_5.jpg', category: 'suspension', alt: 'Steering Wheel' },
//     { id: 9, src: 'https://d2n7lymu30cgf.cloudfront.net/assets/images/gallery/g_gal_6.jpg', category: 'suspension', alt: 'Steering Wheel' },
//     { id: 10, src: 'https://orlandoairports.net/site/uploads/rental-car.jpg', category: 'steering', alt: 'Steering Wheel' },
//     { id: 11, src: 'https://d2n7lymu30cgf.cloudfront.net/assets/images/gallery/g_gal_8.jpg', category: 'brakes', alt: 'Steering Wheel' },
//     { id: 12, src: 'https://d2n7lymu30cgf.cloudfront.net/assets/images/gallery/g_gal_11.jpg', category: 'suspension', alt: 'Steering Wheel' },
// ];