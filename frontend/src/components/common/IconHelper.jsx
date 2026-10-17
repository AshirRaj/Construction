// src/components/common/IconHelper.jsx
import React from 'react';
import * as Icons from 'lucide-react';

export const IconHelper = ({ name, className = 'w-6 h-6', ...props }) => {
  const IconComponent = Icons[name] || Icons.Building;
  return <IconComponent className={className} {...props} />;
};
