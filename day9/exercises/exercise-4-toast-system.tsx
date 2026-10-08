'use client';

import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { toast } from 'sonner';

// Exercise 4: Sonner Toast Notification System
export function ToastDemoSection() {
  const triggerSuccess = () => {
    toast.success('Project created successfully!');
  };

  const triggerError = () => {
    toast.error('Failed to save project');
  };

  const triggerInfo = () => {
    toast.info('Crane telemetry synchronized');
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Exercise 4: Sonner Toast Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-slate-500 mb-3">
          Test the notification triggers used in NirmanIQ site operations:
        </p>
        <div className="flex gap-2 flex-wrap">
          <Button variant="default" onClick={triggerSuccess}>
            Trigger Success Toast
          </Button>
          <Button variant="destructive" onClick={triggerError}>
            Trigger Error Toast
          </Button>
          <Button variant="outline" onClick={triggerInfo}>
            Trigger Info Toast
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
