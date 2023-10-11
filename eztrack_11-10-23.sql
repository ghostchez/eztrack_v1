-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table eztrack.datos_pagos
DROP TABLE IF EXISTS `datos_pagos`;
CREATE TABLE IF NOT EXISTS `datos_pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `direccion` varchar(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `dni` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `titular` varchar(30) DEFAULT NULL,
  `numero_tarjeta` bigint(20) DEFAULT NULL,
  `cvv` int(11) DEFAULT NULL,
  `vencimiento` text DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack.datos_pagos: ~4 rows (approximately)
REPLACE INTO `datos_pagos` (`id`, `direccion`, `estado`, `dni`, `email`, `titular`, `numero_tarjeta`, `cvv`, `vencimiento`, `createdAt`, `deletedAt`, `updatedAt`) VALUES
	(3, 'qwe 333', 'santa feee', 12312333, 'asd3@gmail.com', 'enrique lopezzz', 1234123412343333, 333, '03/23', '2023-10-09 03:40:12', NULL, '2023-10-09 03:51:12'),
	(4, 'QWE 123', 'cordoba', 12345678, 'lopez@gmail.com', 'ENRIQUE LOPEZ URRUCHAGA', 1234567812345678, 123, 'undefined/undefined', '2023-10-10 21:04:42', NULL, '2023-10-10 21:04:42'),
	(5, 'QWE 123', 'cordoba', 12345678, 'lopez@gmail.com', 'ENRIQUE LOPEZ URRUCHAGA', 1234567812345678, 123, 'undefined/undefined', '2023-10-10 21:05:11', NULL, '2023-10-10 21:05:11'),
	(6, 'QWE 123', 'cordoba', 12345678, 'lopez@gmail.com', 'ENRIQUE LOPEZ URRUCHAGA', 1234567812345678, 123, 'undefined/undefined', '2023-10-10 21:06:03', NULL, '2023-10-10 21:06:03');

-- Dumping structure for table eztrack.eventos
DROP TABLE IF EXISTS `eventos`;
CREATE TABLE IF NOT EXISTS `eventos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `ciudad` varchar(50) NOT NULL,
  `nombre_evento` varchar(50) NOT NULL,
  `nombre_autodromo` varchar(50) NOT NULL,
  `url_ubicacion` varchar(50) NOT NULL,
  `fecha_desde` date NOT NULL,
  `fecha_hasta` date NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack.eventos: ~3 rows (approximately)
REPLACE INTO `eventos` (`id`, `nombre`, `ciudad`, `nombre_evento`, `nombre_autodromo`, `url_ubicacion`, `fecha_desde`, `fecha_hasta`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'redbull', 'palermo', 'epic winter', 'C1', 'www.url.com', '2023-09-03', '2023-09-06', NULL, NULL, NULL),
	(2, 'cocacola 2023', 'Berazategui', 'Aniversario berazategui 15 años', 'BeraSpeed', 'www.cocacola.com/2023', '2023-09-08', '2023-09-15', '2023-09-14 03:56:49', '2023-09-14 03:56:49', NULL),
	(3, 'cocacola 2023', 'Berazategui', 'Aniversario berazategui 15 años', 'BeraSpeed', 'www.cocacola.com/2023', '2023-09-08', '2023-09-15', '2023-09-14 03:56:49', '2023-09-14 03:56:49', '2023-10-09 20:29:09'),
	(4, 'cocacola 2023', 'Berazategui', 'Aniversario berazategui 15 años', 'BeraSpeed', 'www.cocacola.com/2023', '2023-09-08', '2023-09-15', '2023-09-14 03:56:49', '2023-09-14 03:56:49', NULL);

-- Dumping structure for table eztrack.eventos_vehiculos
DROP TABLE IF EXISTS `eventos_vehiculos`;
CREATE TABLE IF NOT EXISTS `eventos_vehiculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idEvento` int(11) NOT NULL,
  `idVehiculo` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_eventos_lista_eventos` (`idEvento`),
  KEY `FK_eventos_lista_vehiculos` (`idVehiculo`),
  CONSTRAINT `FK_eventos_lista_eventos` FOREIGN KEY (`idEvento`) REFERENCES `eventos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_eventos_lista_vehiculos` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack.eventos_vehiculos: ~0 rows (approximately)

-- Dumping structure for table eztrack.metodo_pago
DROP TABLE IF EXISTS `metodo_pago`;
CREATE TABLE IF NOT EXISTS `metodo_pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack.metodo_pago: ~0 rows (approximately)

-- Dumping structure for table eztrack.opcion_alquileres
DROP TABLE IF EXISTS `opcion_alquileres`;
CREATE TABLE IF NOT EXISTS `opcion_alquileres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidadVueltas` int(11) NOT NULL,
  `naftaIncluida` int(11) NOT NULL,
  `instructorABordo` int(11) NOT NULL,
  `analisisTelemetria` int(11) NOT NULL,
  `seguroPremium` int(11) NOT NULL,
  `compuestoNeumaticos` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack.opcion_alquileres: ~33 rows (approximately)
