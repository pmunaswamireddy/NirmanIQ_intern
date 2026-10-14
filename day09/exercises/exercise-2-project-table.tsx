'use client';

import React, { useState } from 'react';
import { ProjectItem } from '../lib/data';
import { Badge } from '../components/ui/badge';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';

interface ProjectTableProps {
  projects: ProjectItem[];
}

type SortField = 'name' | 'progress' | 'lastUpdated';

export function ProjectTable({ projects }: ProjectTableProps) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sorted = [...projects].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'name') comparison = a.name.localeCompare(b.name);
    if (sortField === 'progress') comparison = a.progress - b.progress;
    if (sortField === 'lastUpdated') comparison = a.lastUpdated.localeCompare(b.lastUpdated);
    return sortAsc ? comparison : -comparison;
  });

  const getRiskBadge = (risk: ProjectItem['riskLevel']) => {
    if (risk === 'low') return <Badge variant="success">Low</Badge>;
    if (risk === 'medium') return <Badge variant="warning">Medium</Badge>;
    return <Badge variant="destructive">High</Badge>;
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer select-none">
              Name {sortField === 'name' ? (sortAsc ? '▲' : '▼') : '↕'}
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead onClick={() => handleSort('progress')} className="cursor-pointer select-none">
              Progress {sortField === 'progress' ? (sortAsc ? '▲' : '▼') : '↕'}
            </TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead onClick={() => handleSort('lastUpdated')} className="cursor-pointer select-none">
              Last Updated {sortField === 'lastUpdated' ? (sortAsc ? '▲' : '▼') : '↕'}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((p) => (
            <TableRow key={p.id}>
              <TableCell className="font-medium text-slate-900">{p.name}</TableCell>
              <TableCell>
                <Badge variant={p.status === 'active' ? 'success' : 'default'}>
                  {p.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-600 h-full rounded-full"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{p.progress}%</span>
                </div>
              </TableCell>
              <TableCell>{getRiskBadge(p.riskLevel)}</TableCell>
              <TableCell className="text-slate-500 text-xs">{p.lastUpdated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
