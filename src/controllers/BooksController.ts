import { Request, Response } from 'express';
import db from '../database/connection';

interface BookItems {
  title: string;
  publishing: string;
  picture: string;
  authors: Array<string>;
}

class BooksController {
  async create(request: Request, response: Response) {
    const { title, publishing, picture, authors } = request.body as BookItems;

    const authorsString = authors.reduce((author, next) => `${author},${next}`);

    const id = await db('books').insert({
      title,
      picture,
      publishing,
      authors: authorsString,
    });

    const book = await db('books').select('books.*').where('books.id', '=', id);

    return response.status(201).json(book);
  }

  async index(request: Request, response: Response) {
    const book = await db('books').select('books.*');

    return response.json(book);
  }

  async put(request: Request, response: Response) {
    const { title, publishing, picture, authors } = request.body as BookItems;

    const { id } = request.params;

    const authorsString = authors.reduce((author, next) => `${author},${next}`);

    console.log(title, publishing, picture, authorsString);

    await db('books').where('books.id', '=', id).update({
      title,
      picture,
      publishing,
      authors: authorsString,
    });

    const book = await db('books').select('books.*').where('books.id', '=', id);

    return response.json(book);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    await db('books').where('books.id', '=', id).del();

    return response.json({ message: 'The book has been deleted' });
  }
}

export default BooksController;
