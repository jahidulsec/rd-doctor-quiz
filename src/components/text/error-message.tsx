import React from "react";

const ErrorMessage = ({message}: {message: string}) => {
  return <p className="text-xs text-destructive -mt-2">{message}</p>;
};

export { ErrorMessage };
