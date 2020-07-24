import React, { useContext, useMemo } from 'react';
import Img from 'gatsby-image';

import { ImagesContext } from '../../contexts/images';

const Image = (src, alt) => {
  const { data } = useContext(ImagesContext);
  const fluid = useMemo(
    () =>
      data.allFile.nodes.find(({ relativePath }) => src === relativePath)
        .childImageSharp.fluid,
    [data, src]
  );

  return <Img fluid={fluid} alt={alt} />;
};

export default Image;
