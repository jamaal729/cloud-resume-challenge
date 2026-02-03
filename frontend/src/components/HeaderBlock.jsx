import React from "react";

export default function HeaderBlock({ data }) {
  const name = data?.name || data?.title || "JAMAAL AHMED";
  const contacts =
    data?.contacts || "Calgary, AB, CANADA • www.linkedin.com/in/jamaal-j-ahmed • github.com/jamaal729";

  return (
    <div className="header-block">
      {/* NAME */}
      <h1 className="name">{name}</h1>

      {/* CONTACTS */}
      <div className="contacts">{contacts}</div>
    </div>
  );
}
