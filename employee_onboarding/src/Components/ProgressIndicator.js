import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const ProgressIndicator = ({ steps, currentStatus }) => {
  const getStepPosition = (status) => {
    return steps.findIndex(({ status: stepStatus }) => stepStatus === status) + 1;
  };

  return (
    <div style={{ margin: 50,flexDirection:"column-reverse" }}>
      <ProgressBar
        width={650}
        percent={100 * (getStepPosition(currentStatus) / steps.length)}
        filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        {steps.map((step, index, arr) => (
          <Step
            key={step.status}
            position={100 * (index / arr.length)}
            transition="scale"
            children={({ accomplished }) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  color: "white",
                  backgroundColor: accomplished ? "green" : "gray"
                }}
              >
                {index + 1}
              </div>
            )}
          />
        ))}
      </ProgressBar>
    </div>
  );
};

export default ProgressIndicator;
