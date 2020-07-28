import React, { useState, useCallback, useContext } from 'react';
import styled from 'styled-components';

import { navigate } from 'gatsby';
import { LOADING_STATUS, MESSAGE_TYPES, STYLES } from '../enums';
import { registerUser } from '../services/gatsbyx-backend/user';
import { UserContext } from '../contexts/user';
import { MessageContext } from '../contexts/message';
import useStatus from '../hooks/useStatus';
import SEO from '../components/layout/seo';
import { Stack, Checkbox, Button, CustomLink } from '../components';

const Form = styled.form`
  width: 100%;
  @media screen and (min-width: ${STYLES.breakpoints.padWidth}px) {
    width: 400px;
  }
`;

const tag = 'Signup';

const Signup = () => {
  const { setUser } = useContext(UserContext);
  const { setMessage, setType } = useContext(MessageContext);
  const { isLoading, setStatus } = useStatus();
  const [givenName, setGivenName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPw, setPepeatPw] = useState('');
  const [acceptsProtection, setAcceptsProtection] = useState(false);

  const handleCheckboxChange = useCallback(() => {
    setAcceptsProtection(!acceptsProtection);
  }, [acceptsProtection]);

  const handleGivenNameChange = useCallback(event => {
    setGivenName(event.target.value);
  }, []);

  const handleFamilyNameChange = useCallback(event => {
    setFamilyName(event.target.value);
  }, []);

  const handleEmailChange = useCallback(event => {
    setEmail(event.target.value);
  }, []);

  const handlePasswordChange = useCallback(event => {
    setPassword(event.target.value);
  }, []);

  const handleRepeatPwChange = useCallback(event => {
    setPepeatPw(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();

      if (!acceptsProtection) {
        setMessage(
          'We need your agreement to our data protection. Please check the checkbox.'
        );
        setType(MESSAGE_TYPES.warning);
        return false;
      }

      if (
        !givenName ||
        !familyName ||
        email.length < 2 ||
        !password ||
        !repeatPw
      ) {
        setMessage(
          'Please provide your name. You can also provide a nickname if you are not sure about. Please provide your email addess so that we can send you a message in case you forgot your password.'
        );
        setType(MESSAGE_TYPES.warning);
        return false;
      }

      if (password !== repeatPw) {
        setMessage("Ups... your passwords don't match. Please try again.");
        setType(MESSAGE_TYPES.warning);
        return false;
      }

      try {
        setStatus(LOADING_STATUS.isLoading);
        const fetchedUser = await registerUser({
          email,
          password,
          givenName,
          familyName,
        });
        setStatus(LOADING_STATUS.hasSucceeded);
        setUser(fetchedUser);
        navigate('/');
        return true;
      } catch (error) {
        console.tag(tag).error(error);
        setStatus(LOADING_STATUS.hasFailed);
        setMessage(error.message);
        setType(MESSAGE_TYPES.error);
        return false;
      }
    },
    [
      acceptsProtection,
      email,
      familyName,
      givenName,
      password,
      repeatPw,
      setMessage,
      setStatus,
      setType,
      setUser,
    ]
  );

  return (
    <>
      <SEO title="Signup" shouldIndex={false} />
      <Form onSubmit={handleSubmit}>
        <Stack gap="20px">
          <Stack margin="0 0 10px 0">
            <h1>Create an account</h1>
          </Stack>
          <input
            type="text"
            autoComplete="given-name"
            placeholder="Given name"
            size="40"
            value={givenName}
            onChange={handleGivenNameChange}
            required
          />
          <input
            type="text"
            autoComplete="family-name"
            placeholder="Family name"
            size="40"
            value={familyName}
            onChange={handleFamilyNameChange}
            required
          />
          <input
            type="email"
            autoComplete="email"
            placeholder="Email address"
            size="40"
            value={email}
            onChange={handleEmailChange}
            pattern=".{3,}"
            title="Your email address is required."
            required
          />
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Your password"
            size="40"
            value={password}
            onChange={handlePasswordChange}
            pattern=".{1,}"
            title="Please pick a password to protect your account."
            required
          />
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Repeat password"
            size="40"
            value={repeatPw}
            onChange={handleRepeatPwChange}
            pattern=".{1,}"
            title="Your passwords don't match."
            required
          />
          <Checkbox
            id="protection-checkbox"
            label={
              <>
                {'I agree with the '}
                <CustomLink link="/protection" newTab>
                  {'Data Protection '}
                </CustomLink>
              </>
            }
            onChange={handleCheckboxChange}
            checked={acceptsProtection}
            required
            alignLeft
          />
          <Button label="Sign Up" isLoading={isLoading} submit />
        </Stack>
      </Form>
    </>
  );
};

export default Signup;
