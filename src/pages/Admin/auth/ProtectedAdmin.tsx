import React from "react";

export default function ProtectedAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  let isAdmin = false;

  if (isAdmin) {
    return (
      <>
        {children}
      </>
    );
  }

  return <div>ProtectedAdmin</div>;
}
