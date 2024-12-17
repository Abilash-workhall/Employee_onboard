import React from "react";
import ProgressIndicator from "../Components/ProgressIndicator";

const steps = [
  { status: "created" },
  { status: "pendingApproval" },
  { status: "cancelled" },
  { status: "approved" },
  { status: "pending" },
  { status: "complete" }
];

const UserDetial_Aview = () => {
  const transfer = { status: "pending" }; // Example status

  return (
    <div>
      <h1>Progress Bar Example</h1>
      <ProgressIndicator steps={steps} currentStatus={transfer.status} />
    </div>
  );
};

export default UserDetial_Aview;
