import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    // eslint-disable-next-line prettier/prettier
    constructor(private categoriesRepository: ICategoriesRepository) { }

    async execute({ description, name }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(
            name
        );

        if (categoryAlreadyExists) {
            throw new Error("Category name already exists!");
        }

        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
