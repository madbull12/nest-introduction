import { Injectable, NotFoundException } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkDto, UpdateBookmarkDto } from './dto/bookmark.dto';

@Injectable()
export class BookmarkService {
  constructor(private readonly prisma: PrismaService) {}

  public async getYourBookmark(userId: string): Promise<Bookmark[]> {
    const bookmarks = await this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });

    if (!bookmarks) {
      throw new NotFoundException(
        `Bookmarks not found for user with ID: ${userId}`,
      );
    }
    return bookmarks;
  }

  public async createBookmark(userId: string, dto: BookmarkDto) {
    return await this.prisma.bookmark.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        title: dto?.title,
        description: dto?.description,
        link: dto?.link,
      },
    });
  }

  public async updateBookmark(userId,bookId:string,dto:UpdateBookmarkDto) {
    return await this.prisma.bookmark.update({
        where:{
            id:bookId,
            userId
        },
        data:{
            title: dto?.title,
            description: dto?.description,
            link: dto?.link,
        }
    })
  }

  public async deleteBookmark(bookId,userId) {
    return await this.prisma.bookmark.delete({
        where:{
            id:bookId,
            userId
        },
   
    })
  }
}
