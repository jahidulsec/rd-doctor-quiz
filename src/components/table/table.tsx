import { cn } from "@/lib/utils";

const TableWrapper = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div className={cn("border rounded-md", className)} {...props} />
  );
};

export { TableWrapper };
