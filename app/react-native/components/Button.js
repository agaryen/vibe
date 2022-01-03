import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const uiColors = {
  primary: 'bg-indigo-500 text-white',
  danger: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  success: 'bg-green-500 text-white',
};

const Button = ({ children, style, uiStyle = 'primary', onPress, disabled, ...props }) => {
  const color = disabled ? 'bg-gray-300 text-white' : uiColors[uiStyle];

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      style={[tw`px-4 py-3 rounded-lg`, tw.style(color), style]}
      disabled={disabled}
    >
      <Text style={[tw`text-base font-semibold self-center`, tw.style(color)]}>{children}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  uiStyle: PropTypes.oneOf(['primary', 'danger', 'warning', 'success']),
  fluid: PropTypes.bool,
};

export default Button;
