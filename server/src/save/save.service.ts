import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class SaveService {
  private baseDir = path.resolve(process.cwd(), 'storage');

  private async ensureDir() {
    await fs.mkdir(this.baseDir, { recursive: true });
  }

  async saveJson(data: any) {
    await this.ensureDir();
    const filename = `data_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    const filePath = path.join(this.baseDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return { file: filename, path: filePath };
  }
}