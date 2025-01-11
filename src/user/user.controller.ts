import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // crear un usuario --> (client rol or helpdesk rol)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // devolver todos los usuarios --> (admin)
  @Get()
  findAll(@Req() req: any) {
    const userDecoded = req.userDecoded;
    return this.userService.findAllUsers(userDecoded);
  }

  // devolver cualquier usuario --> (admin)
  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    if (isNaN(+id)) {
      return new BadRequestException('Invalid id');
    }
    const userDecoded = req.userDecoded;
    return this.userService.findOneUser(+id, userDecoded);
  }

  // devolver cualquier usuario --> (uno mismo a partir del token)
  @Get('me')
  findMe(@Req() req: any) {
    const userDecoded = req.userDecoded;
    return this.userService.findOneUserMe(userDecoded);
  }

  // actualizar el mismo usuario --> (uno mismo a partir del token)
  @Patch()
  updateSameUser(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateSameUser(updateUserDto, req.userDecoded);
  }

  // eliminar un usuario --> (admin)
  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.userService.remove(+id, req.userDecoded);
  }

  // eliminar un usuario --> (uno mismo a partir del token)
  @Delete('me')
  removeMe(@Req() req: any) {
    return this.userService.removeMe(req.userDecoded);
  }

  // login
  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.userLogin(loginUserDto);
  }
}
