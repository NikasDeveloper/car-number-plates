import React from 'react';

const Label = (props) => {
  const styles = {
    display: 'inline-block',
    marginBottom: '.5rem',
    textTransform: 'capitalize'
  };
  return <label style={styles}>{props.children}</label>;
};

export default Label;