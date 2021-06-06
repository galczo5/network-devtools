import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import {DTO} from "./dto";

@Injectable()
export class AppService {
  getData(): DTO {
    const name = faker.name.firstName();
    const surname = faker.name.lastName();
    return new DTO(
        name,
        surname,
        faker.internet.email(name, surname),
        faker.address.streetAddress(true)
    );
  }
}
