import React from "react";

export default function HeaderBlock({ data }) {
  const name = data?.name || data?.title || "JAMAAL AHMED";
  const contacts =
    data?.contacts || "+1-555-555-5555 • Calgary, AB • CANADA";

  return (
    <div className="header-block">
      {/* NAME */}
      <h1 className="name">{name}</h1>

      {/* CONTACTS */}
      <div className="contacts">{contacts}</div>
    </div>
  );
}
