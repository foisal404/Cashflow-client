import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function Button({ children, onClick = () => {}, className = "" }: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`${className} bg-gray-800 text-white font-semibold px-7 md:px-10 p-2 rounded-md text-sm lg:text-lg hover:bg-gray-900 transition-colors cursor-pointer`}
    >
      {children}
    </div>
  );
}

export default Button;
