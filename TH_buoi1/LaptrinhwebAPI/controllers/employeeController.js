import { employeeRepo } from "../repositories/nhanvien.js";

//get tat ca nhan vien
export const getemployee = async (req, res) => {
  try {
    const employee = await employeeRepo.getemployee();
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//get nhan vien theo sdt
export const getemployeeBySDT = async (req, res) => {
    const Sdt = req.params.sdt;
    try {
        const employee = await employeeRepo.getemployeeBySDT(Sdt);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({
                status: 404,
                message: `Nhan vien with SDT ${Sdt} not found`
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//get nhan vien theo ten va sdt
export const getemployeeByNameAndSDT = async (req, res) => {
    const Ten = req.params.ten;
    const Sdt = req.params.sdt;
    try {
        const employee = await employeeRepo.getemployeeByNameAndSDT(Ten, Sdt);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({
                status: 404,
                message: `Nhan vien with Ten ${Ten} and SDT ${Sdt} not found`
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//get nhan vien theo ten, gioi tinh va sdt
export const getemployeeByNameGenderAndSDT = async (req, res) => {
    const Ten = req.params.ten;
    const GioiTinh = req.params.gioitinh;
    const Sdt = req.params.sdt;
    try {
        const employee = await employeeRepo.getemployeeByNameGenderAndSDT(Ten, GioiTinh, Sdt);
        if (employee) {
            res.status(200).json(employee);
        } else {
            res.status(404).json({
                status: 404,
                message: `Nhan vien with Ten ${Ten}, GioiTinh ${GioiTinh} and SDT ${Sdt} not found`
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//post nhan vien moi
export const postemployee = async (req, res) => {
    const nhanvien = req.body;
    try {
        const newEmployee = await employeeRepo.postempoyee(nhanvien);
        res.status(201).json({
            status: 201,
            message: 'Nhan vien created successfully',
            employee: newEmployee
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
