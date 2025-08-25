import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('App')  
@Controller()
export class AppController {
  @Get('/')
  @ApiOperation({ summary: '루트 응답' })
  @ApiOkResponse({ description: '서버 상태 OK' })
  root() {
    return { ok: true }
  }
}