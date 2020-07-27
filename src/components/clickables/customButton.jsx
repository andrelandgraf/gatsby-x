import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = ({ id, classes, onClick, children }) => (
  <>
    {React.cloneElement(children, {
      className: `clickable ${classes}`,
      id,
      tabIndex: 0,
      role: 'button',
      onClick,
      onKeyUp: event => {
        if (event.keyCode === 13) {
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById(id).click();
        }
      },
    })}
  </>
);

CustomButton.propTypes = {
  id: PropTypes.string.isRequired,
  classes: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

CustomButton.defaultProps = {
  classes: '',
  onClick: undefined,
};

export default CustomButton;
