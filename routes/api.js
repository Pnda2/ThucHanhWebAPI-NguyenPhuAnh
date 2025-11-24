// import express from "express";
// import {getUserById, getAllUsers} from '../controllers/userController.js';
// import {getAllTaiKhoan, getTaiKhoanByTk, getTaiKhoanByMoTa, checkLogin, addTaiKhoan,updateTaiKhoan,deleteTaiKhoan, addTaiKhoanIndex} from '../controllers/taikhoanController.js';

// const router = express.Router();

// router.get("/", (req, res) => {
//   res.json({ message: "Welcome to API route" });
// });

// // Route: GET /api/users
// router.get("/users", getAllUsers);

// // Route: GET /api/users/:id
// router.get("/users/:id", getUserById);

// // Route: GET /api/taikhoan
// router.get("/taikhoan", getAllTaiKhoan);
// // Route: GET /api/taikhoan/tk/:tk
// router.get("/taikhoan/:tk", getTaiKhoanByTk);
// // Route: GET /api/taikhoan/mota/:mota
// router.get("/taikhoan/:mota", getTaiKhoanByMoTa);
// // Route: POST /api/taikhoan/login
// router.post("/taikhoan/login", checkLogin);
// // Route: POST /api/addtaikhoan
// router.post("/addtaikhoan", addTaiKhoan);
// // Route: POST /api/addtaikhoanindex
// router.post("/addtaikhoanindex/:index", addTaiKhoanIndex);
// // Router: POST /api/taikhoan/uppdate
// router.post("/taikhoan/update", updateTaiKhoan);
// //Router: DELETE /api/taikhoan/delete/:tk
// router.delete("/taikhoan/delete/:tk", deleteTaiKhoan);

// export default router;
import express from "express";
import { getUsers } from "../controllers/userController.js";
import {
  getemployee,
  getemployeeBySDT,
  getemployeeByNameAndSDT,
  getemployeeByNameGenderAndSDT,
  postemployee,
} from "../controllers/employeeController.js";
import {
  getbooks,
  getbookByTensach,
  getbookByTacgia,
  getbookByNhaXB,
  getNewBooks,
} from "../controllers/bookController.js";
import {
  getstudents,
  getstudentByDiaChi,
  getstudentByTenSV,
  getstudentsOver20,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to API route" });
});

// -----------------------users---------------------------
// Route: GET /api/users
router.get("/users/", getUsers);
// Route: GET /api/users/:id

//-----------------------employee---------------------------
// Route: GET /api/employee
router.get("/employee/", getemployee);
// Route: GET /api/employee/sdt/:sdt
router.get("/employee/sdt/:sdt", getemployeeBySDT);
// Route: GET /api/employee/name/:ten/sdt/:sdt
router.get("/employee/name/:ten/sdt/:sdt", getemployeeByNameAndSDT);
// Route: GET /api/employee/name/:ten/gioitinh/:gioitinh/sdt/:sdt
router.get(
  "/employee/name/:ten/gioitinh/:gioitinh/sdt/:sdt",
  getemployeeByNameGenderAndSDT
);
// Route: POST /api/employee
router.post("/employee/", postemployee);

//-----------------------book---------------------------
// Route: GET /api/books
router.get("/books/", getbooks);
// Route: GET /api/books/tensach/:tsach
router.get("/books/tensach/:tsach", getbookByTensach);
// Route: GET /api/books/tacgia/:tgia
router.get("/books/tacgia/:tgia", getbookByTacgia);
// Route: GET /api/books/nhaxb/:nhaxb
router.get("/books/nhaxb/:nhaxb", getbookByNhaXB);
// Route: GET /api/books/new
router.get("/books/new", getNewBooks);

//-----------------------student---------------------------
// Route: GET /api/students
router.get("/students/", getstudents);
// Route: GET /api/students/diachi/:diachi
router.get("/students/diachi/:diachi", getstudentByDiaChi);
// Route: GET /api/students/tensv/:tensv
router.get("/students/tensv/:tensv", getstudentByTenSV);
// Route: GET /api/students/over20
router.get("/students/over20", getstudentsOver20);

export default router;
