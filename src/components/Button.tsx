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
      className={`${className} bg-cyan-300 text-gray-900 font-semibold px-10 p-2 rounded-md text-lg hover:bg-cyan-200 transition-colors cursor-pointer    `}
    >
      {children}
    </div>
  );
}

export default Button;
