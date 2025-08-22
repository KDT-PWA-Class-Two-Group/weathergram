import { Controller, Get, Post, HttpException, HttpStatus } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

@Controller('photos')
export class PhotosController {
  // 여기에 사진 관련 API 메서드를 추가할 수 있습니다.

  @Get()
  @ApiOperation({ summary: '사진 목록 조회', description: '저장된 모든 사진을 조회합니다.' })
  getAllPhotos() {
    // 실제 구현 전이므로 501을 응답
    throw new HttpException('사진 목록 조회', HttpStatus.NOT_IMPLEMENTED);
  }

  @Post()
  @ApiOperation({ summary: '사진 업로드', description: '새로운 사진을 업로드합니다.' })
  uploadPhoto() {
    // 실제 구현 전이므로 501을 응답
    throw new HttpException('사진 업로드', HttpStatus.NOT_IMPLEMENTED);
  }
}