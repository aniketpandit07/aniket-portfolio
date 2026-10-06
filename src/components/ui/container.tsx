import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-4 sm:px-8 lg:px-10",
        className,
      )}
      {...props}
    />
  );
}
