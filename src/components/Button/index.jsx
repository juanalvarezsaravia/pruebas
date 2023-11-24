import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({ onClick, className, type = "button", children }) => {
    return (
        <button type={type} onClick={onClick} className={`custom-btn ${className}`}>
            {children}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    type: PropTypes.string
};

export default Button;