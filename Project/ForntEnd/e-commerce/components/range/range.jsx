import React, { useState } from "react";
import { Range } from "react-range";
import "./range.css";

const PriceRange = ({ onFilter }) => {
  const [values, setValues] = useState([0, 200000]);

  const handleChange = (newValues) => {
    setValues(newValues);
    if (onFilter) onFilter(newValues[0], newValues[1]);
  };

  return (
    <div className="range-wrapper">
      <h4 className="range-title">
        Price Range{" "}
        <span className="range-sub">
          ₹{values[0]} – ₹{values[1]}
        </span>
      </h4>

      <Range
        step={100}
        min={0}
        max={200000}
        values={values}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div
            ref={props.ref}
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              borderRadius: "3px",
              background: `linear-gradient(to right, 
                #ddd ${values[0] / 50}%, 
                #000 ${values[0] / 50}%, 
                #000 ${values[1] / 50}%, 
                #ddd ${values[1] / 50}%)`,
              cursor: "pointer",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="range-thumb"
            style={{
              ...props.style,
              height: "18px",
              width: "18px",
              borderRadius: "50%",
              backgroundColor: "#000",
              border: "2px solid #fff",
              boxShadow: "0 0 4px rgba(0,0,0,0.3)",
              cursor: "grab",
            }}
          />
        )}
      />
    </div>
  );
};

export default PriceRange;
