import React from "react";
import ProgressIndicator from "../components/ProgressIndicator";

const steps = [
  { status: "created" },
  { status: "pendingApproval" },
  { status: "cancelled" },
  { status: "approved" },
  { status: "pending" },
  { status: "complete" }
];

const UserDetial_Aview = () => {
  const transfer = { status: "cancelled" }; 

  return (
    <div>
      <ProgressIndicator steps={steps} currentStatus={transfer.status} />
    </div>
  );
};

export default UserDetial_Aview;
