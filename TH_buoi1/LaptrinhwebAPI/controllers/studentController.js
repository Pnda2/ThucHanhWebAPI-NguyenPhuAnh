import { studentRepo } from "../repositories/student.js";

//get tat ca sinh vien
export const getstudents = async (req, res) => {
    try {
        const students = await studentRepo.getstudents();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//get sinh vien theo dia chi
export const getstudentByDiaChi = async (req, res) => {
    const DiaChi = req.params.diachi;
    try {
        const students = await studentRepo.getstudentByDiaChi(DiaChi);
        if (students) {
            res.status(200).json(students);
        } else {
            res.status(404).json({
                status: 404,
                message: `Sinh vien with DiaChi ${DiaChi} not found`
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//get sinh vien theo ten sv
export const getstudentByTenSV = async (req, res) => {
    const TenSV = req.params.tensv;
    try {
        const students = await studentRepo.getstudentByTenSV(TenSV);
        if (students) {
            res.status(200).json(students);
        } else {
            res.status(404).json({
                status: 404,
                message: `Sinh vien with TenSV ${TenSV} not found`
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//get sinh vien tren 20 tuoi
export const getstudentsOver20 = async (req, res) => {
    try {
        const students = await studentRepo.getstudentsOver20();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};