REPLACE INTO `opcion_alquileres` (`id`, `cantidadVueltas`, `naftaIncluida`, `instructorABordo`, `analisisTelemetria`, `seguroPremium`, `compuestoNeumaticos`) VALUES
	(1, 4, 0, 0, 0, 0, 'blando'),
	(2, 3, 1, 0, 0, 0, 'blando'),
	(3, 2, 1, 0, 0, 0, 'blando'),
	(4, 2, 1, 0, 0, 0, 'blando'),
	(5, 3, 1, 1, 1, 0, 'blando'),
	(6, 5, 1, 1, 1, 0, 'blando'),
	(7, 3, 1, 1, 0, 0, 'blando'),
	(8, 3, 1, 1, 1, 0, 'blando'),
	(9, 3, 1, 1, 0, 0, 'blando'),
	(10, 10, 1, 1, 1, 0, 'blando'),
	(11, 2, 1, 1, 1, 0, 'blando'),
	(12, 2, 1, 1, 1, 0, 'blando'),
	(13, 6, 1, 1, 1, 0, 'blando'),
	(14, 6, 1, 1, 1, 0, 'medio'),
	(15, 4, 1, 1, 1, 0, 'blando'),
	(16, 9, 1, 1, 1, 0, 'medio'),
	(17, 7, 1, 1, 0, 0, 'blando'),
	(18, 9, 1, 1, 1, 0, 'medio'),
	(19, 5, 1, 1, 1, 0, 'medio'),
	(20, 6, 1, 1, 1, 0, 'medio'),
	(21, 7, 1, 1, 1, 0, 'medio'),
	(22, 11, 1, 1, 1, 0, 'medio'),
	(23, 4, 1, 1, 1, 0, 'blando'),
	(24, 6, 1, 1, 1, 0, 'medio'),
	(25, 3, 1, 1, 1, 0, 'medio'),
	(26, 9, 1, 1, 1, 0, 'medio'),
	(27, 2, 1, 1, 1, 0, ''),
	(28, 0, 0, 0, 0, 0, ''),
	(29, 3, 1, 1, 1, 0, 'medio'),
	(30, 3, 1, 1, 1, 0, 'medio'),
	(31, 3, 1, 1, 1, 0, 'medio'),
	(32, 3, 1, 0, 0, 0, 'medio'),
	(33, 5, 1, 1, 1, 1, 'medio');

-- Dumping structure for table eztrack.pagos
DROP TABLE IF EXISTS `pagos`;
CREATE TABLE IF NOT EXISTS `pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(50) NOT NULL,
  `idMetodo` int(11) NOT NULL,
  `idReserva` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_pagos_metodo_pago` (`idMetodo`),
  KEY `FK_pagos_reservas` (`idReserva`),
  CONSTRAINT `FK_pagos_metodo_pago` FOREIGN KEY (`idMetodo`) REFERENCES `metodo_pago` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_pagos_reservas` FOREIGN KEY (`idReserva`) REFERENCES `reservas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack.pagos: ~0 rows (approximately)

-- Dumping structure for table eztrack.pagos_pendientes
DROP TABLE IF EXISTS `pagos_pendientes`;
CREATE TABLE IF NOT EXISTS `pagos_pendientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total` int(11) DEFAULT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `metodo` varchar(50) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `status` text DEFAULT 'pendiente',
  `idReserva` int(11) DEFAULT NULL,
  `archivo` varchar(50) DEFAULT NULL,
  `idDatosPago` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack.pagos_pendientes: ~5 rows (approximately)
REPLACE INTO `pagos_pendientes` (`id`, `total`, `idUsuario`, `metodo`, `createdAt`, `deletedAt`, `updatedAt`, `status`, `idReserva`, `archivo`, `idDatosPago`) VALUES
	(1, 25000, 1, 'transferencia bancaria', '2023-10-06 16:39:50', NULL, '2023-10-09 20:01:38', 'pendiente', 25, '1696881698576--Proyecto nuevo.pdf', NULL),
	(8, 90, 1, 'mis datos de pago', '2023-10-10 02:16:05', NULL, '2023-10-10 02:17:06', 'pendiente', 40, '1696904226711--Proyecto nuevo.pdf', 3),
	(9, 50, 1, 'mis datos de pago', '2023-10-10 21:01:34', NULL, '2023-10-10 21:01:34', 'pendiente', 50, NULL, 3),
	(10, 50, 1, 'tarjeta_credito', '2023-10-10 21:06:03', NULL, '2023-10-10 21:06:03', 'pendiente', 50, NULL, 6);

