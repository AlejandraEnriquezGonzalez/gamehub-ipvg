-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2026 a las 19:01:53
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gamehub_ipvg`
--
CREATE DATABASE IF NOT EXISTS `gamehub_ipvg` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `gamehub_ipvg`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE IF NOT EXISTS `equipos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `juegoPreferido` varchar(100) NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL DEFAULT 'activo',
  `capitanId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_49ba93a8a121dfcf7cb6f98992` (`nombre`),
  KEY `FK_e49106d4b198da251e661dd4a23` (`capitanId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELACIONES PARA LA TABLA `equipos`:
--   `capitanId`
--       `usuarios` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones`
--

CREATE TABLE IF NOT EXISTS `inscripciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `estado` enum('pendiente','aceptada','rechazada') NOT NULL DEFAULT 'pendiente',
  `torneoId` int(11) DEFAULT NULL,
  `equipoId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_d920a0904f4ad0cd8e9d1d1dfc` (`torneoId`,`equipoId`),
  KEY `FK_5a44937ad16dae80c40b5a4d164` (`equipoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELACIONES PARA LA TABLA `inscripciones`:
--   `equipoId`
--       `equipos` -> `id`
--   `torneoId`
--       `torneos` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos`
--

CREATE TABLE IF NOT EXISTS `partidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fechaHora` datetime NOT NULL,
  `ronda` varchar(100) NOT NULL,
  `estado` enum('programado','en_curso','finalizado','cancelado') NOT NULL DEFAULT 'programado',
  `torneoId` int(11) DEFAULT NULL,
  `equipoLocalId` int(11) DEFAULT NULL,
  `equipoVisitanteId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3a5afded6749349922a3bf1698d` (`torneoId`),
  KEY `FK_7cd2cefed2da636edc3a06c8650` (`equipoLocalId`),
  KEY `FK_fe2b50c36cd8b6d5fa48c883e82` (`equipoVisitanteId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELACIONES PARA LA TABLA `partidos`:
--   `torneoId`
--       `torneos` -> `id`
--   `equipoLocalId`
--       `equipos` -> `id`
--   `equipoVisitanteId`
--       `equipos` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE IF NOT EXISTS `resultados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `puntajeLocal` int(11) NOT NULL,
  `puntajeVisitante` int(11) NOT NULL,
  `partidoId` int(11) DEFAULT NULL,
  `ganadorId` int(11) DEFAULT NULL,
  `registradoPor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_190d8bee9e90ebf95864b4bfcf` (`partidoId`),
  KEY `FK_285a7fa10a3aabdfd2ac2f5f718` (`ganadorId`),
  KEY `FK_403f627adcbe0ea7b29c255b1b9` (`registradoPor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELACIONES PARA LA TABLA `resultados`:
--   `partidoId`
--       `partidos` -> `id`
--   `ganadorId`
--       `equipos` -> `id`
--   `registradoPor`
--       `usuarios` -> `id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `torneos`
--

CREATE TABLE IF NOT EXISTS `torneos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `videojuego` varchar(100) NOT NULL,
  `modalidad` enum('eliminacion_directa','liga') NOT NULL,
  `fechaInicio` datetime NOT NULL,
  `cierreInscripcion` datetime NOT NULL,
  `cupoMaximo` int(11) NOT NULL,
  `estado` enum('proximo','en_curso','finalizado','cancelado') NOT NULL DEFAULT 'proximo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELACIONES PARA LA TABLA `torneos`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `alias` varchar(50) NOT NULL,
  `correo` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` enum('admin','estudiante') NOT NULL DEFAULT 'estudiante',
  `activo` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_86c1ab44c24b70ce469068f9c6` (`alias`),
  UNIQUE KEY `IDX_63665765c1a778a770c9bd585d` (`correo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- RELACIONES PARA LA TABLA `usuarios`:
--

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD CONSTRAINT `FK_e49106d4b198da251e661dd4a23` FOREIGN KEY (`capitanId`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `inscripciones`
--
ALTER TABLE `inscripciones`
  ADD CONSTRAINT `FK_5a44937ad16dae80c40b5a4d164` FOREIGN KEY (`equipoId`) REFERENCES `equipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c05055aee4efbfdc52933a2cf3c` FOREIGN KEY (`torneoId`) REFERENCES `torneos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD CONSTRAINT `FK_3a5afded6749349922a3bf1698d` FOREIGN KEY (`torneoId`) REFERENCES `torneos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_7cd2cefed2da636edc3a06c8650` FOREIGN KEY (`equipoLocalId`) REFERENCES `equipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_fe2b50c36cd8b6d5fa48c883e82` FOREIGN KEY (`equipoVisitanteId`) REFERENCES `equipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `FK_190d8bee9e90ebf95864b4bfcf0` FOREIGN KEY (`partidoId`) REFERENCES `partidos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_285a7fa10a3aabdfd2ac2f5f718` FOREIGN KEY (`ganadorId`) REFERENCES `equipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_403f627adcbe0ea7b29c255b1b9` FOREIGN KEY (`registradoPor`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
