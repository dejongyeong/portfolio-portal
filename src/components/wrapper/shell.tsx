import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const shellVariants = cva("grid items-center gap-8 pb-8 pt-6 md:py-8", {
  variants: {
    variant: {
      default: "container",
      sidebar: "",
      centered: "container flex h-dvh max-x-2xl flex-col justify-center",
      markdown: "container max-w-3xl py-8 md:py-10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface IShellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shellVariants> {
  as?: React.ElementType;
}

function Shell({
  className,
  as: Component = "section",
  variant,
  ...props
}: IShellProps) {
  return (
    <Component
      className={cn(shellVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Shell, shellVariants };
