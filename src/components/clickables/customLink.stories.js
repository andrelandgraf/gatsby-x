import React from 'react';
import CustomLink, { styles } from './customLink';

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

export const withAsButton = () => (
  <CustomLink link="/login" as={styles.asButton}>
    Button styled link
  </CustomLink>
);

export const withAsPrimaryButton = () => (
  <CustomLink link="/login" as={styles.asPrimaryButton}>
    Button styled link
  </CustomLink>
);
