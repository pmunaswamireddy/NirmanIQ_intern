import React from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';

// Exercise 1: shadcn UI primitives demonstration
export function Exercise1ComponentShowcase() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Exercise 1: UI Primitives & Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Buttons */}
        <div>
          <h4 className="text-sm font-semibold text-slate-600 mb-2">Buttons:</h4>
          <div className="flex gap-2 flex-wrap">
            <Button variant="default">Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        {/* Badges */}
        <div>
          <h4 className="text-sm font-semibold text-slate-600 mb-2">Badges:</h4>
          <div className="flex gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Medium Risk</Badge>
            <Badge variant="destructive">Critical</Badge>
          </div>
        </div>

        {/* Input */}
        <div>
          <h4 className="text-sm font-semibold text-slate-600 mb-2">Input with Validation:</h4>
          <Input placeholder="Enter project name..." />
        </div>
      </CardContent>
    </Card>
  );
}
