import logo from '../styles/images/logo10.png'
import '../styles/css/footer.css'
import axios from 'axios'
import { useState } from 'react';
import { toast } from 'react-toastify';

const Footer = () => {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    
    const [loader, setLoader] = useState(false)


    const [email, setEmail] = useState('');

    const handleNewsLetterForm = async (e) => {
        e.preventDefault();
        setLoader(true)
        try{
            const response = await axios.post('https://admin.fn-drive.com/api/add-news-letter/', {email}, {withCredentials: true})
            console.log('news letter added successfully', response.data);
            toast.success('news letter added successfully')
            setEmail('')
        }catch (error) {
            console.error('error', error)
        }finally{
            setLoader(false);
        }
    }

    return(
        <footer className='relative mx-auto p-0 md:px-0 xl:px-0 overflow-hidden'>
        <div className='relative bg-neutral-950 footerBgColor' style={{height: '55vh'}}>
                <div class="container absolute mx-auto p-0 md:px-8 xl:px-0">
                    <div class="mx-auto max-w-7xl pl-3 sm:pl-6 pb-10 pt-16">
                        <div class="xl:grid xl:grid-cols-4 xl:gap-1">
                            <div class="lg:pl-8 footerImgDivRes">
                                <div>
                                        <div class="flex items-center sm:-ml-3 md:-ml-3 lg:-ml-5 space-x-2 text-2xl font-medium">
                                                <img className='lg:-mt-20 w-[220px] -mb-16 sm:-mb-20 md:-mb-16 lg:-mb-28 -ml-9 sm:w-[250px] MarginBottomFooterRes lg:w-[350px] py-4 lg:py-0 Footerlogo' src={logo} alt="RN Logo" />
                                        </div>
                                </div>
                                <div class="max-w-md pr-16 -mt-14 md:-mt-16 lg:-mt-9 text-sm sm:text-[16px] text-gray-400">
                                    Enhance productivity and efficiency with cutting-edge artificial intelligence solutions for your business operations.
                                </div>
                                <div class="flex space-x-2 pt-3">
                                    <button
                                        type="button"
                                        className="inline-block linkIcons rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                        style={{ backgroundColor: "#c53030" }}
                                        >
                                        <svg fill="currentColor" viewBox="0 0 24 24"
                                            class="h-4 w-4" aria-hidden="true">
                                            <path fill-rule="evenodd"
                                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-block linkIcons rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                        style={{ backgroundColor: "#c53030" }}
                                        >
                                        <svg fill="#ffffff" className='w-4 h-4' version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30.667 30.667" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M30.667,14.939c0,8.25-6.74,14.938-15.056,14.938c-2.639,0-5.118-0.675-7.276-1.857L0,30.667l2.717-8.017 c-1.37-2.25-2.159-4.892-2.159-7.712C0.559,6.688,7.297,0,15.613,0C23.928,0.002,30.667,6.689,30.667,14.939z M15.61,2.382 c-6.979,0-12.656,5.634-12.656,12.56c0,2.748,0.896,5.292,2.411,7.362l-1.58,4.663l4.862-1.545c2,1.312,4.393,2.076,6.963,2.076 c6.979,0,12.658-5.633,12.658-12.559C28.27,8.016,22.59,2.382,15.61,2.382z M23.214,18.38c-0.094-0.151-0.34-0.243-0.708-0.427 c-0.367-0.184-2.184-1.069-2.521-1.189c-0.34-0.123-0.586-0.185-0.832,0.182c-0.243,0.367-0.951,1.191-1.168,1.437 c-0.215,0.245-0.43,0.276-0.799,0.095c-0.369-0.186-1.559-0.57-2.969-1.817c-1.097-0.972-1.838-2.169-2.052-2.536 c-0.217-0.366-0.022-0.564,0.161-0.746c0.165-0.165,0.369-0.428,0.554-0.643c0.185-0.213,0.246-0.364,0.369-0.609 c0.121-0.245,0.06-0.458-0.031-0.643c-0.092-0.184-0.829-1.984-1.138-2.717c-0.307-0.732-0.614-0.611-0.83-0.611 c-0.215,0-0.461-0.03-0.707-0.03S9.897,8.215,9.56,8.582s-1.291,1.252-1.291,3.054c0,1.804,1.321,3.543,1.506,3.787 c0.186,0.243,2.554,4.062,6.305,5.528c3.753,1.465,3.753,0.976,4.429,0.914c0.678-0.062,2.184-0.885,2.49-1.739 C23.307,19.268,23.307,18.533,23.214,18.38z"></path> </g> </g></svg>
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-block linkIcons rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                        style={{ backgroundColor: "#c53030" }}
                                        >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        className="inline-block linkIcons rounded-full p-3 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                                        style={{ backgroundColor: "#c53030" }}
                                        >
                                        <svg fill="currentColor" viewBox="0 0 24 24"
                                            class="h-4 w-4" aria-hidden="true">
                                            <path
                                                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84">
                                            </path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div class="mt-4 sm:mt-16 grid grid-cols-1 gap-1 xl:col-span-3 xl:mt-0">
                                <div class="grid grid-cols-2 md:grid-cols-4 md:gap-1">
                                <div>
                                        <h3 class="text-md font-semibold leading-6 text-[#c53030]">Address</h3>
                                        <ul role="list" class="mt-2 sm:mt-6 space-y-1 sm:space-y-4">
                                            <li>
                                                <a href="/predictiveanalysis"
                                                    class="text-sm sm:text-[16px] sm:leading-6 text-gray-400 hover:text-gray-50">

                                                    55 Main Street, 2nd block
                                                    Melbourne, Australia
                                                
                                                    
                                                
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/customerexperience"
                                                    class="text-sm sm:text-[16px] sm:leading-6 text-gray-400 hover:text-gray-50">Customer
                                                    73 Main Street, 5th block
                                                    New York City
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='lg:ml-8'>
                                        <h3 class="text-md font-semibold leading-6 text-[#c53030]">Quick Links</h3>
                                        <ul role="list" class="mt-2 sm:mt-6 space-y-1 sm:space-y-4 lg:space-y-3">
                                            <li>
                                                <a href="/aiplatform"
                                                    class="text-sm sm:text-[16px] leading-6 text-gray-400 hover:text-gray-50">Home
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/aialgorithms"
                                                    class="text-sm sm:text-[16px] leading-6 text-gray-400 hover:text-gray-50">About us
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/industryapplications"
                                                    class="text-sm sm:text-[16px] leading-6 text-gray-400 hover:text-gray-50"> Contact us
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/industryapplications"
                                                    class="text-sm sm:text-[16px] leading-6 text-gray-400 hover:text-gray-50"> Gallery
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div class="mt-1">
                                        <h3 class="text-md font-semibold leading-6 text-[#c53030]">Contact</h3>
                                        <ul role="list" class="mt-2 sm:mt-6 space-y-1 sm:space-y-4">
                                            <li>
                                                <a href="/aboutus"
                                                    class="text-sm sm:text-[16px] leading-1 sm:leading-6 text-gray-400 hover:text-gray-50">Address: 123 Main St, City
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/careers"
                                                    class="text-sm sm:text-[16px] leading-1 sm:leading-6 text-gray-400 hover:text-gray-50">Phone: +123 456 789
                                                </a>
                                            </li>
                                            <li>
                                                <a href="/contactus"
                                                    class="text-sm sm:text-[16px] leading-1 sm:leading-6 text-gray-400 hover:text-gray-50">Office Hours: Mon-Fri, 9 AM - 6 PM
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="mt-1">
                                        <h3 class="text-md font-semibold leading-6 text-[#c53030] uppercase">Newsletter</h3>
                                        {/* <dir className='w-full'>
                                            <hr className='w-14 flex justify-center' />
                                        </dir> */}
                                        <ul role="list" class="mt-2 sm:mt-6 space-y-1 sm:space-y-4">
                                            <li className='w-full'>
                                                <h1 className='text-sm sm:text-[16px] sm:leading-6 text-gray-400'>Subscribe to our newsletter to get anything new</h1>
                                            </li>
                                            <form onSubmit={(e) => handleNewsLetterForm(e)} className='mr-1 sm:mr-0'>
                                                <li>
                                                    <div>
                                                        <input 
                                                            value={email} 
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            type="email" 
                                                            class="sm:inputButton mr-96 sm:inputButton mt-1 sm:mt-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:border-gray-600 outline-none duration-300" 
                                                            placeholder="example345@gmail.com" 
                                                            required />
                                                    </div>
                                                </li>
                                                <li className='mt-2 sm:mt-3'>
                                                    <button type='submit' class="inline-flex sm:Subscribebutton items-center hover:border-white justify-center  pl-2 sm:pl-4 pr-1 sm:pr-3 py-2 mb-2 text-md text-white bg-[#c53030] rounded-md hover:bg-red-500 duration-150 sm:w-auto sm:mb-0">
                                                        Subscribe
                                                        <svg class="w-4 h-4 ml-1 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                                    </button>
                                                </li>
                                            </form>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footerBgImg'>

                </div>

            </div>
            <div className='bg-red-700'>
                <div class="text-sm sm:text-[16px] py-3 text-center text-gray-200">
                    Copyright © 2024 . Crafted with by AI enthusiasts at AIOps.
                </div>
            </div>
            <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
                <div className="loaderBg"></div>
                <span class="loader"></span>
            </div>
        </footer>
    )
}
export default Footer