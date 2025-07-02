"use client";

import React, { useEffect } from "react";
import { toast } from "sonner";

const ErrorBoundary = ({
  children,
  error,
}: React.PropsWithChildren & { error: Error | null }) => {
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return <>{children}</>;
};

export { ErrorBoundary };
