import '../styles/css/brands.css'

import brand1 from '../styles/images/car-brands/brand1.png';
import brand2 from '../styles/images/car-brands/brand2.png';
import brand3 from '../styles/images/car-brands/brand3.png';
import brand4 from '../styles/images/car-brands/brand4.png';
import brand5 from '../styles/images/car-brands/brand5.png';
import brand6 from '../styles/images/car-brands/brand6.png';
import brand7 from '../styles/images/car-brands/brand7.png';
import brand8 from '../styles/images/car-brands/brand8.png';
// import brand9 from '../styles/images/car-brands/brand9.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


const Brands = ({brand, brand_alt}) => {
    return(
        <img src={brand} className='brandsImg' width={100} alt={brand_alt} />
    );
}



const BrandSlider = () => {
    const brands = [
        {brand_img: brand1, brand_alt: 'brand 1'},
        {brand_img: brand2, brand_alt: 'brand 2'},
        {brand_img: brand3, brand_alt: 'brand 3'},
        {brand_img: brand4, brand_alt: 'brand 4'},
        {brand_img: brand5, brand_alt: 'brand 5'},
        {brand_img: brand6, brand_alt: 'brand 6'},
        {brand_img: brand7, brand_alt: 'brand 7'},
        {brand_img: brand8, brand_alt: 'brand 8'},
        // {brand_img: brand9, brand_alt: 'brand 9'},
    ]

    return(
        <div className="bg-neutral-950 pt-2 lg:pt-1 relative h-60 w-full" style={{zIndex: '999'}}>
            <div className="flex justify-between items-center h-10">
                <svg style={{cursor: 'pointer'}} className="swiper-button-prev bg-red-700 p-2 mx-1" fill="#fff" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>
                <svg style={{cursor: 'pointer'}} className="swiper-button-next bg-red-700 p-2 mx-1" fill="#fff" height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>
            </div>

            <div className="pt-9 lg:pt-8 md:pt-8 flex items-center justify-center px-9 lg:px-0 lg:pr-16 lg:pl-20 md:pl-20 sm:pl-10">
                <Swiper
                    spaceBetween={0}
                    loopFillGroupWithBlank={true}
                    speed={4000}
                    autoplay={{
                        delay:-10
                    }}
                    slidesPerView={4}
                    loop={true}
                    modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={{
                        640: { slidesPerView: 5 },
                        768: { slidesPerView: 5 },
                        1024: { slidesPerView: 6 },
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    pagination={{
                        clickable: true
                    }}
                >
                    { brands.map((brand, index) => (
                        <SwiperSlide key={index}>
                            <Brands brand={brand.brand_img} brand_alt={brand.brand_alt} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default BrandSlider;