import { SquareCheckBig } from 'lucide-react'
import AboutHeaderImg from '../../styles/images/about-header.jpg'
import AboutBannerMorocco from '../../styles/images/banner-morocco.png'
import carGroups from '../../styles/images/carGroups.png'
import directionArrow from '../../styles/images/direction-arrow.png'
import CommentBg from '../../styles/images/map-pattern.png'
import GalleryHomePage from '../GalleryHomePage'
import { FaStar } from "react-icons/fa"
import Dialog from '@mui/material/Dialog';
import { useState, useRef, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { toast } from "react-toastify";
import axios from 'axios';
import HomePageReviews from '../HomePageReviews'
import HomePageMoroccoBaner from '../HomePageMoroccoBanner'



const AboutUs = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const dialogRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const closeSlider = () => {
        handleOpen(); // Close the dialog
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                closeSlider(); // Close the slider if clicked outside
                console.log('slider closing...');
            }
        };

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up the event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
    


    const [loader, setLoader] = useState(false);

    const [stars, setStars] = useState(0);
    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');


    const ratingChanged = (newRating) => {
        setStars(newRating)
        console.log('stars..', stars);
    };

    
    const getCSRFToken = () => {
        const name = 'csrftoken'; // This should match the name of your CSRF cookie
        const cookieValue = `; ${document.cookie}`;
        const parts = cookieValue.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    
    const AddReview = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!name || !review || !stars || !country) {
            toast.error('Please fill in all fields');
            return;
        }
        
        setLoader(true);
        
        try {
            const response = await axios.post('https://admin.fn-drive.com/api/add-review/', 
            {
                name: name,
                review: review,
                stars: stars,
                country: country,
            },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(),
                },
            });
    
            // Axios automatically throws an error for non-2xx responses
            console.log("Review added successfully:", response.data);
            toast.success('Review added successfully!');
            setOpen(false);
            // Reset form
            setName('');
            setReview('');
            setStars(0);
            setCountry('');
            
        } catch (error) {
            console.error("An error occurred:", error);
            toast.error(error.response?.data?.message || 'Network error. Please try again.');
        } finally {
            setLoader(false);
        }
    }

    return(
        <div className='w-full mx-auto'>
            <div className='w-full relative'>
                <img className='w-full h-56 object-cover' src={AboutHeaderImg} alt="" />
                <div className='aboutUsBg'></div>
                <div className='aboutUsContent w-full flex justify-center items-center'>
                    <div>
                        <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-white'>About Us</p>
                        <p className='text-center mt-4 font-semibold text-white'>Home / <span className='text-red-600'>About Us</span></p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-0 sm:px-4 lg:px-14 pt-6 sm:pt-14">
                    {/* Left Section */}
                    <div className="flex flex-col mx-4">
                        
                        <div>
                        <h2 className="text-2xl sm:text-4xl font-light text-red-600 mb-2 sm:mb-5">
                            Libérez-vous sur la route et laissez-vous porter par l'esprit de l'aventure !
                        </h2>
                        <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-9">
                            Avec Touline Prestige les voitures de location pas cher au Maroc, roulez autant que vous voulez. La distance à parcourir est sans limite.
                        </p>
                        </div>
                        <img 
                        style={{height: '480px'}}
                        src="https://www.toulineprestige.com/wp-content/uploads/touline-prestige-location-voiture-cadre-1.jpg.webp" 
                        alt="Family driving" 
                        className="object-cover w-full mb-4"
                        />
                    </div>

                    {/* Right Section */}
                    <div className="flex hidden md:block flex-col mx-4">
                        <img 
                        src="https://www.toulineprestige.com/wp-content/uploads/elementor/thumbs/touline-prestige-location-voiture-cadre-2-q7wfvtqjncf5cto4nc3phbzdrxpxx2dnt8zp1fj4e8.jpg" 
                        alt="Man receiving car keys" 
                        className="w-full mb-4"
                        />
                        <div>
                        <h2 className="text-4xl font-light text-red-600 mb-4">
                            Louer une voiture en ligne au Maroc
                        </h2>
                        <p className="text-gray-700 text-base sm:text-lg mb-4 sm:mb-9">
                            Découvrez le charme du Maroc avec notre agence de location de voitures à Casablanca, où les couchers de soleil sont inoubliables ! Embarquez dans l'aventure avec nos véhicules haut de gamme alliant confort et technologie, pour explorer en toute liberté ce magnifique pays.
                        </p>
                        <ul className="list-none text-lg text-gray-600 space-y-2 mt-3">
                            <li className="flex items-center">
                            <span className="mr-2"><SquareCheckBig color='red' size={18} /></span> Pour toute réservation d’un minimum de 3 jours
                            </li>
                            <li className="flex items-center">
                            <span className="mr-2"><SquareCheckBig color='red' size={18} /></span> Offre valable uniquement en ligne
                            </li>
                            <li className="flex items-center">
                            <span className="mr-2"><SquareCheckBig color='red' size={18} /></span> Sous réserve de disponibilité de la gamme choisie
                            </li>
                        </ul>
                        </div>
                    </div>


                    {/* responseive small screen Section */}
                    <div className="flex md:hidden flex-col mx-4">
                        <div>
                        <h2 className="text-2xl sm:text-4xl font-light text-red-600 mb-4">
                            Louer une voiture en ligne au Maroc
                        </h2>
                        <img 
                        src="https://www.toulineprestige.com/wp-content/uploads/elementor/thumbs/touline-prestige-location-voiture-cadre-2-q7wfvtqjncf5cto4nc3phbzdrxpxx2dnt8zp1fj4e8.jpg" 
                        alt="Man receiving car keys" 
                        className="w-full mb-4"
                        />
                        <p className="text-gray-700 text-base sm:text-lg mb-1">
                            Découvrez le charme du Maroc avec notre agence de location de voitures à Casablanca, où les couchers de soleil sont inoubliables ! Embarquez dans l'aventure avec nos véhicules haut de gamme alliant confort et technologie, pour explorer en toute liberté ce magnifique pays.
                        </p>
                        <ul className="list-none text-sm text-gray-600 space-y-2 mt-3">
                            <li className="flex items-center">
                            <span className="mr-2"><SquareCheckBig color='red' size={18} /></span> Pour toute réservation d’un minimum de 3 jours
                            </li>
                            <li className="flex items-center">
                            <span className="mr-2"><SquareCheckBig color='red' size={18} /></span> Offre valable uniquement en ligne
                            </li>
                            <li className="flex items-center">
                            <span className="mr-2"><SquareCheckBig color='red' size={18} /></span> Sous réserve de disponibilité de la gamme choisie
                            </li>
                        </ul>
                        </div>
                        
                    </div>
            </div>

            <HomePageMoroccoBaner />
            <HomePageReviews />
            
            
            
            <GalleryHomePage />
        </div>
    )
}
export default AboutUs