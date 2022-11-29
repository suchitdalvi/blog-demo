import React, { useState } from "react";

import NoImage from "../../assests/noimage.jpg";
import Loader from "../loader/Loader";

export interface ImageProps {
  src: string;
  alt: string;
  classes?: string;
}

export default function Image({ src, alt, classes }: ImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isImgError, setImgError] = useState(false);

  if (isImgError) {
    return <img alt={alt} src={NoImage} className={classes} />;
  }

  return (
    <>
      {isLoading && <Loader />}
      <img
        alt={alt}
        src={src}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={() => setImgError(true)}
        className={`${classes} ${isLoading ? 'hidden' : 'inline-block'}`}
      />
    </>
  );
}
