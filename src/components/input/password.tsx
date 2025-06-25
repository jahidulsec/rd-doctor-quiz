"use client";

import React from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ ...props }: React.ComponentProps<"input">) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="relative">
      <Input type={show ? "text" : "password"} {...props} />
      <div
        className="absolute top-[50%] -translate-y-[50%] right-3 [&_svg]:size-4 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        {show ? <EyeOff /> : <Eye />}
      </div>
    </div>
  );
};

export { PasswordInput };
