import { Router } from "express";
import { userController } from "../controllers/user.controller.js";
import { HangHoaController } from "../controllers/hanghoa.controller.js";
import { GiaBanController } from "../controllers/giaban.controller.js";

const router = Router();

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

//hang hoa
router.get("/hanghoas/giabankd", HangHoaController.getByGiaBanKD);
router.get("/hanghoas/soluongcon/", HangHoaController.getBySLC);
router.get("/hanghoas/tim-kiem-gia", HangHoaController.getByKhoangGia); //ex: GET http://localhost:3000/api/hanghoas/tim-kiem-gia?min=5000&max=60000
router.get("/hanghoas/tenloai/:tenloai", HangHoaController.getByTenloai);
router.get("/hanghoas", HangHoaController.getAll);
router.get("/hanghoas/:id", HangHoaController.getByMaloai);
router.post("/hanghoas", HangHoaController.create);
router.put("/hanghoaos/:id", HangHoaController.update);
router.delete("/hanghas/:id", HangHoaController.delete);

//gia ban
router.get("/giabans", GiaBanController.getAll);
router.get("/giabans/:MaHang", GiaBanController.getByMaHang);
router.post("/giabans", GiaBanController.create);
router.put("/giabans/up/:magb", GiaBanController.update);
router.delete("/giabans/dl/:magb", GiaBanController.delete);

export default router;
