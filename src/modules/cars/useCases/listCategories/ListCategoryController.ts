/* eslint-disable prettier/prettier */
import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoryController {
    constructor(private listCategoriesUseCase: ListCategoriesUseCase) { }
    handle(request: Request, response: Response): Response {
        const all = this.listCategoriesUseCase.execute();

        return response.json(all);
    }
}

export { ListCategoryController };
