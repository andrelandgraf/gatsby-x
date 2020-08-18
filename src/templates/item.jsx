import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { ReactComponent as ArrowDown } from '../assets/svgs/download.svg';

import { STYLES, ENV } from '../enums';
import { MessageProvider } from '../contexts/message';
import useUserHasItem from '../hooks/useUserHasItem';
import { Stack, SEO, Grid } from '../components';
import CustomLink, { styles } from '../components/clickables/customLink';
import Checkout from '../components/clickables/stripeCheckout';
import Image from '../components/image/image';

const ImageContainer = styled.div`
  width: 20vw;
  max-width: 800px;
`;

const ButtonContainer = styled.div`
  @media screen and (max-width: ${STYLES.breakpoints.phoneWidth}px) {
    width: 100%;
  }
  a {
    margin: 0 10px 20px 0;
  }

  svg {
    width: 30px;
  }
`;

const ItemPage = ({ data: { items: item } }) => {
  const userHasItem = useUserHasItem(item.id);

  const buttons = useMemo(
    () =>
      userHasItem ? (
        <ButtonContainer>
          <CustomLink
            link={`${ENV.mediaPath}/${item.link}.png`}
            as={styles.asButton}
            title={`Download the ${item.title} png file`}
            download={`${item.title}.png`}
          >
            <ArrowDown />
            Download png
          </CustomLink>
          <CustomLink
            link={`${ENV.mediaPath}/${item.link}.svg`}
            as={styles.asPrimaryButton}
            title={`Download the ${item.title} svg file`}
            download={`${item.title}.svg`}
          >
            <ArrowDown />
            Download svg
          </CustomLink>
        </ButtonContainer>
      ) : (
        <Checkout id={item.id} />
      ),
    [item.id, item.link, item.title, userHasItem]
  );
  return (
    <MessageProvider>
      <SEO title={item.title} />
      <Grid columns={2} gap="60px" centered>
        <Stack>
          <Stack gap="20px" collapseX centered={false}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            {buttons}
          </Stack>
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
