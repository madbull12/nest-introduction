import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
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
  getSingleDog(@Param('id',ParseIntPipe) id: number) {
    try {
      return this.dogsService.getDog(id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Post()
  createDog(@Body(new ValidationPipe()) createDogDto: CreateDogDto) {
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
