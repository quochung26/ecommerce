import {
  Body,
  Param,
  Controller,
  Post,
  UnauthorizedException,
  Put,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto, UpdateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { UserResponse } from 'src/responses/userResponse';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private useService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginUserDto): Promise<UserResponse> {
    const user = await this.useService.findByUsername(body.username);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValid = await bcrypt.compare(body.password, user.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ user });

    return new UserResponse(
      user,
      'Your registration has been successful.',
      token,
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponse> {
    const foundUser = await this.useService.findById(id);

    if (!foundUser) {
      throw new UnauthorizedException('User not found');
    }

    const { yourPassword, ...updateBody } = body;

    const isValid = await bcrypt.compare(yourPassword, foundUser.password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    let password = foundUser.password;
    if (body.password) {
      password = await bcrypt.hash(body.password, 10);
    }

    const user = await this.useService.save({ ...updateBody, password });

    return new UserResponse(user);
  }
}
