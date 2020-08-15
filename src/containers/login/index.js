import React, { useState, useCallback, useContext, useEffect } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';

import { LOADING_STATUS, STYLES, MESSAGE_TYPES } from '../../enums';
import { getOnLoginRedirect } from '../../utilities/storage';
import { logUserIn, applyResetPw } from '../../services/gatsbyx-backend/user';
import { BrowserContext } from '../../contexts/browser';
import { MessageContext } from '../../contexts/message';
import { UserContext } from '../../contexts/user';
import useStatus from '../../hooks/useStatus';
import { Button, Stack, CustomLink } from '../../components';
import SEO from '../../components/layout/seo';

const Form = styled.form`
  width: 100%;
  @media screen and (min-width: ${STYLES.breakpoints.padWidth}px) {
    width: 400px;
  }
`;

const Centered = styled.div`
  width: 100%;
  text-align: center;
  @media screen and (min-width: ${STYLES.breakpoints.padWidth}px) {
    width: 400px;
  }
`;

const tag = 'Login';
const forgotRef = '#forgot';

const Login = () => {
  const { hash } = useContext(BrowserContext);
  const { setMessage, setType } = useContext(MessageContext);
  const { user, setUser } = useContext(UserContext);
  const { isLoading, status, setStatus } = useStatus();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotPassword, setForgotPassword] = useState(false);

  useEffect(() => {
    setForgotPassword(hash === forgotRef);
  }, [hash]);

  const handleEmailChange = useCallback(event => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback(event => {
    setPassword(event.target.value);
  }, []);

  const forgotPasswordClicked = useCallback(() => {
    setForgotPassword(true);
    setMessage('');
    setPassword('');
    setStatus(LOADING_STATUS.isIdle);
  }, [setMessage, setStatus]);

  const handleLogin = useCallback(async () => {
    if (email.length < 2 || !password) {
      setMessage(
        "Please insert your user credentials. You do'nt have an account with us? Just click on signup to create an account with us in no time!"
      );
      setType(MESSAGE_TYPES.warning);
      return false;
    }

    setStatus(LOADING_STATUS.isLoading);
    try {
      const fetchedUser = await logUserIn(email, password);
      setStatus(LOADING_STATUS.hasSucceeded);
      setUser(fetchedUser);
      return true;
    } catch (error) {
      setStatus(LOADING_STATUS.hasFailed);
      setMessage(error.message);
      setType(MESSAGE_TYPES.error);
      return false;
    }
  }, [email, password, setMessage, setStatus, setType, setUser]);

  const handleForgotPw = useCallback(async () => {
    console.tag(tag).verbose('reset password email on the way!');
    if (email.length < 2) {
      console.tag(tag).warn('no email provied');
      return false;
    }

    setStatus(LOADING_STATUS.isLoading);
    try {
      const { message: msg } = await applyResetPw(email);
      console.tag(tag).http(msg);
      setStatus(LOADING_STATUS.hasSucceeded);
      setMessage(
        'Please check your mailbox. We have sent you a reset link to your email address. You can close this tab now.'
      );
      setType(MESSAGE_TYPES.success);
      return true;
    } catch (error) {
      console.tag(tag).error(error);
      setStatus(LOADING_STATUS.hasFailed);
      setMessage(error.message);
      setType(MESSAGE_TYPES.error);
      setForgotPassword(false);
      return false;
    }
  }, [email, setMessage, setStatus, setType]);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      console
        .tag(tag)
        .debug('handleSubmit, forgot password state:', forgotPassword);
      if (forgotPassword) {
        return handleForgotPw();
      }
      return handleLogin();
    },
    [forgotPassword, handleForgotPw, handleLogin]
  );

  useEffect(() => {
    if (user) {
      const path = getOnLoginRedirect();
      if (path) {
        navigate(path, { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user]);

  if (status === LOADING_STATUS.hasSucceeded && forgotPassword) {
    return (
      <>
        <SEO title="Forgot" shouldIndex={false} />
        <Centered>
          <Stack gap="20px">
            <Stack margin="0 0 10px 0">
              <h1>Forgot password</h1>
            </Stack>
            <h2>Please check your mailbox</h2>
            <CustomLink link="/login">Back to login</CustomLink>
          </Stack>
        </Centered>
      </>
    );
  }
  return (
    <>
      <SEO title={forgotPassword ? 'Forgot' : 'Login'} shouldIndex={false} />
      <Form onSubmit={handleSubmit}>
        <Stack gap="20px">
          <Stack margin="0 0 10px 0">
            <h1>{forgotPassword ? 'Forgot password' : 'Log in'}</h1>
          </Stack>
          <input
            type="email"
            autoComplete="email"
            aria-label="Your email address"
            placeholder="Your email address"
            value={email}
            onChange={handleEmailChange}
            pattern=".{3,}"
            title="Please provide your email address."
            required
          />
          {!forgotPassword && (
            <input
              type="password"
              autoComplete="current-password"
              aria-label="Your password"
              placeholder="Your password"
              value={password}
              onChange={handlePasswordChange}
              pattern=".{1,}"
              title="Please type your password, so we can make sure it's actually you."
              required
            />
          )}
          {!forgotPassword && (
            <a href={forgotRef} onClick={forgotPasswordClicked}>
              Forgot your password?
            </a>
          )}

          <Button
            label={forgotPassword ? 'Reset' : 'Login'}
            isLoading={isLoading}
            submit
          />
          <p>
            New at gatsbyx? &nbsp;
            <CustomLink link="/signup">Signup now</CustomLink>
          </p>
        </Stack>
      </Form>
    </>
  );
};

export default Login;
