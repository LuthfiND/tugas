import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SkeletonEventCard = () => {
  return (
    <Card className="w-full max-w-sm rounded-md shadow-md p-0 overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300" />

      <CardContent className="p-4 space-y-4 mr-10">
        <div className="flex items-center justify-around gap-4">
          <div className="w-16 h-6 bg-gray-300 rounded" />

          <div className="flex-1 space-y-2">
            <div className="h-6 bg-gray-300 rounded w-32" />
            <div className="h-5 bg-gray-300 rounded w-24" />
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-300 rounded-full" />
              <div className="h-4 bg-gray-300 rounded w-28" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkeletonEventCard;
