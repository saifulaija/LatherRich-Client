

import { Image } from 'antd';
import bannerImage from '../../assets/images/home-page-iamge.png';
import './Banner.css'

const Banner = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Image
      className='ant-image-img'
        src={bannerImage}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
        alt="Banner"
      />
    </div>
  );
};

export default Banner;

