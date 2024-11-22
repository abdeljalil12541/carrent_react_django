import AboutBannerMorocco from '../styles/images/banner-morocco.png'

const HomePageMoroccoBaner = () => {
    return(
        <div className="w-full">
            <div className='w-full relative'>
                <img className='w-full h-56 md:h-full object-cover' src={AboutBannerMorocco} alt="" />
                <div className='BannerMoroccoBg'></div>
                <div className='aboutUsContent w-full flex justify-center items-center'>
                    <div>
                        <p className='sm:text-xl md:text-3xl lg:text-5xl font-light text-center text-white'>Disponible 24/7 <br /> Notre ligne téléphonique est disponible 24/7 Us</p>
                        <div className='w-full flex justify-center mt-5 md:mt-10'>
                            <button className='py-3 hover:bg-red-500 mt-8 duration-150 text-xs md:text-base px-3 sm:px-6 rounded-3xl bg-red-600 text-white'>En savoir plus sur RN Car - FAQ</button>
                        </div>
                    </div>
                </div>

            </div>
            
            <div className='w-full bg-red-700 text-white text-[12px] px-1 md:px-0 sm:text-xl md:text-3xl font-light text-center py-2 sm:py-5'> NOUS VOUS PROPOSONS UNIQUEMENT DES VOITURES DE LUXE </div>
            
        </div>
    )
}
export default HomePageMoroccoBaner