import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepo: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto) {
    const post = this.postsRepo.create({
      content: dto.content ?? null,
    });
    return this.postsRepo.save(post);
  }

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.postsRepo.findAndCount({
      order: { id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { items, total, page, limit };
  }

  async findOne(id: number) {
    const post = await this.postsRepo.findOne({ where: { id } as FindOptionsWhere<Post> });
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.findOne(id);
    post.content = dto.content ?? post.content;
    return this.postsRepo.save(post);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    await this.postsRepo.remove(post);
    return { id };
  }
}