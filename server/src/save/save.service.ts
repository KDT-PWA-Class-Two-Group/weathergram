import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class SaveService {
  // STORAGE_DIR 환경변수가 있으면 그 위치를 사용, 없으면 현재 실행 디렉토리 기준 storage
  private baseDir = path.resolve(process.env.STORAGE_DIR ?? path.join(process.cwd(), 'storage'));

  constructor() {
    // 실행 시 실제 저장 경로를 한 번 로깅
    // 예: [SaveService] baseDir: /Users/.../Weathergram/server/storage
    // 필요한 경우 주석 처리 가능
    console.log('[SaveService] baseDir:', this.baseDir);
  }

  private async ensureDir() {
    await fs.mkdir(this.baseDir, { recursive: true });
  }

  async saveJson(data: any) {
    await this.ensureDir();
    const filename = `data_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    const filePath = path.join(this.baseDir, filename);

    try {
      console.log('[SaveService] Writing file to:', filePath);
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
      return { file: filename, path: filePath };
    } catch (err: any) {
      // 에러 시, 절대 경로를 포함하여 어떤 경로에 쓰려다 실패했는지 노출
      throw new Error(`Failed to write JSON to: ${filePath}\n${err?.message ?? err}`);
    }
  }
}