import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { MessageProvider } from '../contexts/message';
import { Stack, SEO, Checkout, Grid } from '../components';
import Image from '../components/image/image';

const ImageContainer = styled.div`
  width: 20vw;
  max-width: 800px;
`;

const ItemPage = ({ data: { items: item } }) => {
  console.log(item);
  return (
    <MessageProvider>
      <SEO title={item.title} />
      <Grid columns={2} gap="60px" centered>
        <Stack gap="20px" centered={false}>
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <Checkout id={item.id} />
        </Stack>
        <ImageContainer>
          <Image src={item.imageUrl} alt={item.imageText} />
        </ImageContainer>
      </Grid>
    </MessageProvider>
  );
};

ItemPage.propTypes = {
  data: PropTypes.shape({
    items: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageText: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ItemPage;

export const query = graphql`
  query($id: String!) {
    items(id: { eq: $id }) {
      id
      title
      description
      imageText
      imageUrl
      price
      link
    }
  }
`;
