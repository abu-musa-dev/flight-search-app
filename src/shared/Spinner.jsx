import React from "react";

const Spinner = ({ size = 50, thickness = 8, text = "", className = "" }) => {
  const viewBox = 50;
  const center = viewBox / 2;
  const radius = 20;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center ${className}`}
    >
      {/* Spinner icon */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        className="animate-spin"
        style={{ animationDuration: "0.5s" }} // Spin speed
        aria-hidden="true"
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          fill="none"
          strokeOpacity="0.25"
        />
        {/* Moving arc */}
        <path
          d={`
            M ${center} ${center - radius}
            A ${radius} ${radius} 0 1 1 ${center - 0.01} ${center - radius}
          `}
          stroke="currentColor"
          strokeWidth={thickness}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Optional text next to spinner */}
      {text ? (
        <span className="ml-3 text-sm font-medium text-gray-600">{text}</span>
      ) : (
        <span className="sr-only">Loading...</span>
      )}
    </div>
  );
};

export default Spinner;
