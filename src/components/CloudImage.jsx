import { Cloudinary } from '@cloudinary/url-gen'
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import React from 'react'
import { AdvancedImage, placeholder } from '@cloudinary/react';


const cld = new Cloudinary({
    cloud:{
        cloudName: import.meta.env.VITE_CLOUD_NAME
    }
});

const CloudImage = ({publicId}) => {

  const myImage = cld.image(publicId).delivery(format('auto')).delivery(quality('auto'));
  return (
   publicId&& <AdvancedImage
   cldImg={myImage}
   style={{ maxWidth: '100%' }}


 />
  )
}

export default CloudImage