import React from "react";
import Sidebar from "./components/Sidebar";

type Props = {
  children: React.ReactNode;
};
const AdminLayout = ({ children }: Props) => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div
        style={{
          padding: "15px",
          width: "100%",
          maxHeight: "100vh",
          overflowY: "scroll",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
