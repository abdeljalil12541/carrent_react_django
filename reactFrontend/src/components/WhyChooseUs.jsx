import carGroups from '../styles/images/carGroups.png'
import directionArrow from '../styles/images/direction-arrow.png'
import { Award, DollarSign, Clock } from 'lucide-react';


export default function WhyChooseUs() {
    
    return(
        <div className="lg:px-14 sm:px-2 mb-9 container mx-auto px-4 py-12">
            <img src={carGroups} className='w-full' />
            <p className='text-2xl sm:text-4xl mt-4 sm:mt-4 md:mt-0 lg:mt-0 w-full flex justify-center text-center font-normal mb-14 text-black'>Why <span className='ml-2 text-red-700'>choose us</span></p>

            <div className='relative flex flex-col px-8 md:flex-row justify-between items-start gap-8'>
                <div className='chooseUsItems flex flex-col sm:w-full items-center text-center flex-1 relative'>
                    <svg className='duration-500 border justify-center flex rounded p-2' height={55} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                        <defs> 
                            <style>{`.cls-1{fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;}`}</style> 
                        </defs> 
                        <title>Medal Icon</title> 
                        <g data-name="Layer 2" id="Layer_2"> 
                            <g id="Interface-Light"> 
                            <g id="interface-light-ranking-medal"> 
                                <line className="cls-1" x1="15" x2="15" y1="12.5" y2="7.5"></line> 
                                <line className="cls-1" x1="14" x2="15" y1="8.5" y2="7.5"></line> 
                                <path className="cls-1" d="M15.53.68l1.84,1.41a.86.86,0,0,0,.58.18l2.35-.11a.86.86,0,0,1,.87.6l.61,2.18a.82.82,0,0,0,.36.46l2,1.24a.77.77,0,0,1,.32,1L23.6,9.71a.83.83,0,0,0,0,.58l.84,2.11a.77.77,0,0,1-.32,1l-2,1.24a.82.82,0,0,0-.36.46l-.61,2.18a.86.86,0,0,1-.87.6L18,17.73a.86.86,0,0,0-.58.18l-1.84,1.41a.87.87,0,0,1-1.06,0l-1.84-1.41a.86.86,0,0,0-.58-.18l-2.35.11a.86.86,0,0,1-.87-.6l-.61-2.18a.82.82,0,0,0-.36-.46l-2-1.24a.77.77,0,0,1-.33-1l.84-2.11a.83.83,0,0,0,0-.58L5.56,7.6a.77.77,0,0,1,.33-1l2-1.24a.82.82,0,0,0,.36-.46l.61-2.18a.86.86,0,0,1,.87-.6l2.35.11a.86.86,0,0,0,.58-.18L14.47.68A.87.87,0,0,1,15.53.68Z"></path> 
                                <circle className="cls-1" cx="15" cy="10" r="4.5"></circle> 
                                <line className="cls-1" x1="29.5" x2="21.8" y1="25.5" y2="15"></line> 
                                <line className="cls-1" x1="29.5" x2="22.5" y1="25.5" y2="24.5"></line> 
                                <line className="cls-1" x1="19.5" x2="22.5" y1="29.5" y2="24.5"></line> 
                                <line className="cls-1" x1="19.5" x2="16.96" y1="29.5" y2="18.3"></line> 
                                <line className="cls-1" x1="0.5" x2="8.2" y1="25.5" y2="15"></line> 
                                <line className="cls-1" x1="0.5" x2="7.5" y1="25.5" y2="24.5"></line> 
                                <line className="cls-1" x1="10.5" x2="7.5" y1="29.5" y2="24.5"></line> 
                                <line className="cls-1" x1="10.5" x2="13.04" y1="29.5" y2="18.3"></line> 
                            </g> 
                            </g> 
                        </g> 
                        </g>
                    </svg>
                    <p className='text-xl pt-3 pb-1 font-medium text-[#c53030]'>Quality and experience</p>
                    <p className='font-light text-gray-700'>Expert for more than 10 years to help you rent a car in Morocco</p>
                    <img className='absolute left-80 hidden lg:block' src={directionArrow} />
                </div>

                <div className='chooseUsItems flex flex-col sm:w-full items-center text-center flex-1 relative'>
                    <svg className='duration-500 border justify-center flex rounded p-2' height={55} fill="#000000" viewBox="0 0 64.00 64.00" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0.00064"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="13 money" id="_13_money"> <path d="M59.2,16.19a20.767,20.767,0,0,0-12.67-.29,48.549,48.549,0,0,0-4.62,1.66,46.881,46.881,0,0,1-4.57,1.63,18.224,18.224,0,0,1-8.99.43,15.963,15.963,0,0,1-3.9-1.58,20.055,20.055,0,0,0-12.93-2.52c-3.27.47-4.29.78-4.29,1.85v4.62c-.7.07-1.39.15-2.09.26A1.979,1.979,0,0,0,3.5,24.21V43.7a1.98,1.98,0,0,0,.68,1.5,1.941,1.941,0,0,0,1.54.45,33.148,33.148,0,0,1,11.22.17,34.245,34.245,0,0,1,4.48,1.28c1.34.44,2.72.9,4.15,1.22a26.061,26.061,0,0,0,5.81.64,29.921,29.921,0,0,0,5.2-.47,40.684,40.684,0,0,0,5.16-1.37,38.768,38.768,0,0,1,4.85-1.3,23.014,23.014,0,0,1,7.09-.14,1.855,1.855,0,0,0,1.48-.46,2.017,2.017,0,0,0,.68-1.51V38.7a22.43,22.43,0,0,1,2.49.15,1.62,1.62,0,0,0,.22.01,1.956,1.956,0,0,0,1.28-.48,1.986,1.986,0,0,0,.67-1.5V18.08A2.017,2.017,0,0,0,59.2,16.19ZM5.45,24.23a34.568,34.568,0,0,1,5.51-.44v1.47a4.13,4.13,0,0,1-4,4.23H5.46Zm5.51,19.03a36.2,36.2,0,0,0-5.46.44l-.02-6.25H6.96a4.13,4.13,0,0,1,4,4.23Zm42.88.42a25.636,25.636,0,0,0-5.46-.1v-1.9a4.13,4.13,0,0,1,4-4.23h1.46Zm0-8.23H52.38a6.121,6.121,0,0,0-6,6.23v2.15c-.05.01-.1.01-.15.02a43.69,43.69,0,0,0-5.09,1.36,39.691,39.691,0,0,1-4.91,1.31,25.771,25.771,0,0,1-10.22-.15,38.483,38.483,0,0,1-3.96-1.17,37.744,37.744,0,0,0-4.72-1.34,31.622,31.622,0,0,0-4.37-.54V41.68a6.121,6.121,0,0,0-6-6.23H5.48l-.01-3.96H6.96a6.127,6.127,0,0,0,6-6.23V23.85a30.7,30.7,0,0,1,3.98.5,35.872,35.872,0,0,1,4.48,1.28,41.6,41.6,0,0,0,4.15,1.23,28.055,28.055,0,0,0,11.01.16,40.684,40.684,0,0,0,5.16-1.37,41.566,41.566,0,0,1,4.64-1.25v.86a6.127,6.127,0,0,0,6,6.23h1.46Zm0-5.96H52.38a4.13,4.13,0,0,1-4-4.23V24.11a23.8,23.8,0,0,1,5.46.11Zm2,7.21V24.22a1.966,1.966,0,0,0-1.67-1.96,25.523,25.523,0,0,0-6.76-.04h-.03a1.01,1.01,0,0,0-.17.03c-.33.05-.65.08-.98.14a41.767,41.767,0,0,0-5.09,1.35,38,38,0,0,1-4.91,1.31,25.771,25.771,0,0,1-10.22-.15,38.483,38.483,0,0,1-3.96-1.17,39.527,39.527,0,0,0-4.72-1.34,33.483,33.483,0,0,0-5.23-.58c-.05,0-.09-.02-.14-.02a.3.3,0,0,0-.1.02c-.87-.03-1.75-.02-2.63.03V17.97a24.958,24.958,0,0,1,2.65-.48A18.1,18.1,0,0,1,23.5,19.8a17.56,17.56,0,0,0,4.41,1.77,20.2,20.2,0,0,0,9.96-.45,47.1,47.1,0,0,0,4.77-1.7,44.3,44.3,0,0,1,4.44-1.59,18.642,18.642,0,0,1,11.42.25l.07,18.78A25.283,25.283,0,0,0,55.84,36.7Z"></path> <path d="M32.5,39.54a2.829,2.829,0,0,1-1.83,1.87v.79a1,1,0,0,1-2,0v-.96a7.207,7.207,0,0,1-1.24-.82c-.15-.12-.29-.23-.43-.33a1,1,0,1,1,1.14-1.64c.17.12.34.25.52.39.44.34.94.73,1.27.7a.843.843,0,0,0,.67-.61.8.8,0,0,0-.21-.87l-2.26-1.9a2.8,2.8,0,0,1-.55-3.64,2.586,2.586,0,0,1,1.09-.96V30.49a1,1,0,1,1,2,0v.94a2.708,2.708,0,0,1,.83.46l.91.76a1,1,0,0,1-1.29,1.53l-.9-.75a.64.64,0,0,0-.5-.15.671.671,0,0,0-.45.31.806.806,0,0,0,.14,1.04l2.27,1.9A2.748,2.748,0,0,1,32.5,39.54Z"></path> </g> </g></svg>
                    <p className='text-xl pt-3 pb-1 font-medium text-[#c53030]'>Best price guarantee</p>
                    <p className='font-light text-gray-700'>We guarantee the best price for our car rental deals!</p>
                    <img className='absolute left-80 hidden lg:block' src={directionArrow} />
                </div>

                <div className='chooseUsItems flex flex-col sm:w-full items-center text-center flex-1 relative'>
                <svg className='duration-500 border justify-center flex rounded p-3' fill="#000000" height={55} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 408 408" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <circle cx="345.52" cy="208" r="8"></circle> </g> </g> <g> <g> <circle cx="61.512" cy="208" r="8"></circle> </g> </g> <g> <g> <circle cx="205.512" cy="348" r="8"></circle> </g> </g> <g> <g> <path d="M196.572,256h-49.148c4.436-7.308,13.5-15.608,21.768-23.18c15.844-14.512,32.228-29.516,32.228-47.644 c0-22.772-18.496-36.376-36.376-36.376c-18.236,0-39.532,10.352-39.532,39.528c0,4.416,3.584,8,8,8s8-3.584,8-8 c0-21.236,16.456-23.528,23.532-23.528c8.46,0,20.376,6.324,20.376,20.376c0,11.088-14.364,24.24-27.036,35.844 c-15.284,13.996-29.72,27.22-29.72,42.98v8h67.908c4.416,0,8-3.584,8-8C204.572,259.584,200.988,256,196.572,256z"></path> </g> </g> <g> <g> <path d="M284,223.996h-16v-68c0-3.56-2.356-6.692-5.776-7.684c-3.408-0.984-7.08,0.404-8.988,3.416l-48,76 c-1.556,2.468-1.652,5.58-0.244,8.136c1.412,2.552,4.092,4.136,7.008,4.136h40v24c0,4.416,3.584,8,8,8c4.416,0,8-3.584,8-8.004 v-24h16c4.416,0,8-3.584,8-8C292,227.58,288.416,223.996,284,223.996z M252,224h-25.484L252,183.648V224z"></path> </g> </g> <g> <g> <path d="M396,192c-6.628,0-12,5.372-12,12c0,99.252-80.748,180-180,180S24,303.252,24,204S104.748,24,204,24 c40.3,0,78.396,13.016,110.164,37.636c5.236,4.056,12.776,3.108,16.836-2.132c4.06-5.24,3.108-12.776-2.132-16.836 C292.852,14.752,249.672,0,204,0C91.516,0,0,91.512,0,204c0,112.484,91.516,204,204,204s204-91.516,204-204 C408,197.372,402.628,192,396,192z"></path> </g> </g> <g> <g> <path d="M340,3.432c-6.628,0-12,5.372-12,12V60h-44c-6.628,0-12,5.372-12,12s5.372,12,12,12h56c6.628,0,12-5.376,12-12V15.432 C352,8.804,346.628,3.432,340,3.432z"></path> </g> </g> <g> <g> <circle cx="205.512" cy="68" r="8"></circle> </g> </g> </g></svg>
                    <p className='text-xl pt-3 pb-1 font-medium text-[#c53030]'>Free cancellation</p>
                    <p className='font-light text-gray-700'>Cancel without charge until 24h before the rental.</p>
                </div>
            </div>
        </div>
    );
}