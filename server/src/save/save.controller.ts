import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { SaveService } from './save.service';
import { CreateSaveDto } from './dto/create-save.dto';

@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post()
  async create(@Body() dto: CreateSaveDto) {
    try {
      console.log('[SaveController] incoming dto:', dto);
      const result = await this.saveService.saveJson(dto);
      console.log('[SaveController] saved:', result);
      return { message: '저장 완료', ...result };
    } catch (err: any) {
      const msg = err?.message ?? 'Unknown error';
      console.error('[SaveController] error:', msg);
      // 클라이언트가 어디에 쓰려다 실패했는지 확인할 수 있도록 에러를 그대로 노출
      throw new HttpException({ message: '저장 실패', detail: msg }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}