import { bookRepo } from "../repositories/book.js";

//get tat ca sach
export const getbooks = async (req, res) => {
  try {
    const books = await bookRepo.getbooks();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get sach chua ten sach
export const getbookByTensach = async (req, res) => {
    const Tsach = req.params.tsach;
    try {
        const books = await bookRepo.getbookByTensach(Tsach);
        if (books) {
            res.status(200).json(books);
        } else {
            res.status(404).json({
                status: 404,
                message: `Sach with TenSach ${Tsach} not found`
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//get sach theo ten tac gia
export const getbookByTacgia = async (req, res) => {
    const Tgia = req.params.tgia;
    try {
        const books = await bookRepo.getbookByTacgia(Tgia);
        if (books) {
            res.status(200).json(books);
        } else {
            res.status(404).json({
                status: 404,
                message: `Sach with TacGia ${Tgia} not found`
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//get sach theo ten NXB
export const getbookByNhaXB = async (req, res) => {
    const Nhaxb = req.params.nhaxb;
    try {
        const books = await bookRepo.getbookByNhaXB(Nhaxb);
        if (books) {
            res.status(200).json(books);
        } else {
            res.status(404).json({
                status: 404,
                message: `Sach with NhaXB ${Nhaxb} not found`
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//get cac cuon sach moi (5 nam tinh tu hien tai)
export const getNewBooks = async (req, res) => {
    try {
        const books = await bookRepo.getNewBooks();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};