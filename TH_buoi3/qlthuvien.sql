use qlthuvien;

-- Bảng Docgia (Độc giả)
CREATE TABLE Docgia (
    MADG VARCHAR(10) PRIMARY KEY,
    HOTEN VARCHAR(100),
    NGAYSINH DATE,
    DIACHI VARCHAR(255),
    NGHENGHIEP VARCHAR(100)
);

-- Bảng Sach (Thông tin chung về đầu sách)
CREATE TABLE Sach (
    MASH VARCHAR(10) PRIMARY KEY,
    TENSACH VARCHAR(150),
    TACGIA VARCHAR(100),
    NHAXB VARCHAR(100),
    NAMXB INT
);

-- Bảng Dausach (Các cuốn sách cụ thể trong kho)
CREATE TABLE Dausach (
    MADAUSACH VARCHAR(10) PRIMARY KEY,
    BAN VARCHAR(50), -- Lần tái bản / Phiên bản
    TAP VARCHAR(20), -- Tập số mấy
    MASH VARCHAR(10), -- Thuộc đầu sách nào
    FOREIGN KEY (MASH) REFERENCES Sach(MASH)
);

-- Bảng Phieumuon (Phiếu mượn)
CREATE TABLE Phieumuon (
    SOPM VARCHAR(10) PRIMARY KEY,
    NGAYMUON DATE,
    MADG VARCHAR(10), -- Độc giả nào mượn
    FOREIGN KEY (MADG) REFERENCES Docgia(MADG)
);

-- Bảng Chitietmuon (Chi tiết sách trong phiếu mượn)
CREATE TABLE Chitietmuon (
    SOPM VARCHAR(10),
    MADAUSACH VARCHAR(10),
    NGAYTRA DATE, -- Có thể NULL nếu chưa trả, nhưng ở đây ta để DATE theo yêu cầu
    PRIMARY KEY (SOPM, MADAUSACH), -- Khóa chính phức hợp
    FOREIGN KEY (SOPM) REFERENCES Phieumuon(SOPM),
    FOREIGN KEY (MADAUSACH) REFERENCES Dausach(MADAUSACH)
);

-- CHÈN DỮ LIỆU MẪU 
-- Dữ liệu Docgia
INSERT INTO Docgia (MADG, HOTEN, NGAYSINH, DIACHI, NGHENGHIEP) VALUES
('DG01', 'Nguyễn Thị Hương', '2002-05-15', 'Hà Nội', 'Sinh viên'),
('DG02', 'Trần Văn Bình', '1990-08-20', 'Hà Nam', 'Kỹ sư'),
('DG03', 'Lê Thu Hà', '2005-12-10', 'Hà Nội', 'Học sinh'),
('DG04', 'Phạm Minh Tuấn', '1985-03-25', 'Bắc Ninh', 'Giáo viên'),
('DG05', 'Hoàng Anh Dũng', '1999-07-30', 'Thái Nguyên', 'IT');

-- Dữ liệu Sach
INSERT INTO Sach (MASH, TENSACH, TACGIA, NHAXB, NAMXB) VALUES
('S01', 'Dế Mèn Phiêu Lưu Ký', 'Tô Hoài', 'NXB Kim Đồng', 2020),
('S02', 'Lập trình C# cơ bản', 'Phạm Huy', 'NXB Khoa học kỹ thuật', 2019),
('S03', 'Harry Potter và Hòn đá phù thủy', 'J.K. Rowling', 'NXB Trẻ', 2021),
('S04', 'Nhà Giả Kim', 'Paulo Coelho', 'NXB Văn học', 2018),
('S05', 'Mắt Biếc', 'Nguyễn Nhật Ánh', 'NXB Trẻ', 2019);

-- Dữ liệu Dausach (Mỗi cuốn sách cụ thể trên kệ)
INSERT INTO Dausach (MADAUSACH, BAN, TAP, MASH) VALUES
('DS001', 'Tái bản lần 5', '1', 'S01'), -- Một cuốn Dế Mèn
('DS002', 'Bản thường', '1', 'S02'), -- Một cuốn Lập trình C#
('DS003', 'Bản đặc biệt', '1', 'S03'), -- Một cuốn Harry Potter
('DS004', 'Tái bản lần 2', '1', 'S04'), -- Một cuốn Nhà Giả Kim
('DS005', 'Bản bìa cứng', '1', 'S05'); -- Một cuốn Mắt Biếc

-- Dữ liệu Phieumuon
INSERT INTO Phieumuon (SOPM, NGAYMUON, MADG) VALUES
('PM01', '2023-11-01', 'DG01'), -- Hương mượn
('PM02', '2023-11-02', 'DG02'), -- Bình mượn
('PM03', '2023-11-05', 'DG01'), -- Hương mượn tiếp phiếu khác
('PM04', '2023-11-06', 'DG03'), -- Hà mượn
('PM05', '2023-11-10', 'DG04'); -- Tuấn mượn

-- Dữ liệu Chitietmuon (Ghép Phiếu mượn với Sách cụ thể)
INSERT INTO Chitietmuon (SOPM, MADAUSACH, NGAYTRA) VALUES
('PM01', 'DS001', '2023-11-10'), -- Phiếu 1 mượn Dế Mèn, đã trả
('PM01', 'DS002', '2023-11-10'), -- Phiếu 1 mượn thêm sách C#, đã trả
('PM02', 'DS003', NULL),         -- Phiếu 2 mượn Harry Potter, chưa trả (NULL) hoặc điền ngày dự kiến
('PM03', 'DS004', '2023-11-20'), -- Phiếu 3 mượn Nhà Giả Kim
('PM04', 'DS005', NULL);         -- Phiếu 4 mượn Mắt Biếc

select * from Docgia;
select * from Sach;
select * from Dausach;
select * from Phieumuon;
select * from Chitietmuon;

-- Ai đang mượn sách gì, tên sách là gì và ngày mượn bao nhiêu
SELECT 
    dg.HOTEN AS Ten_Doc_Gia, 
    s.TENSACH AS Ten_Sach, 
    pm.NGAYMUON, 
    ctm.NGAYTRA
FROM Docgia dg
JOIN Phieumuon pm ON dg.MADG = pm.MADG
JOIN Chitietmuon ctm ON pm.SOPM = ctm.SOPM
JOIN Dausach ds ON ctm.MADAUSACH = ds.MADAUSACH
JOIN Sach s ON ds.MASH = s.MASH;