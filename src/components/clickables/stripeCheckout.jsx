import React, { useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { loadStripe } from '@stripe/stripe-js';

import { STYLES, LOADING_STATUS, ENV, MESSAGE_TYPES } from '../../enums';
import { checkout } from '../../services/gatsbyx-backend/purchase';
import { setOnLoginRediret } from '../../utilities/storage';
import { MessageContext } from '../../contexts/message';
import { BrowserContext } from '../../contexts/browser';
import useStatus from '../../hooks/useStatus';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import Button from './button';

const Container = styled.div`
  .stripe-button {
    background: rgb(169, 96, 238);
    background: linear-gradient(
      114deg,
      rgba(169, 96, 238, 1) 0%,
      rgba(255, 51, 61, 0.9) 30%,
      rgba(255, 203, 87, 0.9) 60%,
      rgba(144, 224, 255, 1) 90%
    );
    color: ${STYLES.colors.mattBlack};
    font-weight: ${STYLES.fontWeights.medium};

    &:disabled {
      color: ${STYLES.colors.mattBlackLighter};
      font-weight: ${STYLES.fontWeights.normal};
    }
  }
`;

const tag = 'Checkout';
const successHash = '#success';

const Checkout = ({ id, onCheckout, disabled }) => {
  const { pathname, hash } = useContext(BrowserContext);
  const { setMessage, setType } = useContext(MessageContext);
  const isLoggedIn = useIsLoggedIn();
  const { isLoading, setStatus } = useStatus();

  useEffect(() => {
    if (hash === successHash) {
      setStatus(LOADING_STATUS.hasSucceeded);
      setType(MESSAGE_TYPES.success);
      setMessage(
        'Thank you for choosing GatsbX and your purchase. An confirmation email is on the way.'
      );
    }
  }, [hash, setMessage, setStatus, setType]);

  const handleCheckout = useCallback(
    async e => {
      e.preventDefault();

      if (!isLoggedIn) {
        setOnLoginRediret(pathname);
        navigate('/login');
        return;
      }
      if (onCheckout) {
        onCheckout();
      }
      setStatus(LOADING_STATUS.isLoading);
      // TOODO storeOnCheckout();
      const { session } = await checkout(id);
      console.tag(tag).debug(session);
      const stripe = await loadStripe(ENV.stripePublicKey);
      stripe
        .redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: session.id,
        })
        .then(result => {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
          if (result.error) {
            setStatus(LOADING_STATUS.hasFailed);
            console.tag(tag).error(result.error.message);
            setType(MESSAGE_TYPES.error);
            setMessage(result.error.message);
          }
          // we dont have to do anything on case of success as:
          // when we have success, our server already got the webhook trigger
          // which means after redirect, we fetch the new user object which got the course in it!
        });
    },
    [id, isLoggedIn, onCheckout, pathname, setMessage, setStatus, setType]
  );

  return (
    <Container>
      <Button
        label="Checkout"
        classes="stripe-button"
        onClick={handleCheckout}
        disabled={disabled}
        isLoading={isLoading}
      />
    </Container>
  );
};

Checkout.propTypes = {
  id: PropTypes.string.isRequired,
  onCheckout: PropTypes.func,
  disabled: PropTypes.bool,
};

Checkout.defaultProps = {
  onCheckout: undefined,
  disabled: false,
};

export default Checkout;
