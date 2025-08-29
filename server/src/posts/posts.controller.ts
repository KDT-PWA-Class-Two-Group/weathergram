// src/posts/posts.controller.ts
import {
  Controller, Get, Post as HttpPost, Param, Patch, Delete,
  Query, Body, ParseIntPipe, Req, UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string', maxLength: 1000 },
      },
    },
  })
  @ApiOperation({ summary: '게시글 생성' })
  create(@Body() dto: CreatePostDto, @Req() req: any) {
    return this.postsService.create(dto, { id: req.user.id });
  }

  @Get()
  @ApiOperation({ summary: '게시글 목록 조회' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.postsService.findAll(Number(page) || 1, Number(limit) || 10);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 상세 조회' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시글 수정' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto, @Req() req: any) {
    return this.postsService.update(id, dto, { id: req.user.id });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시글 삭제' })
  remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.postsService.remove(id, { id: req.user.id });
  }
}