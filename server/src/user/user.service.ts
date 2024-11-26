import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserDto } from 'src/user/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  save(user: UserDto): Promise<UserEntity> {
    return this.userRepository.save(user);
  }

  findByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findEmailOrUser(username: string, email: string) {
    return this.userRepository.find({ where: [{ username }, { email }] });
  }

  findById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }
}
