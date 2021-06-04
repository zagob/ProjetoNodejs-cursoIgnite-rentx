import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
    // eslint-disable-next-line prettier/prettier
    constructor(private importCategoryUseCase: ImportCategoryUseCase) { }
    handle(request: Request, response: Response): Response {
        const { file } = request;
        this.importCategoryUseCase.execute(file);
        console.log(file);
        return response.send();
    }
}

export { ImportCategoryController };
