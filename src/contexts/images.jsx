import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';

const ImagesContext = React.createContext({ data: {} });

function GatsbyImagesProvider({ children }) {
  const data = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 3000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  `);

  const context = { data };

  console.tag('ImageContext').debug(data);
  return (
    <ImagesContext.Provider value={context}>{children}</ImagesContext.Provider>
  );
}

GatsbyImagesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { ImagesContext, GatsbyImagesProvider };
