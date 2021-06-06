import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {DTO} from "./dto";
import {Observable, range} from "rxjs";
import {bufferCount, delay, map} from "rxjs/operators";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get('/data')
    data(): Observable<Array<DTO>> {
        const count = 10;

        return range(0, count)
            .pipe(
                map(() => this.appService.getData()),
                bufferCount(count),
                delay(count * 20)
            );
    }

    @Get('/content')
    content() {
        const count = 100000;

        return range(0, count)
            .pipe(
                map(() => this.appService.getData()),
                bufferCount(count)
            );
    }

    @Get('/application/name')
    name() {
        return {
            name: 'Backend <3 Dev Tools'
        };
    }

    @Get('/application/version')
    version() {
        return {
            version: '1.0',
            codename: 'Very Fast Panda'
        }
    }
}
