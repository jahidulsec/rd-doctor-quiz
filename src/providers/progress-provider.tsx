"use client";

import { ProgressProvider as AppProgressProvider } from "@bprogress/next/app";

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProgressProvider
      height="4px"
      color="#fffd00"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </AppProgressProvider>
  );
};

export default ProgressProvider;
