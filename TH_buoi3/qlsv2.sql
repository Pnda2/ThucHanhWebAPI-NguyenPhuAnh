use qlsv2;

-- Bảng SinhVien
CREATE TABLE SinhVien (
    MaSV VARCHAR(10) PRIMARY KEY,
    Ten_SV VARCHAR(100),
    Gioi_tinh VARCHAR(10),
    Dia_chi VARCHAR(255),
    Ngay_sinh DATE
);

-- Bảng MonHoc
CREATE TABLE MonHoc (
    MaMH VARCHAR(10) PRIMARY KEY,
    Ten_mon VARCHAR(100),
    Chuyen_nganh VARCHAR(100),
    So_hoc_trinh INT
);

-- Bảng GiaoVien
CREATE TABLE GiaoVien (
    MaGV VARCHAR(10) PRIMARY KEY,
    Ten_GV VARCHAR(100),
    Chuyen_nganh VARCHAR(100),
    Dia_chi VARCHAR(255),
    Dien_thoai VARCHAR(15)
);

-- Bảng BangDiem (Kết nối SinhVien và MonHoc)
CREATE TABLE BangDiem (
    MaSV VARCHAR(10),
    Ma_mon VARCHAR(10),
    Diem FLOAT,
    PRIMARY KEY (MaSV, Ma_mon), -- Khóa chính phức hợp
    FOREIGN KEY (MaSV) REFERENCES SinhVien(MaSV),
    FOREIGN KEY (Ma_mon) REFERENCES MonHoc(MaMH)
);

-- Bảng GV_DAY (Kết nối GiaoVien và MonHoc - Phân công giảng dạy)
CREATE TABLE GV_DAY (
    MaGV VARCHAR(10),
    MaMH VARCHAR(10),
    PRIMARY KEY (MaGV, MaMH),
    FOREIGN KEY (MaGV) REFERENCES GiaoVien(MaGV),
    FOREIGN KEY (MaMH) REFERENCES MonHoc(MaMH)
);

-- CHÈN DỮ LIỆU MẪU 
-- Dữ liệu SinhVien
INSERT INTO SinhVien (MaSV, Ten_SV, Gioi_tinh, Dia_chi, Ngay_sinh) VALUES
('SV01', 'Nguyễn Văn An', 'Nam', 'Hà Nội', '2003-05-10'),
('SV02', 'Trần Thị Bích', 'Nữ', 'Hải Phòng', '2003-08-20'),
('SV03', 'Lê Hoàng Nam', 'Nam', 'Nam Định', '2002-12-15'),
('SV04', 'Phạm Minh Tuấn', 'Nam', 'Thái Bình', '2003-02-28'),
('SV05', 'Hoàng Thị Mai', 'Nữ', 'Hà Nội', '2003-11-05');

-- Dữ liệu MonHoc
INSERT INTO MonHoc (MaMH, Ten_mon, Chuyen_nganh, So_hoc_trinh) VALUES
('MH01', 'Cơ sở dữ liệu', 'CNTT', 3),
('MH02', 'Lập trình Web', 'CNTT', 4),
('MH03', 'Toán cao cấp', 'Cơ bản', 3),
('MH04', 'Tiếng Anh CN', 'Ngoại ngữ', 2),
('MH05', 'Mạng máy tính', 'CNTT', 3);

-- Dữ liệu GiaoVien
INSERT INTO GiaoVien (MaGV, Ten_GV, Chuyen_nganh, Dia_chi, Dien_thoai) VALUES
('GV01', 'Phan Thanh Thảo', 'CNTT', 'Hà Nội', '0912345678'),
('GV02', 'Lê Văn Hùng', 'Toán', 'Hưng Yên', '0987654321'),
('GV03', 'Nguyễn Thị Lan', 'Ngoại ngữ', 'Hà Nội', '0905123456'),
('GV04', 'Trần Đức Minh', 'CNTT', 'Hải Dương', '0978111222'),
('GV05', 'Vũ Quang Huy', 'CNTT', 'Nam Định', '0966888999');

-- Dữ liệu BangDiem (Sinh viên nào học môn nào được mấy điểm)
INSERT INTO BangDiem (MaSV, Ma_mon, Diem) VALUES
('SV01', 'MH01', 8.5),
('SV01', 'MH02', 7.0),
('SV02', 'MH01', 9.0),
('SV03', 'MH03', 6.5),
('SV04', 'MH05', 5.0);

-- Dữ liệu GV_DAY (Giáo viên nào dạy môn nào)
INSERT INTO GV_DAY (MaGV, MaMH) VALUES
('GV01', 'MH01'), -- GV Thảo dạy CSDL
('GV01', 'MH02'), -- GV Thảo dạy cả Web
('GV02', 'MH03'), -- GV Hùng dạy Toán
('GV03', 'MH04'), -- GV Lan dạy Anh văn
('GV04', 'MH05'); -- GV Minh dạy Mạng

select * from SinhVien;
select * from MonHoc;
select * from GiaoVien;
select * from BangDiem;
select * from GV_DAY;