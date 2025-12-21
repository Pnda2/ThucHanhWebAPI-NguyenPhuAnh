use th_buoi5;

CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name NVARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(50)
);

select * from Users;

-- Tạo bảng SinhVien
CREATE TABLE SinhVien (
    MASV VARCHAR(20) PRIMARY KEY,
    HOTEN NVARCHAR(100) NOT NULL
);

-- Tạo bảng GiaoVien
CREATE TABLE GiaoVien (
    MAGV VARCHAR(20) PRIMARY KEY,
    TENGV NVARCHAR(100) NOT NULL
);

-- Tạo bảng LopHoc
CREATE TABLE LopHoc (
    KYHIEU VARCHAR(20) PRIMARY KEY,
    TENMONHOC NVARCHAR(100) NOT NULL,
    THOIGIAN VARCHAR(100) -- Lưu dạng chuỗi mô tả (VD: Thứ 2, Tiết 1-3)
);

-- THÊM DỮ LIỆU MẪU
INSERT INTO SinhVien (MASV, HOTEN) VALUES
('SV001', 'Nguyễn Văn An'),
('SV002', 'Trần Thị Bích'),
('SV003', 'Lê Hoàng Nam'),
('SV004', 'Phạm Minh Tuấn'),
('SV005', 'Hoàng Thùy Linh'),
('SV006', 'Vũ Đức Đam'),
('SV007', 'Đặng Thu Thảo');

INSERT INTO GiaoVien (MAGV, TENGV) VALUES
('GV01', 'TS. Nguyễn Thanh Tùng'),
('GV02', 'ThS. Lê Thị Mai'),
('GV03', 'PGS.TS Trần Văn Hùng'),
('GV04', 'ThS. Phạm Thu Hà'),
('GV05', 'TS. Đỗ Xuân Cường');

INSERT INTO LopHoc (KYHIEU, TENMONHOC, THOIGIAN) VALUES
('L01', 'Lập trình C++', 'Thứ 2 (7:00 - 9:00)'),
('L02', 'Cơ sở dữ liệu', 'Thứ 3 (9:00 - 11:00)'),
('L03', 'Mạng máy tính', 'Thứ 4 (13:00 - 15:00)'),
('L04', 'Tiếng Anh chuyên ngành', 'Thứ 5 (7:00 - 9:00)'),
('L05', 'Toán rời rạc', 'Thứ 6 (15:00 - 17:00)'),
('L06', 'Phát triển Web', 'Thứ 7 (9:00 - 11:00)');

select * from SinhVien;
select * from GiaoVien;
select * from LopHoc;