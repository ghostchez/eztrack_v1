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


-- Dumping database structure for eztrack_db
CREATE DATABASE IF NOT EXISTS `eztrack_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `eztrack_db`;

-- Dumping structure for table eztrack_db.eventos
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack_db.eventos: ~2 rows (approximately)
REPLACE INTO `eventos` (`id`, `nombre`, `ciudad`, `nombre_evento`, `nombre_autodromo`, `url_ubicacion`, `fecha_desde`, `fecha_hasta`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(1, 'redbull', 'palermo', 'epic winter', 'C1', 'www.url.com', '2023-09-03', '2023-09-06', NULL, NULL, NULL),
	(2, 'cocacola 2023', 'Berazategui', 'Aniversario berazategui 15 años', 'BeraSpeed', '', '2023-09-08', '2023-09-15', '2023-09-14 03:56:49', '2023-09-14 03:56:49', NULL);

-- Dumping structure for table eztrack_db.eventos_vehiculos
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

-- Dumping data for table eztrack_db.eventos_vehiculos: ~0 rows (approximately)

-- Dumping structure for table eztrack_db.metodo_pago
CREATE TABLE IF NOT EXISTS `metodo_pago` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack_db.metodo_pago: ~0 rows (approximately)

-- Dumping structure for table eztrack_db.opcion_alquileres
CREATE TABLE IF NOT EXISTS `opcion_alquileres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidadVueltas` int(11) NOT NULL,
  `naftaIncluida` int(11) NOT NULL,
  `instructorABordo` int(11) NOT NULL,
  `analisisTelemetria` int(11) NOT NULL,
  `seguroPremium` int(11) NOT NULL,
  `compuestoNeumaticos` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack_db.opcion_alquileres: ~9 rows (approximately)
REPLACE INTO `opcion_alquileres` (`id`, `cantidadVueltas`, `naftaIncluida`, `instructorABordo`, `analisisTelemetria`, `seguroPremium`, `compuestoNeumaticos`) VALUES
	(1, 4, 0, 0, 0, 0, 'blando'),
	(2, 3, 1, 0, 0, 0, 'blando'),
	(3, 2, 1, 0, 0, 0, 'blando'),
	(4, 2, 1, 0, 0, 0, 'blando'),
	(5, 3, 1, 1, 1, 0, 'blando'),
	(6, 5, 1, 1, 1, 0, 'blando'),
	(7, 3, 1, 1, 0, 0, 'blando'),
	(8, 3, 1, 1, 1, 0, 'blando'),
	(9, 3, 1, 1, 0, 0, 'blando');

-- Dumping structure for table eztrack_db.pagos
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

-- Dumping data for table eztrack_db.pagos: ~0 rows (approximately)

-- Dumping structure for table eztrack_db.reservas
CREATE TABLE IF NOT EXISTS `reservas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) DEFAULT NULL,
  `idVehiculo` int(11) DEFAULT NULL,
  `idEvento` int(11) DEFAULT NULL,
  `idOpcionAlquiler` int(11) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL,
  `idPago` int(11) DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_reservas_usuarios` (`idUsuario`),
  KEY `FK_reservas_vehiculos` (`idVehiculo`),
  KEY `FK_reservas_eventos` (`idEvento`),
  KEY `FK_reservas_opcion_alquiler` (`idOpcionAlquiler`),
  CONSTRAINT `FK_reservas_eventos` FOREIGN KEY (`idEvento`) REFERENCES `eventos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_reservas_opcion_alquiler` FOREIGN KEY (`idOpcionAlquiler`) REFERENCES `opcion_alquileres` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_reservas_usuarios` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_reservas_vehiculos` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack_db.reservas: ~10 rows (approximately)
REPLACE INTO `reservas` (`id`, `idUsuario`, `idVehiculo`, `idEvento`, `idOpcionAlquiler`, `subtotal`, `idPago`, `fecha`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
	(11, NULL, 1, 1, 2, NULL, NULL, '0000-00-00 00:00:00', '2023-09-04 04:45:44', '2023-09-04 04:45:51', NULL),
	(12, NULL, 1, 1, 5, NULL, NULL, '0000-00-00 00:00:00', '2023-09-04 04:46:41', '2023-09-04 04:47:55', NULL),
	(13, 1, 3, 1, 6, NULL, NULL, '0000-00-00 00:00:00', '2023-09-05 00:48:16', '2023-09-05 00:48:34', NULL),
	(14, NULL, 1, 1, NULL, NULL, NULL, '0000-00-00 00:00:00', '2023-09-11 02:20:43', '2023-09-11 02:20:43', NULL),
	(15, NULL, 1, 1, NULL, NULL, NULL, '0000-00-00 00:00:00', '2023-09-11 02:22:36', '2023-09-11 02:22:36', NULL),
	(16, NULL, 1, 1, NULL, NULL, NULL, '0000-00-00 00:00:00', '2023-09-11 02:24:10', '2023-09-11 02:24:10', NULL),
	(17, NULL, 1, 1, NULL, NULL, NULL, '0000-00-00 00:00:00', '2023-09-11 02:25:13', '2023-09-11 02:25:13', NULL),
	(18, NULL, 1, 1, 8, NULL, NULL, '0000-00-00 00:00:00', '2023-09-11 02:31:14', '2023-09-11 02:33:08', NULL),
	(19, NULL, 1, 1, 9, NULL, NULL, '0000-00-00 00:00:00', '2023-09-11 02:34:06', '2023-09-11 02:34:11', NULL),
	(20, NULL, 7, 1, NULL, NULL, NULL, '0000-00-00 00:00:00', '2023-09-15 02:49:49', '2023-09-15 02:49:49', NULL);

-- Dumping structure for table eztrack_db.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack_db.roles: ~3 rows (approximately)
REPLACE INTO `roles` (`id`, `rol`) VALUES
	(1, 'usuario'),
	(2, 'administrador'),
	(3, 'asistente');

-- Dumping structure for table eztrack_db.usuarios
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack_db.usuarios: ~5 rows (approximately)
REPLACE INTO `usuarios` (`id`, `nombre`, `email`, `telefono`, `identidadVerificada`, `password`, `createdAt`, `deletedAt`, `updatedAt`, `idRol`) VALUES
	(1, 'conrado', 'conrado@gmail.com', 2147483647, NULL, '123asd', NULL, NULL, NULL, 2),
	(2, 'prueba algo', 'prueba@gmail.com', 12345, NULL, '123asd', NULL, NULL, NULL, 1),
	(3, 'lopez', 'lopez@gmail.com', 123456, NULL, '123asd', NULL, NULL, NULL, 1),
	(4, 'fabricio gonzales', 'fabricio@gmail.com', 123456, NULL, '123asd', NULL, NULL, NULL, 3);

-- Dumping structure for table eztrack_db.vehiculos
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table eztrack_db.vehiculos: ~6 rows (approximately)
REPLACE INTO `vehiculos` (`id`, `modelo`, `marca`, `año`, `peso`, `potencia`, `disponibilidad`, `createdAt`, `deletedAt`, `updatedAt`, `img`, `descripcion`, `traccion`, `precio_vuelta`) VALUES
	(1, 'P3', 'Tesla', 2022, 1500, 200, 0, '2023-09-03 23:52:45', NULL, '2023-09-03 23:52:45', NULL, NULL, 200, 15),
	(2, 'J10', 'Renault', 2023, 1600, 1000, 0, '2023-09-03 23:57:39', NULL, '2023-09-03 23:57:39', NULL, NULL, 150, 12),
	(3, 'P5', 'Tesla', 2023, 1500, 2000, 0, '2023-09-05 00:41:38', NULL, '2023-09-05 00:41:38', NULL, 'MANITOU SPRINGS, Colorado – Racing uphill on roads with little to no guardrails at speeds exceeding 100 miles per hour may not sound like everyone\'s cup of tea, but for the competitors of the annual P', 100, 15),
	(7, 'J1', 'Renault', 2022, 2100, 200, 0, '2023-09-13 02:47:55', NULL, '2023-09-13 02:47:55', NULL, 'En diciembre de 2015, Renault anunció la adquisición del equipo Lotus y su regreso a la Fórmula 1 en calidad de constructor. Renault adquirió la empresa por el precio simbólico de una libra. Hizo fren', 430, 16),
	(12, 'K19', 'tesla', 2023, 3000, 1000, 0, '2023-09-19 18:17:12', NULL, '2023-09-19 18:17:12', NULL, 'qwe ', 0, 8),
	(39, 'k192', 'tesla', 2022, 4030, 1301, 0, '2023-09-19 19:10:15', NULL, '2023-09-19 19:10:15', '1695150615348--img2.png', 'asd asd asd ', 1000, 8);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
