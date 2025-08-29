import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepo: Repository<Post>,
  ) {}

  // req.user에서 받은 로그인 사용자로 저장
  async create(dto: CreatePostDto, user: { id: number }) {
    const post = this.postsRepo.create({
      content: dto.content ?? null,
      // 관계에 사용자 연결 (user_id 컬럼 채워짐)
      user: { id: user.id } as any,
    });
    return this.postsRepo.save(post);
  }

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.postsRepo.findAndCount({
      order: { id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user'], // 필요 시 작성자 정보까지
    });
    return { items, total, page, limit };
  }

  async findOne(id: number) {
    const post = await this.postsRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  // 작성자만 수정 가능하게 예시
  async update(id: number, dto: UpdatePostDto, user?: { id: number }) {
    const post = await this.postsRepo.findOne({ where: { id }, relations: ['user'] });
    if (!post) throw new NotFoundException('Post not found');

    if (user && post.user?.id !== user.id) {
      throw new ForbiddenException('No permission to edit this post');
    }

    post.content = dto.content ?? post.content ?? null;
    return this.postsRepo.save(post); // updatedAt은 DB가 자동 갱신
  }

  async remove(id: number, user?: { id: number }) {
    const post = await this.postsRepo.findOne({ where: { id }, relations: ['user'] });
    if (!post) throw new NotFoundException('Post not found');

    if (user && post.user?.id !== user.id) {
      throw new ForbiddenException('No permission to delete this post');
    }

    await this.postsRepo.delete(id);
    return { success: true };
  }
}