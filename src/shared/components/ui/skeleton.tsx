import { cn } from "@shared/components/lib/utils";
import { forwardRef } from "react";

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("animate-pulse bg-slate-800 rounded-md", className)}
      {...props}
    />
  )
);
Skeleton.displayName = "Skeleton";

export { Skeleton };

// Card Skeleton
export const CardSkeleton = () => (
  <div className="space-y-4 p-6">
    <Skeleton className="h-6 w-1/2" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
  </div>
);

// Table Row Skeleton
export const TableRowSkeleton = ({ colCount = 4 }: { colCount?: number }) => (
  <tr className="animate-pulse">
    {Array.from({ length: colCount }).map((_, i) => (
      <td key={i} className="px-4 py-3">
        <Skeleton className="h-4 w-full" />
      </td>
    ))}
  </tr>
);

// Chart Skeleton
export const ChartSkeleton = ({ className = "h-64" }: { className?: string }) => (
  <div className={cn("w-full flex items-center justify-center bg-slate-900 rounded-md", className)}>
    <div className="text-center p-4">
      <Skeleton className="h-4 w-32 mx-auto mb-2" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-24 mx-auto mt-2" />
    </div>
  </div>
);

// Metric Card Skeleton
export const MetricCardSkeleton = () => (
  <div className="p-4 border border-slate-800 rounded-lg bg-slate-900">
    <Skeleton className="h-4 w-24 mb-2" />
    <Skeleton className="h-8 w-16 mb-3" />
    <div className="flex items-center">
      <Skeleton className="h-3 w-12 mr-2" />
      <Skeleton className="h-3 w-16" />
    </div>
  </div>
);
