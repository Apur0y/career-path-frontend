import React from 'react';
import Image from 'next/image';

type LogoProps = {
  width?: number;
  height?: number;
  src?: string;
  alt?: string;
  className?: string;
};

const Logo: React.FC<LogoProps> = ({
  width = 40,
  height = 40,
  src = '/mainlogo.png',
  alt = 'Logo',
  className = '',
}) => {
  return (
    <div className={`flex items-center  ${className}`}>
      {/* <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
      /> */}
      <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path> </svg>
      <p className='text-primary font-bold text-2xl'>Career<span className='text-blue-500'>Path</span></p>
    </div>
  );
};

export default Logo;
