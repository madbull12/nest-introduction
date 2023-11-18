import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { BookmarkDto, UpdateBookmarkDto } from './dto/bookmark.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('bookmark')
export class BookmarkController {
    constructor(private bookmarkService:BookmarkService) {}


    @HttpCode(HttpStatus.OK)
    @Get()
    public async getBookmark(@GetUser() user:User) {
        return await this.bookmarkService.getYourBookmark(user.id)
    }

    @HttpCode(HttpStatus.OK)
    @Post()
    public async createBookmark(@GetUser() user:User,@Body() dto:BookmarkDto) {
        return await this.bookmarkService.createBookmark(user.id,dto)
    }

    @HttpCode(HttpStatus.OK)
    @Put(':id')
    public async updateBookmark(@GetUser() user,@Param('id') id:string,dto:UpdateBookmarkDto) {
        return await this.bookmarkService.updateBookmark(user.id,id,dto)
    }
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    public async deleteBookmark(@GetUser() user,@Param('id') id:string) {
        return await this.bookmarkService.deleteBookmark(id,user.id)
    }

}
