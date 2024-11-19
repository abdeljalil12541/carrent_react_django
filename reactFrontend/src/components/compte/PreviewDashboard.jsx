import { FaCar } from "react-icons/fa"
import axios from 'axios';
import { useEffect, useState } from "react";

const PreviewDashboard = () => {
    const [bookingCarsLength, setBookingCarsLength] = useState(0)

    useEffect(() => {
        const fetchBookingInfo = async () => {
          try {
            const response = await axios.get('https://carrentreactdjango-production.up.railway.app/api/booking-info/');
            setBookingCarsLength(response.data.length)
            console.log('response dashboard preview...', response.data.length);
          } catch (error) {
            console.error('Error fetching booking info:', error);
          }
        };
    
        fetchBookingInfo();
      }, []);
    
    return(
        <div className="w-full sm:px-6 mt-6">
            <div className="grid grid-cols-5 space-x-2">
                <div className="border col-span-5 sm:col-span-2 md:col-span-2 lg:col-span-1 p-4 mt-2 mr-2 rounded-lg flex flex-col w-full items-center justify-center">
                    <FaCar size={90} className="text-gray-500" />
                    <p className="text-3xl text-yellow-600 -mt-2">{bookingCarsLength}</p>
                    <p className="text-gray-600">Car</p>
                </div>
            </div>

            <div className="sm:px-9 mt-9 w-full mb-14">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26594.94198505046!2d-7.640111446380638!3d33.56979982504422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda63301f2d37f49%3A0x418c5423f111f170!2sZanzicar!5e0!3m2!1sen!2sma!4v1728822828168!5m2!1sen!2sma" className="w-full h-96 rounded-lg"></iframe>
            </div>
        </div>    
    )
}
export default PreviewDashboard