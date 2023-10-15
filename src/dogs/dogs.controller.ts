import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}
  @Get()
  getDogs(@Query('type') type: string) {
    return this.dogsService.getDogs(type);
  }
  @Get(':id')
  getSingleDog(@Param('id') id: string) {
    return this.dogsService.getDog(+id)

  }

  @Post()
  createDog(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.createDog(createDogDto);
  }

  @Put(':id')
  updateDog(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogsService.updateDog(+id, updateDogDto);
  }
  @Delete(':id')
  removeDog(@Param('id') id: string) {
    return this.dogsService.removeDog(+id);
  }
}