-- Dumping structure for table eztrack.reservas
DROP TABLE IF EXISTS `reservas`;
CREATE TABLE IF NOT EXISTS `reservas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) DEFAULT NULL,
  `idVehiculo` int(11) DEFAULT NULL,
  `idEvento` int(11) DEFAULT NULL,
  `idOpcionAlquiler` int(11) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL,
  `idPago` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_reservas_usuarios` (`idUsuario`),
  KEY `FK_reservas_vehiculos` (`idVehiculo`),
  KEY `FK_reservas_eventos` (`idEvento`),
  KEY `FK_reservas_opcion_alquiler` (`idOpcionAlquiler`),
  CONSTRAINT `FK_reservas_eventos` FOREIGN KEY (`idEvento`) REFERENCES `eventos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_reservas_opcion_alquiler` FOREIGN KEY (`idOpcionAlquiler`) REFERENCES `opcion_alquileres` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_reservas_usuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_reservas_vehiculos` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack.reservas: ~19 rows (approximately)
REPLACE INTO `reservas` (`id`, `idUsuario`, `idVehiculo`, `idEvento`, `idOpcionAlquiler`, `subtotal`, `idPago`, `fecha`, `createdAt`, `updatedAt`, `deletedAt`, `status`) VALUES
	(11, NULL, 1, 1, 2, NULL, NULL, '0000-00-00', '2023-09-04 04:45:44', '2023-09-04 04:45:51', NULL, NULL),
	(25, 1, 1, 1, NULL, NULL, NULL, '0000-00-00', '2023-09-26 20:55:33', '2023-09-26 20:55:33', NULL, NULL),
	(26, 1, 7, 1, NULL, NULL, NULL, '0000-00-00', '2023-09-26 21:02:47', '2023-09-26 21:02:47', NULL, NULL),
	(27, 1, 1, 1, 11, NULL, NULL, '0000-00-00', '2023-10-07 21:44:32', '2023-10-07 21:44:39', NULL, NULL),
	(28, 1, 1, 1, 12, NULL, NULL, '2023-10-11', '2023-10-07 23:07:27', '2023-10-07 23:07:40', NULL, NULL),
	(37, 5, 1, 2, 15, NULL, NULL, '2023-09-14', '2023-10-08 20:10:58', '2023-10-08 20:11:16', NULL, NULL),
	(38, 1, 1, 1, 16, NULL, NULL, '2023-09-05', '2023-10-08 20:20:29', '2023-10-08 20:20:37', NULL, NULL),
	(39, 1, 1, 1, 17, NULL, NULL, '2023-09-06', '2023-10-09 20:02:55', '2023-10-09 20:03:01', NULL, NULL),
	(40, 1, 1, 1, 18, NULL, NULL, '2023-09-06', '2023-10-09 20:11:17', '2023-10-09 20:11:23', NULL, NULL),
	(41, 1, 1, 2, 19, NULL, NULL, '2023-09-14', '2023-10-10 00:45:56', '2023-10-10 00:46:06', NULL, NULL),
	(42, 1, 1, 2, 20, NULL, NULL, '2023-09-14', '2023-10-10 01:01:04', '2023-10-10 01:01:11', NULL, NULL),
	(43, 1, 1, 2, 21, NULL, NULL, '2023-09-14', '2023-10-10 01:03:09', '2023-10-10 01:03:17', NULL, NULL),
	(44, 1, 1, 2, NULL, NULL, NULL, '2023-09-14', '2023-10-10 01:05:23', '2023-10-10 01:05:23', NULL, NULL),
	(45, 1, 1, 2, NULL, NULL, NULL, '2023-09-14', '2023-10-10 01:05:36', '2023-10-10 01:05:36', NULL, NULL),
	(46, 1, 1, 1, 22, NULL, NULL, '2023-09-06', '2023-10-10 01:09:23', '2023-10-10 01:09:29', NULL, NULL),
	(47, 1, 1, 2, 23, NULL, NULL, '2023-09-14', '2023-10-10 01:49:47', '2023-10-10 01:49:54', NULL, NULL),
	(48, 1, 1, 2, 25, NULL, NULL, '2023-09-14', '2023-10-10 01:55:22', '2023-10-10 01:57:11', NULL, NULL),
	(49, 1, 1, 2, 26, NULL, NULL, '2023-09-14', '2023-10-10 02:02:14', '2023-10-10 02:02:21', NULL, NULL),
	(50, 1, 1, 2, 33, NULL, NULL, '2023-09-14', '2023-10-10 19:20:17', '2023-10-10 19:23:24', NULL, NULL);

-- Dumping structure for table eztrack.roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack.roles: ~4 rows (approximately)
REPLACE INTO `roles` (`id`, `rol`) VALUES
	(1, 'usuario'),
	(2, 'administrador'),
	(3, 'asistente'),
	(4, 'atencion al cliente');

-- Dumping structure for table eztrack.usuarios
DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefono` int(11) NOT NULL,
  `identidadVerificada` int(11) DEFAULT NULL,
  `password` varchar(50) NOT NULL DEFAULT '',
  `createdAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `idRol` int(11) DEFAULT NULL,
  `idDatosPago` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack.usuarios: ~6 rows (approximately)
REPLACE INTO `usuarios` (`id`, `nombre`, `email`, `telefono`, `identidadVerificada`, `password`, `createdAt`, `deletedAt`, `updatedAt`, `idRol`, `idDatosPago`) VALUES
	(1, 'conrado', 'conrado@gmail.com', 2147483647, NULL, '123asd', NULL, NULL, NULL, 2, 3),
	(2, 'prueba algo', 'prueba@gmail.com', 12345, NULL, '123asd', NULL, NULL, NULL, 1, NULL),
	(3, 'lopez', 'lopez@gmail.com', 123456, NULL, '123asd', NULL, NULL, NULL, 1, NULL),
	(4, 'fabricio gonzales', 'fabricio@gmail.com', 123456, NULL, '123asd', NULL, NULL, NULL, 3, NULL),
	(5, 'daniel lopez', 'daniel@gmail.com', 12345126, NULL, '123asd', NULL, NULL, NULL, 4, NULL);

-- Dumping structure for table eztrack.vehiculos
DROP TABLE IF EXISTS `vehiculos`;
CREATE TABLE IF NOT EXISTS `vehiculos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `modelo` varchar(50) NOT NULL DEFAULT '0',
  `marca` varchar(50) NOT NULL,
  `año` int(11) NOT NULL DEFAULT 0,
  `peso` int(11) NOT NULL DEFAULT 0,
  `potencia` int(11) NOT NULL DEFAULT 0,
  `disponibilidad` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `img` varchar(50) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `traccion` int(11) DEFAULT NULL,
  `precio_vuelta` int(11) DEFAULT NULL,
  `nivel` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack.vehiculos: ~5 rows (approximately)
