import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OverviewExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>This is the overview tab content</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Here you can see an overview of the system status and key metrics.</p>
      </CardContent>
      <CardFooter>
        <p>Last updated: Today</p>
      </CardFooter>
    </Card>
  );
}

// 可选导出描述信息
export const description = "An overview of the system";
