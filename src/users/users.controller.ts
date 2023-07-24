import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UppercaseInterceptor } from '../interceptors/uppercase.interceptor';
import { PreprocessEmailInterceptor } from '../interceptors/preprocess-email.interceptor';
import { AgeValidationPipe } from '../pipes/age-validation.pipe';
import { ResponseMetaInterceptor } from '../interceptors/response-meta.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('getUsers')
  getUsers() {
    return { name: 'John Doe', age: 30 };
  }

  @Post('postUsers')
  @UsePipes(AgeValidationPipe)
  @UseInterceptors(
    ResponseMetaInterceptor,
    PreprocessEmailInterceptor,
    UppercaseInterceptor,
  )
  postUsers(@Body() data: CreateUserDto) {
    return data;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
