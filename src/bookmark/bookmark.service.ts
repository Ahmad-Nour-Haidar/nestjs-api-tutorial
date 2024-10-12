import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        user_id: userId,
      },
    });

    return {
      status: true,
      message: 'Bookmarks fetched successfully',
      bookmarks,
    };
  }

  async findOne(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        user_id: userId,
      },
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    return {
      status: true,
      message: 'Bookmark fetched successfully',
      bookmark,
    };
  }

  async create(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        user_id: userId,
        ...dto,
      },
    });

    return {
      status: true,
      message: 'Bookmark created successfully',
      bookmark,
    };
  }

  async update(userId: number, bookmarkId: number, dto: EditBookmarkDto) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: {
        id: bookmarkId,
        user_id: userId,
      },
    });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }

    const updatedBookmark = await this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });

    return {
      status: true,
      message: 'Bookmark updated successfully',
      bookmark: updatedBookmark,
    };
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
