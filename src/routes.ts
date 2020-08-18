import { Router } from 'express';
import BooksController from './controllers/BooksController';
const booksController = new BooksController();

const routes = Router();

routes.get('/literary', booksController.index);
routes.post('/literary', booksController.create);
routes.put('/literary/:id', booksController.put);
routes.delete('/literary/:id', booksController.delete);

export default routes;
