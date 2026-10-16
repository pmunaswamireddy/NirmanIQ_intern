import { Controller, Get, Header } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  getIndex(): string {
    const htmlPath = path.join(process.cwd(), 'test.html');
    if (fs.existsSync(htmlPath)) {
      return fs.readFileSync(htmlPath, 'utf-8');
    }
    const fallbackPath = path.join(__dirname, '..', 'test.html');
    if (fs.existsSync(fallbackPath)) {
      return fs.readFileSync(fallbackPath, 'utf-8');
    }
    return `<h1>Day 11 API</h1><p>Visit <a href="/projects">/projects</a></p>`;
  }
}
