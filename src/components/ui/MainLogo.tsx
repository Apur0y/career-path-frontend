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
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
      />
    </div>
  );
};

export default Logo;
