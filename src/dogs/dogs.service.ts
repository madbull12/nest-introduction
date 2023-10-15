import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Injectable()
export class DogsService {
  private dogs = [
    {
      id: 0,
      name: 'june',
      type: 'shiba',
    },
    {
      id: 1,
      name: 'Leo',
      type: 'Chihuahua',
    },
  ];

  getDogs(type?: string) {
    if (type) return this.dogs.filter((dog) => dog.type === type);
    return this.dogs;
  }

  getDog(id: number) {
    const dog = this.dogs.find((dog) => dog.id === id);
    if (!dog) {
      throw new Error('Dog not found');
    }
    return dog;
  }
  createDog(createDogDto: CreateDogDto) {
    const newDog = {
      id: Date.now(),

      ...createDogDto,
    };
    this.dogs.push(newDog);
    return newDog;
  }
  updateDog(id:number,dto:UpdateDogDto) {
    this.dogs = this.dogs.map((dog)=>{
        if(id===dog.id) {
            return {
                ...dog,
                ...dto
            }
        }

        return dog;
    });

    return this.getDog(id);
    
  }
  removeDog(id:number) {
    const dog = this.dogs.find((dog) => dog.id === id);
    
    if(!dog) {
        throw new Error("Dog not found")
    }
    this.dogs = this.dogs.filter((dog)=>dog.id !== id);
    return this.getDog(id)    
  }
}
