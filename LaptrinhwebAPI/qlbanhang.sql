-- bai 1 CSDL QLBanHang
use qlbanhang;

CREATE TABLE LoaiHang (
    MaLoai INT PRIMARY KEY,
    TenLoai VARCHAR(50),
    MoTa VARCHAR(100)
);

-- Bảng HangHoa
CREATE TABLE HangHoa (
    MaHang INT PRIMARY KEY,
    MaLoai INT,
    TenHang VARCHAR(100),
    SoLuong INT,
    SoLuongCon INT,
    FOREIGN KEY (MaLoai) REFERENCES LoaiHang(MaLoai)
);

-- Bảng GiaBan
CREATE TABLE GiaBan (
    MaGB INT PRIMARY KEY,
    MaHang INT,
    Gia DECIMAL(12,2),
    DVTinh VARCHAR(20),
    NgayBD DATE,
    NgayKT DATE,
    FOREIGN KEY (MaHang) REFERENCES HangHoa(MaHang)
);

INSERT INTO LoaiHang VALUES
(1, 'Đồ uống', 'Các loại nước giải khát'),
(2, 'Bánh kẹo', 'Bánh snack, kẹo ngọt'),
(3, 'Gia vị', 'Các loại gia vị nấu ăn'),
(4, 'Mỹ phẩm', 'Sản phẩm chăm sóc cá nhân'),
(5, 'Dụng cụ học tập', 'Dụng cụ dùng trong học tập');

INSERT INTO HangHoa VALUES
(101, 1, 'Coca Cola lon', 200, 150),
(102, 2, 'Snack khoai tây', 120, 100),
(103, 3, 'Nước mắm 500ml', 80, 60),
(104, 4, 'Sữa rửa mặt', 60, 40),
(105, 5, 'Bút bi Thiên Long', 500, 480);

INSERT INTO GiaBan VALUES
(1, 101, 10000, 'Lon', '2025-01-01', '2025-12-31'),
(2, 102, 15000, 'Gói', '2025-01-01', '2025-06-30'),
(3, 103, 30000, 'Chai', '2025-02-01', '2025-12-31'),
(4, 104, 55000, 'Tuýp', '2025-03-01', '2025-12-31'),
(5, 105, 5000, 'Cây', '2025-01-15', '2025-12-30');


INSERT INTO HangHoa (MaHang, MaLoai, TenHang, SoLuong, SoLuongCon) VALUES
(106, 1, 'Pepsi lon', 50, 3),
(107, 2, 'Bánh Oreo', 40, 1);

INSERT INTO GiaBan (MaGB, MaHang, Gia, DVTinh, NgayBD, NgayKT) VALUES
-- Giá của Pepsi: Chỉ áp dụng từ tháng 1 đến tháng 6 năm 2025 (Đã qua)
(6, 106, 10000, 'Lon', '2025-01-01', '2025-06-01'),
-- Giá của Oreo: Chỉ áp dụng trong năm 2024 (Đã qua từ lâu)
(7, 107, 15000, 'Gói', '2024-01-01', '2024-12-31');

INSERT INTO HangHoa (MaHang, MaLoai, TenHang, SoLuong, SoLuongCon) 
VALUES (109, 1, 'Trà xanh C2', 100, 95);

SELECT h.*, g.Gia 
FROM HangHoa h
JOIN GiaBan g ON h.MaHang = g.MaHang 
    AND CURDATE() BETWEEN g.NgayBD AND g.NgayKT;

select * from loaihang;
select * from HangHoa;
select * from GiaBan;