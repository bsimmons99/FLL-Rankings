SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
CREATE DATABASE IF NOT EXISTS `rankings` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `rankings`;

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `rounds_practice` int(11) NOT NULL,
  `rounds_ranked` int(11) NOT NULL,
  `current_round` int(11) NOT NULL DEFAULT 1,
  `stage` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `score` (
  `id` int(11) NOT NULL,
  `event` int(11) NOT NULL,
  `submit_time` datetime NOT NULL DEFAULT current_timestamp(),
  `update_time` datetime NOT NULL DEFAULT current_timestamp(),
  `result` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`result`)),
  `score` int(11) NOT NULL,
  `team` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `round` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `event` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `affiliation` varchar(200) DEFAULT NULL,
  `pit` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `user` (
  `event` int(11) NOT NULL,
  `name` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `score`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event` (`event`),
  ADD KEY `team` (`team`),
  ADD KEY `user` (`user`) USING BTREE;

ALTER TABLE `team`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event` (`event`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event` (`event`);


ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `score`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `score`
  ADD CONSTRAINT `score_ibfk_1` FOREIGN KEY (`event`) REFERENCES `event` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `score_ibfk_2` FOREIGN KEY (`team`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `score_ibfk_3` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE `team`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`event`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`event`) REFERENCES `event` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
