
import image from './..//../assets/images/home-page-iamge.png'
const Banner = () => {
  return (
    <div>
      <img loading='lazy' src={image} alt="" className='bg-cover bg-center'/>
    </div>
  );
};

export default Banner;