import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSidebarConfig } from "@/store/sidebar";

const Setting = () => {
  const { variant, collapsible, side, setVariant, setCollapsible, setSide } = useSidebarConfig();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Sidebar Configuration</CardTitle>
        <CardDescription>Customize the sidebar appearance and behavior</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="variant">Variant</Label>
          <Select value={variant} onValueChange={setVariant}>
            <SelectTrigger id="variant">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sidebar">Sidebar</SelectItem>
              <SelectItem value="floating">Floating</SelectItem>
              <SelectItem value="inset">Inset</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="collapsible">Collapsible</Label>
          <Select value={collapsible} onValueChange={setCollapsible}>
            <SelectTrigger id="collapsible">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="offcanvas">Offcanvas</SelectItem>
              <SelectItem value="icon">Icon</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="side">Side</Label>
          <Select value={side} onValueChange={setSide}>
            <SelectTrigger id="side">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Left</SelectItem>
              <SelectItem value="right">Right</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default Setting;
