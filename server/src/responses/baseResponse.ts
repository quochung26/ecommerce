export class BaseResponse<D> {
  data: D | D[];
  message: string;

  constructor(data: D | D[], message?: string) {
    this.data = data;
    if (message) this.message = message;

    return this;
  }
}
