import React from 'react';

const Footer = () => {
  const footerStyle = {
    position: 'fixed',
    bottom: '0px',
    backgroundColor: 'lightskyblue',
    height: '60px', // Increased height for a chat-like appearance
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: '1px solid #ccc', // Add a border at the top for separation
    boxShadow: '0px -3px 5px rgba(0, 0, 0, 0.1)' // Add a subtle shadow
  };

  const textStyles = {
    color: 'white', // Text color
    fontWeight: 'bold', // Make the text bold
  };

  return (
    <div style={footerStyle}>
      <span className='text-center' style={textStyles}>
        &copy; Chat socket 2023 Lidor Avisar. All rights reserved.
      </span>
    </div>
  );
};

export default Footer;
