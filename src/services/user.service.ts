import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/entities/user/dto/create-user.dto';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { UserExistsException } from 'src/exceptions/user/user-exists.exception';
import { UserNotFoundException } from 'src/exceptions/user/user-not-found.exception';
import { UserException } from 'src/exceptions/user/user.exception';
import { yourPowersByYourRole } from 'src/utils/yourPowersByYourRole';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async usernameAlreadyExists(username: string) {
    const userByUsername = await this.userRepository.findBy({ username });

    const usernameAlreadyExists = userByUsername[0]?.username === username;

    if (usernameAlreadyExists) {
      return true;
    }

    return false;
  }

  async create(createUserDto: CreateUserDto) {
    const userNameExists = await this.usernameAlreadyExists(
      createUserDto.username,
    );

    const saltRounds = 10;

    const errorMessage = `${createUserDto.username} already exists!`;

    if (userNameExists) {
      throw new UserExistsException(errorMessage);
    }

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, saltRounds),
    };

    const userCreated = await this.userRepository.save(data);

    return {
      ...userCreated,
      password: undefined,
    };
  }

  async findByUsernameAuth(username: string) {
    try {
      const user = await this.userRepository.findOneBy({ username });

      console.log(user.roles);
      if (!user) throw new UserNotFoundException();

      return user;
    } catch (err) {
      throw new UserException(err.message);
    }
  }

  async findByUsername(username: string) {
    try {
      const user = await this.userRepository.findOneBy({ username });

      if (!user) throw new UserNotFoundException();

      const userEdited = {
        ...user,
        yourPowers: yourPowersByYourRole(user.roles),
        password: undefined,
      };

      return userEdited;
    } catch (err) {
      throw new UserException(err.message);
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) throw new UserNotFoundException();

      const userEdited = {
        ...user,
        yourPowers: yourPowersByYourRole(user.roles),
        pássword: undefined,
      };

      return userEdited;
    } catch (err) {
      throw new UserException(err.message);
    }
  }
}
