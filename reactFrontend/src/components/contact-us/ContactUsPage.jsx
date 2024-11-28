import { useEffect, useState } from 'react';
import AboutHeaderImg from '../../styles/images/about-header.jpg';
import { MapPin, Mail, Phone } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';


const getCSRFToken = () => {
    const name = 'csrftoken';
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    config.headers['X-CSRFToken'] = getCSRFToken(); // Attach CSRF token
    return config;
});

const ContactUsPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const [loader, setLoader] = useState(false)
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleContactSubmit = async (e) => {
        e.preventDefault();

        setLoader(true);

        try {

            console.log({
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phoneNumber,
                message: message,
            });

            const response = await axios.post('https://carrent-polished-shadow-812.fly.dev/api/contact-us/', 
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone_number: phoneNumber,
                    message: message,
                },
                {
                    withCredentials: true,
                    headers: {
                        'X-CSRFToken': getCSRFToken() // Include CSRF token in headers
                    }
                }
            );

            if (response.status !== 201) {
                toast.error('ops... something went wrong!');
            } else {
                toast.success('message was sent successfully!');

                setFirstName('');
                setLastName('');
                setEmail('');
                setPhoneNumber('');
                setMessage('');
            }
        } catch (error) {
            console.error('Error sending contact data:', error);
            toast.error('ops... something went wrong!');
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
                        <p className='text-3xl sm:text-4xl md:text-5xl font-semibold text-white'>Contact Us</p>
                        <p className='text-center mt-4 font-semibold text-white'>Home / <span className='text-red-600'>Contact Us</span></p>
                    </div>
                </div>
            </div>


            <div className='grid grid-cols-2 sm:px-16 md:px-2 pt-6'>
                <div className='col-span-2 md:col-span-1'>
                    <form onSubmit={handleContactSubmit} class="ml-auto space-y-4 w-full px-2 sm:px-9 py-1 sm:py-9">
                        <h1 className='text-2xl sm:text-4xl text-gray-800 font-semibold -mb-1'>Get in Touch</h1>
                        <div className='border-t contactBorderLine w-20 ml-1'></div>
                        <div className='grid grid-cols-2'>
                            <input
                                onChange={(e) => setFirstName(e.target.value)}
                                value={firstName}
                                type='text' 
                                placeholder='First name'
                                class="rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm focus:border-red-600 border outline-none duration-300 focus:bg-transparent" />
                            <input
                                onChange={(e) => setLastName(e.target.value)}
                                value={lastName}
                                type='text' 
                                placeholder='Last Name'
                                class="rounded-md py-3 px-4 ml-2 bg-gray-100 text-gray-800 text-sm focus:border-red-600 border outline-none duration-300 focus:bg-transparent" />
                        </div>

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type='email' 
                            placeholder='Email'
                            class="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm focus:border-red-600 border outline-none duration-300 focus:bg-transparent" />
                        <input
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            value={phoneNumber}
                            type='number' 
                            placeholder='Phone Number'
                            class="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-800 text-sm focus:border-red-600 border outline-none duration-300 focus:bg-transparent" />
                        <textarea
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            placeholder='Message' 
                            rows="6" 
                            class="w-full rounded-md px-4 bg-gray-100 text-gray-800 text-sm pt-3 focus:border-red-600 border outline-none duration-300 focus:bg-transparent"></textarea>
                        <button type='submit' class="text-white bg-red-600 hover:bg-red-500 tracking-wide rounded-md text-sm px-4 py-3 w-full !mt-6">Send</button>
                    </form>
                </div>
                    
                <div className='col-span-2 md:col-span-1 ml-auto space-y-4 w-full sm:px-9 pt-6 sm:pt-16'>
                    <iframe className="w-full" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26594.94198505046!2d-7.640111446380638!3d33.56979982504422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda63301f2d37f49%3A0x418c5423f111f170!2sZanzicar!5e0!3m2!1sen!2sma!4v1728822828168!5m2!1sen!2sma" height={450} style={{border:"0"}} allowfullscreen=""  referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

            <div className='bg-gray-200 w-full'>
                <div className='grid grid-cols-3 sm:gap-8 md:gap-14 lg:gap-28 mx-4 lg:mx-28'>
                    <div className='overflow-hidden col-span-3 sm:col-span-1 bg-white my-4 sm:my-10 px-8 text-lg text-center pb-8 pt-8'>
                        <div className='flex justify-center mb-4'>
                            <MapPin color='white' size={50} className='bg-red-600 p-3 rounded-3xl' strokeWidth={1} />
                        </div>
                        <p>13th Street. 47 W 13th St, <br />
                            New York, NY 10011, USA
                        </p>
                    </div>
                    <div className='overflow-hidden col-span-3 sm:col-span-1 bg-white my-4 sm:my-10 px-8 text-lg text-center pb-8 pt-8'>
                        <div className='flex justify-center mb-4'>
                            <Phone color='white' size={50} className='bg-red-600 p-3 rounded-3xl' strokeWidth={1} />
                        </div>
                        <p>(+347) 123 4567 890 <br />
                            Mon-Sat 9:00am-5:00pm
                        </p>
                    </div>
                    <div className='overflow-hidden col-span-3 sm:col-span-1 bg-white my-4 sm:my-10 px-8 text-lg text-center pb-8 pt-8'>
                        <div className='flex justify-center mb-4'>
                            <Mail color='white' size={50} className='bg-red-600 p-3 rounded-3xl' strokeWidth={1} />
                        </div>
                        <p>info@domain.com <br />
                            24 X 7 online support
                        </p>
                    </div>
                </div>
            </div>

            <div className={`loaderPosition ${!loader ? 'invisible': 'visible'}`}>
                <div className="loaderBg"></div>
                <span class="loader"></span>
            </div>
        </div>
    )
}
export default ContactUsPage