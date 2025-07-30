import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from './../auth/guard/jwt.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const product = await this.productService.create(createProductDto);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      if (error.name === 'ValidationError') {
        // Mongoose validation error
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productService.findOne(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      if (error.name === 'CastError') {
        // Mongoose cast error for invalid ObjectId
        throw new BadRequestException('Invalid product ID');
      }
      throw error;
    }
  }

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const updatedProduct = await this.productService.update(
        id,
        updateProductDto,
      );

      if (!updatedProduct) {
        throw new NotFoundException('Product not found');
      }
      return updatedProduct;
    } catch (error) {
      if (error.name === 'CastError') {
        // Mongoose cast error for invalid ObjectId
        throw new BadRequestException('Invalid product ID');
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const deletedProduct = await this.productService.remove(id);
      if (!deletedProduct) {
        throw new NotFoundException('Product not found');
      }
      return deletedProduct;
    } catch (error) {
      if (error.name === 'CastError') {
        // Mongoose cast error for invalid ObjectId
        throw new BadRequestException('Invalid product ID');
      }
      throw error;
    }
  }
}
