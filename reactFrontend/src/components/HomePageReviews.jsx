import { useEffect, useRef, useState } from "react"; 
import { FaStar } from "react-icons/fa";
import Dialog from '@mui/material/Dialog';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';  // Import Swiper modules

const Ratings = () => {
    const [loader, setLoader] = useState(false);
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const dialogRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);
    const closeSlider = () => {
        handleOpen(); // Close the dialog
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                closeSlider();
                console.log('slider closing...');
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const ratingChanged = (newRating) => {
        setStars(newRating);
        console.log('stars..', stars);
    };

    const getCSRFToken = () => {
        const name = 'csrftoken';
        const cookieValue = `; ${document.cookie}`;
        const parts = cookieValue.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const AddReview = async (e) => {
        e.preventDefault();

        if (!name || !review || !stars || !country) {
            toast.error('Please fill in all fields');
            return;
        }
        
        setLoader(true);
        
        try {
            const response = await axios.post('https://carrent-polished-shadow-812.fly.dev/api/add-review/', 
            { name, review, stars, country },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCSRFToken(),
                },
            });

            console.log("Review added successfully:", response.data);
            toast.success('Review added successfully!');
            setOpen(false);
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
        <div>
            <div className='w-full md:flex reviewswiper sm:pl-36 md:pl-14 justify-center grid pt-4 sm:pt-12 overflow-hidden gap-6'>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    autoplay={{ delay: 3000 }}
                    loop = {true}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="w-full"
                >
                    <div className="w-full flex justify-center pl-14">
                        <SwiperSlide>
                            <div className='col-span-1 flex px-8 w-full justify-center flex-col rounded mx-4 commentBg'>
                                <div className='flex justify-center'>
                                    <FaStar color='yellow' /><FaStar color='yellow' /><FaStar color='yellow' /><FaStar color='yellow' />
                                </div>
                                <span className='text-white text-center mt-2'>
                                    Professional and very helpful car rental. Fantastic airport car delivery and collection service. Well maintained car. Highly recommended!
                                </span>
                                <p className='text-[yellow] text-center font-semibold mt-2'>Ali</p>
                                <p className='text-white text-center text-sm mt-1'>France</p>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='col-span-1 flex px-8 w-full justify-center flex-col rounded mx-4 commentBg'>
                                <div className='flex justify-center'>
                                    <FaStar color='yellow' /><FaStar color='yellow' /><FaStar color='yellow' /><FaStar color='yellow' /><FaStar color='yellow' />
                                </div>
                                <span className='text-white text-center mt-2'>
                                    Friendly staff, good mediation, fair prices. When I forgot my expensive glasses in the glove compartment while island hopping Seychelles on the first island, they arranged for me to collect them at the airport before departure!
                                </span>
                                <p className='text-[yellow] text-center font-semibold mt-2'>Ahmed</p>
                                <p className='text-white text-center text-sm mt-1'>Morocco</p>
                            </div>
                        </SwiperSlide>

                        
                        <SwiperSlide>
                            <div className='col-span-1 flex px-8 w-full justify-center flex-col rounded mx-4 commentBg'>
                                <div className='flex justify-center'>
                                    <FaStar color='yellow' /><FaStar color='yellow' /><FaStar color='yellow' /><FaStar color='yellow' />
                                </div>
                                <span className='text-white text-center mt-2'>
                                    Professional and very helpful car rental. Fantastic airport car delivery and collection service. Well maintained car. Highly recommended!
                                </span>
                                <p className='text-[yellow] text-center font-semibold mt-2'>Ali</p>
                                <p className='text-white text-center text-sm mt-1'>France</p>
                            </div>
                        </SwiperSlide>

                        <SwiperSlide>
                            <div className='col-span-1 flex px-8 w-full justify-center flex-col rounded mx-4 commentBg'>
                                <div className='flex justify-center'>
                                    <FaStar color='yellow' /><FaStar color='yellow' /><FaStar color='yellow' /><FaStar color='yellow' />
                                </div>
                                <span className='text-white text-center mt-2'>
                                    I had rented maki's hyundai i10 on Mauritius for great price and it was delivered at the airport with slight delay though but apart of that everything was absolutely fine and no extra hassle. Thanks
                                </span>
                                <p className='text-[yellow] text-center font-semibold mt-2'>Kawtar</p>
                                <p className='text-white text-center text-sm mt-1'>Morocco</p>  
                            </div>
                        </SwiperSlide>
                    </div>
                </Swiper>
            </div>

            <div className='w-full flex justify-center my-2 lg:pr-[25px] sm:my-9'>
                <button onClick={handleOpen} className='text-white hover:bg-red-500 text-sm sm:text-[16px] font-semibold bg-red-600 py-3 px-5 rounded'>Leave A Comment</button>
            </div>

            {open && (
                <Dialog
                    ref={dialogRef}
                    open={open}
                    onClose={handleOpen}
                    fullWidth
                    maxWidth="xl"
                    className="fixed inset-0 flex items-center justify-center"
                >
                    <form onSubmit={AddReview} className="w-full max-w-lg pb-2">
                    <div className="w-full flex items-center py-3 px-4 justify-between">
                        <p className="text-md font-semibold text-gray-600">Add a review</p>
                        <button type="button" onClick={() => setOpen(false)} className="text-gray-600">X</button>
                    </div>
                    <hr />
                    <div className="px-9 mt-4">
                        <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Your Name</label>
                            <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-200 w-full py-3 px-4 text-slate-700 text-sm border border-slate-200 transition duration-300 ease focus:outline-none focus:border-red-700 shadow-sm"
                            placeholder="Your Name"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Country</label>
                            <input
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="bg-gray-200 w-full py-3 px-4 text-slate-700 text-sm border border-slate-200 transition duration-300 ease focus:outline-none focus:border-red-700 shadow-sm"
                            placeholder="Country"
                            />
                        </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">Rating</label>
                            <ReactStars value={stars} onChange={ratingChanged} size={30} isHalf={true} />
                        </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-3">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Message</label>
                            <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            className="bg-gray-200 w-full py-3 px-4 text-slate-700 text-sm border border-slate-200 transition duration-300 ease focus:outline-none focus:border-red-700 shadow-sm"
                            placeholder="Message"
                            />
                        </div>
                        </div>
                    </div>
                    <hr />
                    <div className="w-full flex font-semibold justify-end pt-2 px-3">
                        <button type="button" onClick={() => setOpen(false)} className="px-3 py-2.5 rounded bg-red-600 text-white mx-1">
                        Close
                        </button>
                        <button type="submit" className="px-3 py-2.5 rounded bg-green-600 text-white mx-1">
                        Save
                        </button>
                    </div>
                    </form>
                </Dialog>
                )}

                <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
                    <div className="loaderBg"></div>
                    <span class="loader"></span>
                </div>
            </div>
        );
};

export default Ratings;
