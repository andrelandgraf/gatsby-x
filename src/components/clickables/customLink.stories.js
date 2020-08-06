import React from 'react';
import CustomLink from './customLink';

export default { title: 'Link' };

export const withDefault = () => (
  <CustomLink link="/login">This is a Link.</CustomLink>
);

export const withPageLink = () => (
  <CustomLink link="/login" isPage>
    This is a Link.
  </CustomLink>
);

export const withNewTab = () => (
  <CustomLink link="/login" newTab>
    This is a Link to a new tab.
  </CustomLink>
);
