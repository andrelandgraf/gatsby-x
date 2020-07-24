import PropTypes from 'prop-types';

export const locationType = PropTypes.shape({
  pathname: PropTypes.string.isRequired,
  hash: PropTypes.string,
  search: PropTypes.string,
});

const pagePropsTypes = {
  location: locationType.isRequired,
};

export default pagePropsTypes;
