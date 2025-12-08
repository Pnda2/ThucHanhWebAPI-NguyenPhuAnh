use qlsv1;

-- Tạo bảng SinhVien
CREATE TABLE SinhVien (
    MASV VARCHAR(20) PRIMARY KEY,
    HOTEN NVARCHAR(100)
);

-- Tạo bảng LopHoc
CREATE TABLE LopHoc (
    KYHIEU VARCHAR(20) PRIMARY KEY,
    TENMONHOC NVARCHAR(100),
    THOIGIAN NVARCHAR(100)
);

-- Tạo bảng GiaoVien
CREATE TABLE GiaoVien (
    MAGV VARCHAR(20) PRIMARY KEY,
    TENGV NVARCHAR(100)
);

-- Chèn dữ liệu mẫu

-- Bảng SinhVien
INSERT INTO SinhVien (MASV, HOTEN) VALUES 
('SV001', 'Nguyễn Văn An'),
('SV002', 'Trần Thị Bích'),
('SV003', 'Lê Hoàng Nam'),
('SV004', 'Phạm Minh Tuấn'),
('SV005', 'Hoàng Thị Mai');

-- Bảng LopHoc
INSERT INTO LopHoc (KYHIEU, TENMONHOC, THOIGIAN) VALUES 
('CSDL01', 'Cơ sở dữ liệu', 'Thứ 2, Tiết 1-3'),
('LTC02', 'Lập trình C#', 'Thứ 3, Tiết 4-6'),
('MMT03', 'Mạng máy tính', 'Thứ 4, Tiết 7-9'),
('TRR04', 'Toán rời rạc', 'Thứ 5, Tiết 1-3'),
('CTDL05', 'Cấu trúc dữ liệu', 'Thứ 6, Tiết 4-6');

-- Bảng GiaoVien
INSERT INTO GiaoVien (MAGV, TENGV) VALUES 
('GV001', 'Nguyễn Thanh Tùng'),
('GV002', 'Lê Thị Thu Thủy'),
('GV003', 'Trần Quang Huy'),
('GV004', 'Phạm Văn Hưng'),
('GV005', 'Vũ Thị Lan Anh');

select * from SinhVien;
select * from LopHoc;
select * from GiaoVien;