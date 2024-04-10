import React, { useEffect, useState } from 'react'

const ImageSwapper = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(currentIndex === images.length - 1) {
                setCurrentIndex(0);
            } 
            else {
                 setCurrentIndex(currentIndex + 1);
            }
        }, 12000)
        
        return () => clearInterval(intervalId);
    }, [currentIndex])

  return (
    <img src={images[currentIndex]} style={{
         width: "40vw",
        maxHeight: "80vh",
     objectFit: "contain",
    
    
    
       padding:" 2rem"}} />
  )
}

export default ImageSwapper