/* eslint-disable prettier/prettier */
import csvParse from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) { }


    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            // responsável por ler arquivo
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];

            // lendo linha por linha
            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile.on("data", async (line) => {
                // ["name", "description"]
                const [name, description] = line;
                categories.push({
                    name,
                    description,
                });
            })
                .on("end", () => {
                    fs.promises.unlink(file.path); // remover arquivo
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                })
        })
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description
                })
            }
        })
    }
}

export { ImportCategoryUseCase };
