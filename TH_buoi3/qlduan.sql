use qlduan;

-- Bảng DONVI (Đơn vị / Phòng ban)
CREATE TABLE DONVI (
    MasoDV VARCHAR(10) PRIMARY KEY,
    TenDV VARCHAR(100),
    MasoNQL VARCHAR(10), -- Người quản lý (sẽ link tới NhanVien sau)
    Ngaybatdau DATE
);

-- Bảng NHANVIEN
CREATE TABLE NHANVIEN (
    MasoNV VARCHAR(10) PRIMARY KEY,
    Hodem VARCHAR(50),
    Ten VARCHAR(20),
    Ngaysinh DATE,
    DiaChi VARCHAR(255),
    Luong FLOAT,
    Gioitinh VARCHAR(10),
    MasoNGS VARCHAR(10), -- Người giám sát (Link chính bảng này)
    MasoDV VARCHAR(10),
    -- Tạo khóa ngoại
    FOREIGN KEY (MasoDV) REFERENCES DONVI(MasoDV)
);

-- Thêm khóa ngoại cho DONVI (MasoNQL trỏ tới NHANVIEN)
-- Phải dùng ALTER TABLE vì 2 bảng tham chiếu lẫn nhau
ALTER TABLE DONVI 
ADD CONSTRAINT FK_DonVi_NQL FOREIGN KEY (MasoNQL) REFERENCES NHANVIEN(MasoNV);

-- Thêm khóa ngoại cho Người giám sát trong bảng NHANVIEN
ALTER TABLE NHANVIEN
ADD CONSTRAINT FK_NhanVien_NGS FOREIGN KEY (MasoNGS) REFERENCES NHANVIEN(MasoNV);

-- Bảng DONVI_DIADIEM (Địa điểm của đơn vị)
CREATE TABLE DONVI_DIADIEM (
    MasoDV VARCHAR(10),
    DiaiemDV VARCHAR(100),
    PRIMARY KEY (MasoDV, DiaiemDV),
    FOREIGN KEY (MasoDV) REFERENCES DONVI(MasoDV)
);

-- Bảng DUAN (Dự án)
CREATE TABLE DUAN (
    MaDA VARCHAR(10) PRIMARY KEY,
    TenDA VARCHAR(100),
    DiaDiemDA VARCHAR(100),
    MasoDV VARCHAR(10), -- Đơn vị nào phụ trách dự án
    FOREIGN KEY (MasoDV) REFERENCES DONVI(MasoDV)
);

-- Bảng NHANVIEN_DUAN (Phân công: Nhân viên làm dự án nào)
CREATE TABLE NHANVIEN_DUAN (
    MasoNV VARCHAR(10),
    MasoDA VARCHAR(10),
    Sogio FLOAT,
    PRIMARY KEY (MasoNV, MasoDA),
    FOREIGN KEY (MasoNV) REFERENCES NHANVIEN(MasoNV),
    FOREIGN KEY (MasoDA) REFERENCES DUAN(MaDA)
);

-- Bảng PHUTHUOC (Người phụ thuộc của nhân viên)
CREATE TABLE PHUTHUOC (
    MasoNV VARCHAR(10),
    Tencon VARCHAR(50),
    Gioitinh VARCHAR(10),
    Ngaysinh DATE,
    PRIMARY KEY (MasoNV, Tencon),
    FOREIGN KEY (MasoNV) REFERENCES NHANVIEN(MasoNV)
);

-- CHÈN DỮ LIỆU MẪU 
-- Tắt kiểm tra khóa ngoại để chèn dữ liệu không bị lỗi thứ tự (do vòng lặp NV-Đơn vị)
SET FOREIGN_KEY_CHECKS = 0;

-- Dữ liệu DONVI
INSERT INTO DONVI (MasoDV, TenDV, MasoNQL, Ngaybatdau) VALUES
('DV01', 'Nghiên cứu', 'NV01', '2020-01-01'),
('DV02', 'Điều hành', 'NV03', '2020-02-15'),
('DV03', 'Tài chính', 'NV05', '2021-05-20'),
('DV04', 'Nhân sự', 'NV02', '2019-11-10'),
('DV05', 'Kinh doanh', 'NV04', '2022-03-08');

-- Dữ liệu NHANVIEN
INSERT INTO NHANVIEN (MasoNV, Hodem, Ten, Ngaysinh, DiaChi, Luong, Gioitinh, MasoNGS, MasoDV) VALUES
('NV01', 'Nguyễn Văn', 'An', '1980-01-15', 'Hà Nội', 2000, 'Nam', NULL, 'DV01'), -- Sếp tổng
('NV02', 'Trần Thị', 'Bình', '1985-05-20', 'Hưng Yên', 1500, 'Nữ', 'NV01', 'DV04'),
('NV03', 'Lê Ngọc', 'Cường', '1982-12-10', 'TP.HCM', 1800, 'Nam', 'NV01', 'DV02'),
('NV04', 'Phạm Thu', 'Dung', '1990-08-25', 'Đà Nẵng', 1200, 'Nữ', 'NV03', 'DV05'),
('NV05', 'Hoàng Văn', 'Em', '1995-04-30', 'Hải Phòng', 1000, 'Nam', 'NV03', 'DV03');

-- Dữ liệu DONVI_DIADIEM
INSERT INTO DONVI_DIADIEM (MasoDV, DiaiemDV) VALUES
('DV01', 'Hà Nội'),
('DV02', 'TP.HCM'),
('DV03', 'Hải Phòng'),
('DV04', 'Hà Nội'),
('DV05', 'Đà Nẵng');

-- Dữ liệu DUAN
INSERT INTO DUAN (MaDA, TenDA, DiaDiemDA, MasoDV) VALUES
('DA01', 'Sản phẩm X', 'Hà Nội', 'DV01'),
('DA02', 'Tin học hóa', 'TP.HCM', 'DV02'),
('DA03', 'Đào tạo mới', 'Hà Nội', 'DV04'),
('DA04', 'Mở rộng thị trường', 'Đà Nẵng', 'DV05'),
('DA05', 'Kiểm toán năm', 'Hải Phòng', 'DV03');

-- Dữ liệu NHANVIEN_DUAN
INSERT INTO NHANVIEN_DUAN (MasoNV, MasoDA, Sogio) VALUES
('NV01', 'DA01', 10.5),
('NV02', 'DA03', 20.0),
('NV03', 'DA02', 40.0),
('NV04', 'DA04', 15.0),
('NV05', 'DA05', 30.0);

-- Dữ liệu PHUTHUOC
INSERT INTO PHUTHUOC (MasoNV, Tencon, Gioitinh, Ngaysinh) VALUES
('NV01', 'Bé Tí', 'Nam', '2015-01-01'),
('NV01', 'Bé Tèo', 'Nam', '2018-05-05'),
('NV02', 'Bé Na', 'Nữ', '2020-10-10'),
('NV03', 'Bé Mít', 'Nữ', '2019-12-25'),
('NV04', 'Bé Xoài', 'Nam', '2021-06-01');

-- Bật lại kiểm tra khóa ngoại để đảm bảo an toàn cho các thao tác sau này
SET FOREIGN_KEY_CHECKS = 1;

select * from DONVI;
select * from NHANVIEN;
select * from DUAN;
select * from NHANVIEN_DUAN;
select * from PHUTHUOC;
select * from DONVI_DIADIEM;