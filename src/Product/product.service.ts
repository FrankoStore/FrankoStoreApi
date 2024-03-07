import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { ProductCategory } from "./entities/product-category";
import { FileService } from "src/File/file.service";
import { CreateProductInput } from "./inputs/create-product.input";
import { File } from "src/File/entities/file.entity";
import { FindOptionsProductInput } from "./inputs/find-options-product.input";
import { UpdateProductInput } from "./inputs/update-product.input";


@Injectable()
export class ProductService{
    constructor(
        @InjectRepository(Product)
        private readonly productRepository:Repository<Product>,
        @InjectRepository(ProductCategory)
        private readonly productCategoryRepository:Repository<ProductCategory>,
        private readonly fileService:FileService
    ){}

    async getProducts(findOptions:FindOptionsProductInput){
        return this.productRepository.find({where:findOptions, relations:{images:true, categories:true}})
    }

    async createProduct(product:CreateProductInput){

        const categories: ProductCategory[] = [];

        for(let i = 0; i < product.categories.length; i++){
            const category = await this.productCategoryRepository.findOne({where:{name:product.categories[i].name}})
            if(category){
                categories.push(category);
                continue;
            }

            categories.push(await this.productCategoryRepository.save(product.categories[i]))
        }

        const images: File[] = [];

        for(let i = 0; i < product.images.length; i++){
            images.push(await this.fileService.saveFile(product.images[i], "products"))
        }

        const newProduct = new Product({
            name:product.name,
            categories: categories,
            height:product.height,
            width:product.width,
            length:product.length,
            size:product.size,
            retailPrice: product.retailPrice,
            description: product.description,
            images: images
        });

        return this.productRepository.save(newProduct);
    }


    async updateProduct(id: number, product: UpdateProductInput){
        const newProduct = await this.productRepository.findOne({where:{id: id}});
        newProduct.name = product.name || newProduct.name;
        newProduct.description = product.description || newProduct.description;
        newProduct.retailPrice = product.retailPrice || newProduct.retailPrice;
        newProduct.amount = product.amount || newProduct.amount;
        newProduct.height = product.height || newProduct.height;
        newProduct.length = product.length || newProduct.length;
        newProduct.width = product.width || newProduct.width;
        newProduct.size = product.size || newProduct.size;

        const categories: ProductCategory[] = [];
        for(let i = 0; i < product.categories.length; i++){
            const category = await this.productCategoryRepository.findOne({where:{name:product.categories[i].name}})
            if(category){
                categories.push(category);
                continue;
            }

            categories.push(await this.productCategoryRepository.save(product.categories[i]))
        }

        newProduct.categories = categories;

        const images: File[] = [];

        for(let i = 0; i < product.images.length; i++){
            images.push(await this.fileService.saveFile(product.images[i], "products"))
        }

        for(let i = 0; i < newProduct.images.length; i++){
            await this.fileService.removeFileRecord(newProduct.images[i].id);
        }

        newProduct.images = images;

        return this.productRepository.save(newProduct);
    }
}