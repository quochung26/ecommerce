import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { CreateCustomerDto } from 'src/customer/customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  create(customerDto: CreateCustomerDto): Promise<CustomerEntity> {
    return this.customerRepository.save(customerDto);
  }

  findOneByEmail(email: string): Promise<CustomerEntity> {
    return this.customerRepository.findOne({ where: { email } });
  }
}
