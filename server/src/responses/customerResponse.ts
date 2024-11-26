import { CustomerEntity } from 'src/entities/customer.entity';
import { BaseResponse } from './baseResponse';

export class CustomerResponse extends BaseResponse<CustomerEntity> {
  customer_token: string;

  constructor(data: CustomerEntity, message?: string, token?: string) {
    delete data.password;
    delete data.created_at;
    delete data.updated_at;

    super(data, message);

    if (token) this.customer_token = token;

    return this;
  }
}
