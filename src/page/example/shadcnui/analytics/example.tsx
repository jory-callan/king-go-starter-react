import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AnalyticsExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Detailed analytics and insights</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Analytics dashboard showing key metrics and trends over time.</p>
        <div className="mt-4 p-4 bg-muted rounded-md">
          <p>📈 Revenue: $12,450 (+12.5%)</p>
          <p>👥 Users: 1,240 (+8.2%)</p>
          <p>💡 Conversion: 4.2% (+0.8%)</p>
        </div>
      </CardContent>
      <CardFooter>
        <p>Data refreshed: Just now</p>
      </CardFooter>
    </Card>
  );
}

// 可选导出描述信息
export const description = "Analytics and insights dashboard";
