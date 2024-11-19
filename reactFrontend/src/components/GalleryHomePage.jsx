import gallery_img_1 from '../styles/images/gallery/gallery.png';
import gallery_img_2 from '../styles/images/gallery/gallery2.png';
import gallery_img_3 from '../styles/images/gallery/gallery3.png';
import gallery_img_4 from '../styles/images/gallery/gallery4.png';
import gallery_img_5 from '../styles/images/gallery/gallery5.png';
import gallery_img_6 from '../styles/images/gallery/gallery6.png';
import gallery_img_7 from '../styles/images/gallery/gallery7.png';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';


const Galleries = ({gallery, gallery_alt}) => {
    return(
        <img src={gallery} width={500} alt={gallery_alt} />
    );
}


const GalleryHomePage = () => {
    const gallery_imgs = [
        {gallery_img: gallery_img_1, gallery_img_alt: 'Gallery img 1'},
        {gallery_img: gallery_img_2, gallery_img_alt: 'Gallery img 2'},
        {gallery_img: gallery_img_3, gallery_img_alt: 'Gallery img 3'},
        {gallery_img: gallery_img_4, gallery_img_alt: 'Gallery img 4'},
        {gallery_img: gallery_img_5, gallery_img_alt: 'Gallery img 5'},
        {gallery_img: gallery_img_6, gallery_img_alt: 'Gallery img 6'},
        {gallery_img: gallery_img_4, gallery_img_alt: 'Gallery img 4'},
        // {gallery_img: gallery_img_7, gallery_img_alt: 'Gallery img 7'},
    ]

    return(
        <div className=''>
                <Swiper
                    spaceBetween={-10}
                    loopFillGroupWithBlank={true}
                    speed={1000}
                    autoplay={{
                        delay:4000
                    }}
                    slidesPerView={3}
                    loop={true}
                    modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
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