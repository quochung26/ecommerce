import {
  Body,
  Controller,
  Post,
  Req,
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { CreateCustomerDto, LoginCustomerDto } from 'src/customer/customer.dto';
import { CustomerService } from 'src/customer/customer.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CustomerResponse } from 'src/responses/customerResponse';
import { CustomerGuard } from 'src/customer/customer.guard';
import * as bcrypt from 'bcrypt';

@Controller('customer')
export class CustomerController {
  constructor(
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(CustomerGuard)
  @Get('current')
  async getCurrentCustomer(@Req() request: Request) {
    return new CustomerResponse(request['customer']);
  }

  @Post('register')
  async register(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerResponse> {
    const customerFound = await this.customerService.findOneByEmail(
      createCustomerDto.email,
    );

    if (customerFound) {
      throw new BadRequestException(
        'There is already an account with this email address',
      );
    }

    const password = await bcrypt.hash(createCustomerDto.password, 10);

    const customer = await this.customerService.create({
      ...createCustomerDto,
      password,
    });

    if (!customer) {
      throw new ForbiddenException("We can't save the customer.");
    }

    const token = this.jwtService.sign({ customer });

    return new CustomerResponse(
      customer,
      'Your registration has been successful.',
      token,
    );
  }

  @Post('login')
  async login(@Body() customerLoginDto: LoginCustomerDto) {
    const customer = await this.customerService.findOneByEmail(
      customerLoginDto.email,
    );

    if (!customer) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValid = await bcrypt.compare(
      customerLoginDto.password,
      customer.password,
    );

    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ customer });

    return new CustomerResponse(customer, 'Your login is successfull!', token);
  }
}
