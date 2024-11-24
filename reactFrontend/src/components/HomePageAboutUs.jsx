import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePageAboutUs = () => {

    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const goToAboutUsBtn = () => {
        setLoader(true)
        setTimeout(() => {
            navigate('/about-us');
        }, 300);
    }
    return(
        <div className="h-5/6 w-full bg-neutral-950">
                <div className="grid grid-cols-2 container mx-auto">

                    <div className="w-full col-span-2 md:col-span-1 text-white px-4 py-9">
                        <p className="text-sm font-semibold text-red-600">RENTAX</p>
                        <p className="text-4xl font-semibold pb-1 pt-4">We Are More Than </p>
                        <p className="text-4xl font-semibold text-red-600 pb-3">A Car Rental Company</p>
                        <p className="mb-1 text-gray-400">Car repair quisque sodales dui ut varius vestibulum drana tortor turpis porttiton tellus eu euismod nisl massa nutodio in the miss volume place urna lacinia eros nuntia urna mauris vehicula rutrum in the miss on volume interdum.</p>

                        <div className="grid grid-cols-2 w-full">
                            <div className="mt-4 mr-4">
                                <svg className="bg-red-600 p-2 inline-block rounded-full mr-2" height={29} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#fffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"></path></g></svg>
                                <span className="text-gray-400">Economy Cars</span>    
                            </div>
                            <div className="mt-4">
                                <svg className="bg-red-600 p-2 inline-block rounded-full mr-2" height={29} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#fffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"></path></g></svg>
                                <span className="text-gray-400">Get Reasonable Price</span>    
                            </div>
                        </div>


                        <div className="grid grid-cols-2 w-full">
                            <div className="mt-4 mr-4">
                                <svg className="bg-red-600 p-2 inline-block rounded-full mr-2" height={29} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#fffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"></path></g></svg>
                                <span className="text-gray-400">First Class Services</span>    
                            </div>
                            <div className="mt-4">
                                <svg className="bg-red-600 p-2 inline-block rounded-full mr-2" height={29} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#fffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M17.47 250.9C88.82 328.1 158 397.6 224.5 485.5c72.3-143.8 146.3-288.1 268.4-444.37L460 26.06C356.9 135.4 276.8 238.9 207.2 361.9c-48.4-43.6-126.62-105.3-174.38-137z"></path></g></svg>
                                <span className="text-gray-400">Free Pick-Up & Drop-Offs</span>    
                            </div>
                        </div>

                        <button onClick={goToAboutUsBtn} className="hidden md:flex  bg-red-600 py-3 flex flex-row px-5 rounded-full mt-8">
                            <span className="pr-1 inline-block">Read More</span>
                            <svg className="pb-1 inline-block md:mt-[4px] lg:mt-[3px] " fill="#fff" height={22} viewBox="0 0 24 24"  data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><line id="primary" x1="5" y1="19" x2="19" y2="5" style={{fill: 'none', stroke: '#fff', strokeLinecap: 'round', strokeL: 'round', strokeWidth: '2'}}></line><polyline id="primary-2" data-name="primary" points="19 9 19 5 15 5" style={{fill: 'none', stroke: '#fff', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2'}}></polyline></g></svg>
                        </button>
                    </div>


                    <div className="w-full col-span-2 md:col-span-1 lg:pl-24 relative px-4 pb-4 md:py-9">
                        <div className="relative w-full">
                            <img className="w-full h-96 object-cover rounded-3xl" src="https://img.freepik.com/premium-photo/young-business-moroccan-man-isolated-beige-wall-applauding-after-presentation-conference_1368-143651.jpg" alt="" />
                            
                            <button className="absolute inset-0 m-auto bg-red-600 pl-5 text-black p-4 rounded-full flex items-center justify-center w-14 h-14" style={{
                            }}>
                                <svg className="absolute" fill="#ffffff" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.055 512.055" xmlSpace="preserve">
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                            <g>
                                                <g>
                                                    <path d="M500.235,236.946L30.901,2.28C16.717-4.813,0.028,5.502,0.028,21.361v469.333c0,15.859,16.689,26.173,30.874,19.081 l469.333-234.667C515.958,267.247,515.958,244.808,500.235,236.946z M42.694,456.176V55.879l400.297,200.149L42.694,456.176z"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                            
                                <div className="video" style={{
                                    width: '80px', // Adjusted width for the play button
                                    height: '80px', // Adjusted height for the play button
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}>
                                    
                                    <div className="play-btn" style={{
                                        display: 'flex',
                                        flexDirection: 'column', // Stack items vertically
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: '#c5303073',
                                        color: '#fff',
                                        fontSize: '50px',
                                        width: '80px',
                                        height: '80px',
                                        zIndex: 2,
                                        borderRadius: '100%',
                                        position: 'relative',
                                        animation: 'bloom1 1.4s linear infinite',
                                    }}>
                                        <style>
                                            {`
                                                @keyframes bloom1 {
                                                    0% { transform: scale(); opacity: 0; }
                                                    50% { opacity: 1; }
                                                    100% { transform: scale(1.5); opacity: 0; }
                                                }
                                                @keyframes bloom2 {
                                                    0% { transform: scale(); opacity: 0; }
                                                    50% { opacity: 1; }
                                                    100% { transform: scale(); opacity: 0; }
                                                }
                                                .play-btn:before, .play-btn:after {
                                                    content: '';
                                                    position: absolute;
                                                    border: 10px solid #c5303073;
                                                    border-radius: 50%;
                                                    top: -10px;
                                                    left: -10px;
                                                    right: -10px;
                                                    bottom: -10px;
                                                    opacity: 0;
                                                    z-index: 1;
                                                }
                                                // .play-btn:before {
                                                //     animation: bloom1 1.5s linear infinite;
                                                // }
                                                // .play-btn:after {
                                                //     animation: bloom2 1.5s linear infinite;
                                                //     animation-delay: 0.4s;
                                                // }
                                            `}
                                        </style>
                                        
                                    </div>
                                </div>
                            </button>
                            <div className="flex justify-center">
                                <button className="md:hidden bg-red-600 py-3 flex px-5 rounded-full mt-8">
                                    <span className="pr-1 inline-block text-white">Read More</span>
                                    <svg className=" inline-block mt-[4px] ml-1" fill="#fff" height={18} viewBox="0 0 24 24"  data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><line id="primary" x1="5" y1="19" x2="19" y2="5" style={{fill: 'none', stroke: '#fff', strokeLinecap: 'round', strokeL: 'round', strokeWidth: '2'}}></line><polyline id="primary-2" data-name="primary" points="19 9 19 5 15 5" style={{fill: 'none', stroke: '#fff', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2'}}></polyline></g></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
                        <div className="loaderBg"></div>
                        <span class="loader"></span>
                    </div>
                </div>
        </div>
    )
}
export default HomePageAboutUs