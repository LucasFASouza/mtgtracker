"use client";

import React from "react";

interface TabIconProps {
  icon: React.ElementType;
  isActive: boolean;
  size?: number;
  className?: string;
}

export default function TabIcon({
  icon: Icon,
  isActive,
  size = 20,
  className = "mb-1",
}: TabIconProps) {
  return (
    <Icon
      className={className}
      size={size}
      weight={isActive ? "fill" : "regular"}
    />
  );
}
