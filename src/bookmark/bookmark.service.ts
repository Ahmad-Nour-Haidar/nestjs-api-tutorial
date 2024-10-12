import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  findOne(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        user_id: userId,
      },
    });
  }

  async create(userId: number, dto: CreateBookmarkDto) {
    return this.prisma.bookmark.create({
      data: {
        user_id: userId,
        ...dto,
      },
    });
  }

  async update(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    // get the bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
        user_id: userId,
      },
    });

    // check if user owns the bookmark
    if (!bookmark) {
      throw new ForbiddenException('Access to resources denied');
    }

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(userId: number, bookmarkId: number) {
    // get the bookmark by id
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
        user_id: userId,
      },
    });

    // check if user owns the bookmark
    if (!bookmark) {
      throw new ForbiddenException('Access to resources denied');
    }

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
