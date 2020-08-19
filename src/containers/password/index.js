import React, { useState, useCallback, useContext, useEffect } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';

import { changePassword } from '../../services/gatsbyx-backend/user';
import { resetPassword } from '../../services/gatsbyx-backend/oauth';

import { LOADING_STATUS, STYLES } from '../../enums';
import { BrowserContext } from '../../contexts/browser';
import { MessageContext, MESSAGE_TYPES } from '../../contexts/message';
import useStatus from '../../hooks/useStatus';
import useDisplayErrorMessage from '../../hooks/useDisplayErrorMessage';
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import { Button, Stack } from '../../components';

const Form = styled.form`
  width: 100%;
  @media screen and (min-width: ${STYLES.breakpoints.padWidth}px) {
    width: 400px;
  }
`;

const tag = 'ChangePassword';

const Password = () => {
  const { parameters } = useContext(BrowserContext);
  const { setMessage, setType } = useContext(MessageContext);
  const displayErrorMessage = useDisplayErrorMessage();
  const isLoggedIn = useIsLoggedIn();
  const { isLoading, setStatus, status } = useStatus();
  const [password, setPassword] = useState('');
  const [repeatPw, setPepeatPw] = useState('');
  const [isResetAttempt, setIsResetAttempt] = useState(false);

  useEffect(() => {
    const { token } = parameters;
    if (token) {
      console.tag(tag).debug('we found the token in the query');
      setIsResetAttempt(true);
    }
    if (!token && !isLoggedIn) {
      console.tag(tag).debug('no token, nor loggedIn, redirect');
      navigate('/login');
    }
  }, [isLoggedIn, parameters]);

  const handlePasswordChange = useCallback(event => {
    setPassword(event.target.value);
  }, []);

  const handleRepeatPwChange = useCallback(event => {
    setPepeatPw(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      console.tag(tag).debug('updating password...');
      if (!password || !repeatPw) {
        setMessage(
          'Please pick a new password and repeat it in a second time.'
        );
        setType(MESSAGE_TYPES.warning);
        return false;
      }

      if (password !== repeatPw) {
        setMessage("Ups... your passwords don't match. Please try again.");
        setType(MESSAGE_TYPES.warning);
        return false;
      }

      setStatus(LOADING_STATUS.isLoading);
      try {
        if (isResetAttempt) {
          const { token } = parameters;
          await resetPassword(token, password);
        } else {
          await changePassword(password);
        }
        const redirectMessage = isResetAttempt
          ? ' You will be redirected to the login page. Please use your new password to login.'
          : '';
        setMessage(`Your password has been updated!${redirectMessage}`);
        setType(MESSAGE_TYPES.success);
        setStatus(LOADING_STATUS.hasSucceeded);
        if (isResetAttempt) {
          setTimeout(() => {
            navigate('/login');
          }, 5000);
        }
        return true;
      } catch (error) {
        setStatus(LOADING_STATUS.hasFailed);
        setType(MESSAGE_TYPES.error);
        displayErrorMessage(error);
        return false;
      }
    },
    [
      displayErrorMessage,
      isResetAttempt,
      parameters,
      password,
      repeatPw,
      setMessage,
      setStatus,
      setType,
    ]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap="20px">
        <Stack margin="0 0 10px 0">
          <h1>{isResetAttempt ? 'Reset password' : 'Update password'}</h1>
        </Stack>
        <input
          type="password"
          autoComplete="new-password"
          aria-label="Your new password"
          placeholder="Your new password"
          size="40"
          value={password}
          onChange={handlePasswordChange}
          pattern=".{1,}"
          title="Please pick a new password for your account."
          required
        />
        <input
          type="password"
          autoComplete="new-password"
          aria-label="Repeat password"
          placeholder="Repeat password"
          size="40"
          value={repeatPw}
          onChange={handleRepeatPwChange}
          pattern=".{1,}"
          title="Please repeat your password to ensure it is correct."
          required
        />
        <Button
          label={
            status === LOADING_STATUS.hasSucceeded
              ? 'Saved password!'
              : 'Update password'
          }
          isLoading={isLoading}
          disabled={status !== LOADING_STATUS.isIdle}
          submit
        />
      </Stack>
    </Form>
  );
};

export default Password;
