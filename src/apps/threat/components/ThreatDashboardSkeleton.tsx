import { Card, CardContent, CardHeader, CardTitle } from "@shared/components/card";
import { Skeleton, ChartSkeleton, MetricCardSkeleton } from "@shared/components/ui/skeleton";

export const ThreatDashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Metrics Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Threat Map Skeleton */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartSkeleton className="h-96" />
          </CardContent>
        </Card>

        {/* Threat Timeline Skeleton */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">
              <Skeleton className="h-6 w-48" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartSkeleton className="h-96" />
          </CardContent>
        </Card>
      </div>

      {/* Threat List Skeleton */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-slate-800">
              <div className="col-span-3">
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="col-span-3">
                <Skeleton className="h-4 w-16 ml-auto" />
              </div>
            </div>

            {/* Table Rows */}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 items-center p-4 border-b border-slate-800">
                <div className="col-span-3">
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="col-span-2">
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="col-span-3 flex justify-end">
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatDashboardSkeleton;
