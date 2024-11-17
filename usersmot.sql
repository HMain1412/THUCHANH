-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2024 at 09:54 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `usersmot`
--

-- --------------------------------------------------------

--
-- Table structure for table `nhom`
--

CREATE TABLE `nhom` (
  `idnhom` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhom`
--

INSERT INTO `nhom` (`idnhom`, `ten`) VALUES
(1, 'Điện thoại'),
(2, 'Laptop');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `masp` int(11) NOT NULL,
  `ten` varchar(255) NOT NULL,
  `gia` decimal(10,2) NOT NULL,
  `hinhanh` varchar(255) DEFAULT NULL,
  `mota` text DEFAULT NULL,
  `idnhom` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`masp`, `ten`, `gia`, `hinhanh`, `mota`, `idnhom`) VALUES
(1, 'Điện thoại ', 50000.00, '1.jpg', 'Điện thoại thông minh mới', 1),
(2, 'Điện thoại ', 35000.00, '2.jpg', 'Điện thoại mới mỏng nhẹ', 2),
(3, 'Điện thoại ', 22000.00, '3.jpg', 'Điện thoại màn hình dài t', 1),
(4, 'Điện thoại ', 15000.00, '4.jpg', 'Điện thoại mới', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `address` text DEFAULT NULL,
  `sex` enum('male','female','other') NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(50) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `address`, `sex`, `email`, `role`) VALUES
(12, 'test1', '$2a$10$DKbOYWKYGQHvF.Saw6PLj.o2JSfcDhsSyAHchTpJiHWXFURBQptBm', 'aaaaaaa', 'aaaaaaasda', 'male', 'aaass@gmail.com', 'admin'),
(15, 'test', '$2a$10$s9CGAJj1bEw9lVMI2ije.ue3/7Ia1hu7zPSUGxe936JR8o33TU7Pi', 'aaaa', 'aaa', 'male', 'aaaaaaa@gmail.com', 'admin'),
(20, 'admin', '$2a$10$rkdEFG1np0gKbP8psL9e5u34Dcbo9W9699SnvfBbO6uwQrtHv/fR6', '123, van cu, an hoa, can tho', 'ád', 'male', 'fdhqkfje@gmail.com', 'user'),
(21, 'admin1', '$2a$10$wyi4VAZ4A9zGMjEbAtJf/uVoo9WFrL61qWiCF1UlzOFfMe8h5y1aq', 'hem 333', 'aaaaaaaq', 'male', 'fdhqkfjea@gmail.com', 'user'),
(22, 'User', '$2a$10$TgbfFYsF6C5Mr7dvupJ/8uJQWtBSq1yvWH3HeX/oG2RFXtuBtA2kS', 'a', 'aaaaaaaqaa', 'male', 'aaaaaaqq@gmail.com', 'user'),
(23, 'User2', '$2a$10$2sPvKjNyrev6LsD5nZzdDeaS2rpleX16P.6OfWhemxNlq9XLTkIYq', '123, van cu, an hoa, can tho', 'aaaaaaaqaaa', 'male', 'aaaaaaas1ss@gmail.com', 'user'),
(24, 'User1', '$2a$10$gB5phk/VaZOuhoZ5bnPub.bkXSZJJwQSVqnBPB36YXDTh1cnJdWRG', 'aaaaaa', 'áda', 'male', 'aaaaaaaa@gmail.com', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `nhom`
--
ALTER TABLE `nhom`
  ADD PRIMARY KEY (`idnhom`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`masp`),
  ADD KEY `idnhom` (`idnhom`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `nhom`
--
ALTER TABLE `nhom`
  MODIFY `idnhom` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `masp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`idnhom`) REFERENCES `nhom` (`idnhom`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
