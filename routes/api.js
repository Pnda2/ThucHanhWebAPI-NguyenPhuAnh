import express from "express";
import {getUserById, getAllUsers} from '../controllers/userController.js';
import {getAllTaiKhoan, getTaiKhoanByTk, getTaiKhoanByMoTa, checkLogin, addTaiKhoan,updateTaiKhoan,deleteTaiKhoan, addTaiKhoanIndex} from '../controllers/taikhoanController.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to API route 🚀" });
});

// Route: GET /api/users
router.get("/users", getAllUsers);

// Route: GET /api/users/:id
router.get("/users/:id", getUserById);

// Route: GET /api/taikhoan
router.get("/taikhoan", getAllTaiKhoan);
// Route: GET /api/taikhoan/tk/:tk
router.get("/taikhoan/:tk", getTaiKhoanByTk);
// Route: GET /api/taikhoan/mota/:mota
router.get("/taikhoan/:mota", getTaiKhoanByMoTa);
// Route: POST /api/taikhoan/login
router.post("/taikhoan/login", checkLogin);
// Route: POST /api/addtaikhoan
router.post("/addtaikhoan", addTaiKhoan);
// Route: POST /api/addtaikhoanindex
router.post("/addtaikhoanindex/:index", addTaiKhoanIndex);
// Router: POST /api/taikhoan/uppdate
router.post("/taikhoan/update", updateTaiKhoan);
//Router: DELETE /api/taikhoan/delete/:tk
router.delete("/taikhoan/delete/:tk", deleteTaiKhoan);



export default router;
