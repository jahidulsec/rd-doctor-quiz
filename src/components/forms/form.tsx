import { cn } from "@/lib/utils";
import React from "react";

const Form = ({ className, ...props }: React.ComponentProps<"form">) => {
  return <form className={cn("flex flex-col gap-6", className)} {...props} />;
};

const FormItem = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
};

export { Form, FormItem };
