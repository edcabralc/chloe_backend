import { bookService } from "@/services/book.service";
import { RequestHandler } from "express";

const bookController: { [key: string]: RequestHandler } = {
  get: async (req, res) => {
    const books = await bookService.get();

    res.status(200).json(books);
  },

  getById: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return;
    }

    const book = await bookService.getbyId(id);

    res.status(200).json(book);
  },

  create: async (req, res) => {
    const { qtdPeople, checkIn, checkOut, total, roomId } = req.body;

    if (!checkIn || !checkOut) {
      return;
    }

    const book = await bookService.create({
      qtdPeople,
      checkIn,
      checkOut,
      total,
    });

    res.status(201).json(book);
  },

  update: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return;
    }

    const user = await bookService.update(id, req.body);

    res.status(200).json(user);
  },

  delete: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return;
    }

    await bookService.delete(id);

    res.status(300).json({ message: "Registro removido com sucesso" });
  },
};

export { bookController };
