import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ReportsExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>Generated reports and summaries</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Comprehensive reports with detailed analysis and findings.</p>
        <ul className="mt-4 space-y-2">
          <li className="flex justify-between p-2 bg-muted rounded">
            <span>Sales Report</span>
            <span className="text-green-600">Completed</span>
          </li>
          <li className="flex justify-between p-2 bg-muted rounded">
            <span>User Activity</span>
            <span className="text-yellow-600">Processing</span>
          </li>
          <li className="flex justify-between p-2 bg-muted rounded">
            <span>Performance</span>
            <span className="text-red-600">Failed</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <p>Last report generated: Yesterday</p>
      </CardFooter>
    </Card>
  );
}

// 可选导出描述信息
export const description = "Generated reports and summaries";
