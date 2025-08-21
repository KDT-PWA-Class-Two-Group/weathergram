import { Body, Controller, Post } from '@nestjs/common';
import { SaveService } from './save.service';
import { CreateSaveDto } from './dto/create-save.dto';

@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService) {}

  @Post()
  async create(@Body() dto: CreateSaveDto) {
    const result = await this.saveService.saveJson(dto);
    return { message: '저장 완료', ...result };
  }
}