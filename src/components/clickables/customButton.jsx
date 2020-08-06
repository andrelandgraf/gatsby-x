import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const CustomButton = React.forwardRef(
  ({ classes, label, title, onClick, children }, ref) => (
    <>
      {React.cloneElement(children, {
        ref,
        className: `clickable ${classes}`,
        tabIndex: 0,
        role: 'button',
        'aria-label': label,
        titel: title,
        onClick,
        onKeyUp: useCallback(
          event => {
            if (event.keyCode === 13) {
              event.preventDefault();
              // Trigger the button element with a click
              onClick();
            }
          },
          [onClick]
        ),
      })}
    </>
  )
);

CustomButton.displayName = 'CustomButton';

CustomButton.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.string,
  onClick: PropTypes.func,
};

CustomButton.defaultProps = {
  classes: '',
  onClick: undefined,
};

export default CustomButton;
