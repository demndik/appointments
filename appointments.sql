-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июл 17 2017 г., 12:12
-- Версия сервера: 5.5.53
-- Версия PHP: 7.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `appointments`
--
CREATE DATABASE IF NOT EXISTS `appointments` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `appointments`;

-- --------------------------------------------------------

--
-- Структура таблицы `appointments`
--

DROP TABLE IF EXISTS `appointments`;
CREATE TABLE `appointments` (
  `id` int(11) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `person_id` int(11) UNSIGNED NOT NULL,
  `status` tinyint(2) UNSIGNED NOT NULL,
  `result` text NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `appointments`
--

INSERT INTO `appointments` (`id`, `date`, `time`, `person_id`, `status`, `result`) VALUES
(1, '2017-06-30', '12:23:39', 1, 0, ''),
(2, '2017-12-25', '10:00:39', 2, 0, ''),
(3, '2017-10-11', '15:45:39', 1, 0, '');

-- --------------------------------------------------------

--
-- Структура таблицы `companies`
--

DROP TABLE IF EXISTS `companies`;
CREATE TABLE `companies` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `locality` varchar(100) NOT NULL,
  `street` varchar(30) NOT NULL,
  `house` varchar(10) NOT NULL,
  `postal` varchar(15) NOT NULL,
  `site` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `companies`
--

INSERT INTO `companies` (`id`, `name`, `locality`, `street`, `house`, `postal`, `site`) VALUES
(1, 'Prige', 'Berlin', 'Ackerstraße', '3', '10405', 'google.com');

-- --------------------------------------------------------

--
-- Структура таблицы `companys`
--

DROP TABLE IF EXISTS `companys`;
CREATE TABLE `companys` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `locality` varchar(100) NOT NULL,
  `street` varchar(30) NOT NULL,
  `house` varchar(10) NOT NULL,
  `postal` varchar(15) NOT NULL,
  `site` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `salutation` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

--
-- Дамп данных таблицы `companys`
--

INSERT INTO `companys` (`id`, `name`, `fname`, `lname`, `locality`, `street`, `house`, `postal`, `site`, `phone`, `email`, `salutation`) VALUES
(1, 'AGro', 'Alien', 'Grohe', 'Berlin', 'Ackerstraße', '3', '10405', 'google.com', '45-673-32-344-857', 'alien@grohe.de', 'Hi!');

-- --------------------------------------------------------

--
-- Структура таблицы `persons`
--

DROP TABLE IF EXISTS `persons`;
CREATE TABLE `persons` (
  `id` int(11) UNSIGNED NOT NULL,
  `company_id` int(11) UNSIGNED NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `salutation` varchar(70) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `persons`
--

INSERT INTO `persons` (`id`, `company_id`, `fname`, `lname`, `phone`, `email`, `salutation`) VALUES
(1, 1, 'Alien', 'Grohe', '45-673-32-344-857', 'alien@grohe.de', 'Hi!'),
(2, 1, 'Mila', 'Muller', '55-346673-32-346-899', 'mila@google.de', 'Hallo, frau');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `companys`
--
ALTER TABLE `companys`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `persons`
--
ALTER TABLE `persons`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `companys`
--
ALTER TABLE `companys`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT для таблицы `persons`
--
ALTER TABLE `persons`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
