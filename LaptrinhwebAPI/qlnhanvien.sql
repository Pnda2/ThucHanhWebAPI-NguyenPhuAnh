use qlnhanvien;

-- Bảng Phongban (Cần tạo trước để NhanVien tham chiếu tới)
CREATE TABLE Phongban (
    MAPB VARCHAR(10) PRIMARY KEY,
    TENPB VARCHAR(100)
);

-- Bảng Congtrinh (Cần tạo trước để bảng Cong tham chiếu tới)
CREATE TABLE Congtrinh (
    MACT VARCHAR(10) PRIMARY KEY,
    TENCT VARCHAR(100),
    DIADIEM VARCHAR(255),
    NGAYCAPGP DATE, -- Ngày cấp giấy phép
    NGAYKC DATE     -- Ngày khởi công
);

-- Bảng Nhanvien (Tham chiếu tới Phongban)
CREATE TABLE Nhanvien (
    MANV VARCHAR(10) PRIMARY KEY,
    HOTEN VARCHAR(100),
    NGAYSINH DATE,
    PHAI VARCHAR(10), -- Nam/Nữ
    DIACHI VARCHAR(255),
    MAPB VARCHAR(10),
    FOREIGN KEY (MAPB) REFERENCES Phongban(MAPB)
);

-- Bảng Cong (Bảng trung gian: Nhân viên làm công trình nào, bao nhiêu ngày)
CREATE TABLE Cong (
    MACT VARCHAR(10),
    MANV VARCHAR(10),
    SLNGAYCONG INT,
    PRIMARY KEY (MACT, MANV), -- Khóa chính là sự kết hợp của Mã CT và Mã NV
    FOREIGN KEY (MACT) REFERENCES Congtrinh(MACT),
    FOREIGN KEY (MANV) REFERENCES Nhanvien(MANV)
);

-- CHÈN DỮ LIỆU MẪU 
-- Dữ liệu Phongban
INSERT INTO Phongban (MAPB, TENPB) VALUES
('PB01', 'Phòng Kế Toán'),
('PB02', 'Phòng Nhân Sự'),
('PB03', 'Phòng Kỹ Thuật'),
('PB04', 'Phòng Kinh Doanh'),
('PB05', 'Phòng Giám Sát');

-- Dữ liệu Congtrinh
INSERT INTO Congtrinh (MACT, TENCT, DIADIEM, NGAYCAPGP, NGAYKC) VALUES
('CT01', 'Khách sạn Hilton', 'Đà Nẵng', '2023-01-15', '2023-03-01'),
('CT02', 'Cầu Vĩnh Tuy 2', 'Hà Nội', '2022-06-20', '2022-09-02'),
('CT03', 'Trường THPT Chuyên', 'TP.HCM', '2023-05-10', '2023-06-01'),
('CT04', 'Nhà máy VinFast', 'Hải Phòng', '2022-11-05', '2023-01-10'),
('CT05', 'Resort Biển Xanh', 'Nha Trang', '2023-02-28', '2023-04-15');

-- Dữ liệu Nhanvien
INSERT INTO Nhanvien (MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB) VALUES
('NV01', 'Nguyễn Văn Hùng', '1990-05-12', 'Nam', 'Hà Nội', 'PB03'),
('NV02', 'Trần Thị Mai', '1995-08-22', 'Nữ', 'Hưng Yên', 'PB01'),
('NV03', 'Lê Quốc Bảo', '1988-12-10', 'Nam', 'Đà Nẵng', 'PB05'),
('NV04', 'Phạm Thu Trang', '1998-03-30', 'Nữ', 'TP.HCM', 'PB02'),
('NV05', 'Hoàng Đức Minh', '1992-07-15', 'Nam', 'Hải Phòng', 'PB03');

-- Dữ liệu Cong (Phân công nhân viên vào công trình)
INSERT INTO Cong (MACT, MANV, SLNGAYCONG) VALUES
('CT01', 'NV03', 25), -- NV Bảo giám sát KS Hilton
('CT02', 'NV01', 15), -- NV Hùng làm Cầu Vĩnh Tuy
('CT02', 'NV05', 20), -- NV Minh cũng làm Cầu Vĩnh Tuy
('CT04', 'NV05', 10), -- NV Minh làm thêm Nhà máy VinFast
('CT05', 'NV04', 5);  -- NV Trang làm Resort (ví dụ chấm công hành chính)

select * from Phongban;
select * from Congtrinh;
select * from Nhanvien;
select * from Cong;