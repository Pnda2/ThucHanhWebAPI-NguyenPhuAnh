<<<<<<< HEAD
import {taikhoan} from '../model/taikhoan.js';
//lay toan bo tai khoan
export const getAllTaiKhoan = (req, res) => {
    res.status(200).json(taikhoan);
};

//lay tai khoan theo tk
export const getTaiKhoanByTk = (req, res) => {
    const Tk = req.params.tk;
    const account = taikhoan.find(tk => tk.tk === Tk);
    if (account) {
        res.status(200).json(account);
    } else {
        res.status(404).json({ 
          status: 404,
          message: `Tai khoan ${Tk} not found` });
    }
};

//lay tai khoan theo mota
export const getTaiKhoanByMoTa = (req, res) => {
    const MoTa = req.params.mota;
    const account = taikhoan.find(mt => mt.mota === MoTa);
    if (account) {
        res.status(200).json(account);
    } else {
        res.status(404).json({ 
          status: 404,
          message: `Tai khoan with MoTa ${MoTa} not found` });
    }
};


//kiem tra dang nhap
export const checkLogin = (req, res) => {
    const { tk, mk } = req.body;
    const account = taikhoan.find(acc => acc.tk === tk && acc.mk === mk);
    if (account) {
        res.status(200).json({ 
          status: 200,
          message: 'Login successful',
          account: account });
    } else {
        res.status(401).json({ 
          status: 401,
          message: 'Invalid credentials' });
    }
};

//them tai khoan moi
export const addTaiKhoan = (req, res) => {
    const { tk, mk, mota } = req.body;
    const existingAccount = taikhoan.find(acc => acc.tk === tk);
    if (existingAccount) {
        res.status(409).json({ 
          status: 409,
          message: `Tai khoan ${tk} already exists` });
    } else {
        const newAccount = { tk, mk, mota };
        taikhoan.push(newAccount);
        res.status(201).json({ 
          status: 201,
          message: 'Tai khoan created successfully',
          account: newAccount });
    }
};

//sua thong tin tai khoan
export const updateTaiKhoan = (req, res) => {
    const Tk = req.params.tk;
    const { mk, mota } = req.body;
    const account = taikhoan.find(acc => acc.tk === Tk);
    if (account) {
        account.mk = mk || account.mk;
        account.mota = mota || account.mota;
        res.status(200).json(taikhoan);
        // res.status(200).json({ 
        //   status: 200,
        //   message: 'Tai khoan updated successfully',
        //   account: account });
    } else {
        res.status(404).json({ 
          status: 404,
          message: `Tai khoan ${Tk} not found` });
    }
};

//xoa tai khoan
export const deleteTaiKhoan = (req, res) => {
    const Tk = req.params.tk;
    const index = taikhoan.findIndex(acc => acc.tk === Tk);
    if (index !== -1) {
        taikhoan.splice(index, 1);
        res.status(200).json({ 
          status: 200,
          message: 'Tai khoan deleted successfully' });
    } else {
        res.status(404).json({ 
          status: 404,
          message: `Tai khoan ${Tk} not found` });
    }
};

// Thêm tài khoản tại vị trí Index
// Yêu cầu: Index không hợp lệ OR trùng TK => null. Ngược lại thêm và trả về DS.
export const addTaiKhoanIndex = (req, res) => {
    const index = parseInt(req.params.index); // Lấy index từ URL params
    const { tk, mk, mota } = req.body;        // Lấy thông tin TK từ body

    // Kiểm tra điều kiện: index < 0, index > length, hoặc trùng TK
    const isDuplicate = taikhoan.some(acc => acc.tk === tk);
    
    if (index < 0 || index > taikhoan.length || isDuplicate) {
        // Vi phạm điều kiện => trả về null
        res.json(null);
    } else {
        // Hợp lệ => Chèn vào vị trí index
        const newAccount = { tk, mk, mota };
        // splice(vị trí, số lượng xóa, phần tử thêm vào)
        taikhoan.splice(index, 0, newAccount);
        // Trả về danh sách sau khi thêm
        res.status(200).json(taikhoan);
    }
};

// // Sửa thông tin tài khoản (trả về danh sách)
// // Yêu cầu: Nếu TK không có => null. Ngược lại sửa và trả về DS.
// export const updateTaiKhoanList = (req, res) => {
//     // Giả sử tham số tenTK được gửi trong body cùng với mk và mota
//     // (Hoặc bạn có thể lấy từ req.params.tk tùy cách gọi API)
//     const { tk, mk, mota } = req.body; 

//     const account = taikhoan.find(acc => acc.tk === tk);

//     if (!account) {
//         // Nếu không tìm thấy TK => trả về null
//         res.json(null);
//     } else {
//         // Cập nhật thông tin
//         // (Sử dụng toán tử || để giữ nguyên nếu giá trị mới rỗng)
//         if (mk) account.mk = mk;
//         if (mota) account.mota = mota;

//         // Trả về toàn bộ danh sách sau khi sửa
//         res.status(200).json(taikhoan);
//     }
// };
=======
// import { successResponse, errorResponse } from "../helpers/response.js";

// src/controllers/taikhoanController.js
import { accounts } from "../model/taikhoan.js";

// Lấy tất cả tai khoan
export const getAllAccounts = (req, res) => {
  res.status(200).json(accounts);
};

// Lấy tai khoan theo ten tai khoan
export const getAccountByTenTK = (req, res) => {
  const tentk = req.params.tentk;
  const account = accounts.find((u) => u.TenTK === tentk);

  if (!account) {
    res.status(404).json({
      status: 404,
      message: `Account by ${tentk} not found!`,
    });
  }

  res.status(200).json(account);
};

// Lấy thông tin các tài khoản chứa nội dung mô tả
// Kiểm tra tài khoản và mật khẩu có hợp lệ
// Thêm thông tin tài khoản
// Sửa thông tin tài khoản
// Thêm thông tin tài khoản với: tham số là 1 tài khoản vào cuối (kiểm tra khóa chính tên TK nếu có có r=> null, còn lại return DS sau khi thêm cuối)
// Thêm thông tin tài khoản với: tham số là 1 tài khoản tại index(index<0 or index> length or kiểm tra khóa chính tên TK nếu có có r=> null, còn lại return DS  sau khi thêm tại index)
// Sửa thông tin tài khoản với parameter là tenTK, TT mới MK và mo tả. Nếu TenTK ko có=> null, còn lại => DS TK sau khi sửa
// Xóa thông tin tài khoản
>>>>>>> d3860792b63d0e4f1f30e12ca36de934591a65e1
