import React from "react";

export default function Sidebar({ role }: { role: "admin" | "vendor" }) {
  return <div> Hello, Sidebar, {role}</div>;
}
