import gallery_img_1 from '../styles/images/gallery/gallery.png';
import gallery_img_2 from '../styles/images/gallery/gallery2.png';
import gallery_img_3 from '../styles/images/gallery/gallery3.png';
import gallery_img_4 from '../styles/images/gallery/gallery4.png';
import gallery_img_5 from '../styles/images/gallery/gallery5.png';
import gallery_img_6 from '../styles/images/gallery/gallery6.png';
import gallery_img_7 from '../styles/images/gallery/gallery7.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Galleries = ({gallery, gallery_alt}) => {
    return(
        <div className=' overflow-hidden'>
            <img src={gallery}  className='h-[200px] mx-3 object-cover w-56' alt={gallery_alt} />
        </div>
    );
}



const GalleryHomePage = () => {
    const [galleries, setGalleries] = useState([])

    useEffect(() => {
        const Gellery = async () => {
            try{
                const response = await axios.get('https://admin.fn-drive.com/api/gallery/')
                setGalleries(response.data)
                console.log('galleries', response.data)
            }
            catch(error)  {
                console.log('error', error)
            }
        }
        Gellery();
    }, [])

    const gallery_imgs = galleries.map((gallery) => ({
        gallery_img: `https://admin.fn-drive.com${gallery.image}`, gallery_img_alt: gallery.title,

    }));

    useEffect(() => {
        console.log('gallery_imgs', gallery_imgs);

    }, [])

    return(
        <div className=''>
                <Swiper
                    spaceBetween={-10}
                    loopFillGroupWithBlank={true}
                    speed={1000}
                    autoplay={{
                        delay:4000
                    }}
                    slidesPerView={2}
                    loop={true}
                    modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={{
                        480: { slidesPerView: 2 },
                        480: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
                >
                    { gallery_imgs.map((gallery_img, index) => (
                        <SwiperSlide key={index}>
                            <Galleries gallery={gallery_img.gallery_img} gallery_alt={gallery_img.gallery_img_alt} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
    );
}
export default GalleryHomePage