import React from "react";

export default function AuthLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 p-4">
      {children}
    </div>
  );
}
