import React from 'react';

export const BudgetAllocationChart: React.FC = () => {
  return (
    <div className="h-full w-full">
      <div className="h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400">Budget Allocation Chart</p>
          <p className="text-sm text-slate-500 mt-2">Budget allocation visualization will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetAllocationChart;
