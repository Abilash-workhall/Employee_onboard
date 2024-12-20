import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const ProgressIndicator = ({ steps, currentStatus = "Account created" }) => {
  const getStepPosition = (status) => {
    const position = steps.findIndex(
      ({ status: stepStatus }) => stepStatus === status
    );
    
    return position !== -1 ? position : 0; 
  };

  return (
    <div style={{ margin: 50, flexDirection: "column-reverse" }}>
      <div className="">
      <ProgressBar
        width={800}
        height={10}
        percent={100 * (getStepPosition(currentStatus) / (steps.length - 1))}
        filledBackground=" linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(33,124,245,1) 35%, rgba(0,212,255,1) 100%)"
      >
        {steps.map((step, index, arr) => (
          <Step
            key={step.status}
            position={100 * (index / (arr.length - 1))} 
            transition="scale"
            children={({ accomplished }) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  color: "white",
                  backgroundColor: accomplished ? "#217cf5" : "gray"
                }}
              >
                {index + 1}
                <p className="absolute bottom-10 text-slate-500  text-[12px]   "> {step.status} </p>
              </div>
            )}
          />
        ))}
      </ProgressBar>
      </div>
    </div>
  );
};

export default ProgressIndicator;