REPLACE INTO `vehiculos` (`id`, `modelo`, `marca`, `año`, `peso`, `potencia`, `disponibilidad`, `createdAt`, `deletedAt`, `updatedAt`, `img`, `descripcion`, `traccion`, `precio_vuelta`, `nivel`) VALUES
	(1, 'w1', 'ford', 2913, 8, 8, 0, '2023-09-03 23:52:45', NULL, '2023-09-26 20:34:19', '1695758695013--1695690943489--martinedit-640x427.j', '', 11, 10, 9),
	(4, 'q1', 'ford', 2023, 3, 12, 0, NULL, NULL, '2023-09-26 19:57:41', NULL, 'Poco peso, frenos grandes, tracción trasera, normativas de seguridad acorde a la FIA. Es un auto para pilotos intermedios o avanzados que no tiene desperdicio.', 6, 5, 4),
	(7, 'J1', 'Renault', 2022, 2100, 200, 0, '2023-09-13 02:47:55', NULL, '2023-09-13 02:47:55', NULL, 'En diciembre de 2015, Renault anunció la adquisición del equipo Lotus y su regreso a la Fórmula 1 en calidad de constructor. Renault adquirió la empresa por el precio simbólico de una libra. Hizo fren', 430, 16, NULL),
	(12, 'K19', 'tesla', 2023, 3000, 1000, 0, '2023-09-19 18:17:12', NULL, '2023-09-26 20:04:55', NULL, '', 0, 8, 5),
	(39, 'k192', 'tesla', 2022, 4030, 1301, 0, '2023-09-19 19:10:15', NULL, '2023-09-19 19:10:15', '1695150615348--img2.png', 'asd asd asd ', 1000, 8, NULL),
	(40, 'p16', 'Tesla', 2016, 1600, 200, 0, '2023-09-22 04:59:22', NULL, '2023-09-22 04:59:22', '1695358762026--img1.png', 'lorem lorem lorem', 200, 16, 16),
	(46, 'w1', 'q1', 2022, 2, 1, 0, '2023-09-25 03:29:28', NULL, '2023-09-25 03:29:28', '1695612568782--martinedit-640x427.jpg', 'qwe qwe ', 5, 4, 3),
	(47, 'a1', 'tesla', 2020, 1, 12, 0, '2023-09-26 01:15:43', NULL, '2023-09-26 01:15:43', '1695690943489--martinedit-640x427.jpg', '1', 5, 2, 3),
	(48, 'w1', 'e1', 2022, 1600, 1300, 0, '2023-09-26 01:54:24', NULL, '2023-09-26 01:54:24', '1695693264283--ken-block-s-cars_285-40577276_20230', '', 2000, 12, 8);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
