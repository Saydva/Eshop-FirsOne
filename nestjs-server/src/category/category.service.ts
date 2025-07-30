import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './schema/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const createdCategory = new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }
  async findAll() {
    return this.categoryModel.find().exec();
  }
  async findOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }
  async update(id: string, updateCategoryDto: CreateCategoryDto) {
    return this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
  }
  async remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
