-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 23-Set-2019 às 14:56
-- Versão do servidor: 10.1.40-MariaDB
-- versão do PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `furns`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `movel`
--

CREATE TABLE `movel` (
  `idMovel` int(11) NOT NULL,
  `nome` varchar(64) NOT NULL,
  `preco` int(11) NOT NULL,
  `estilo` varchar(16) NOT NULL,
  `categoria` varchar(16) NOT NULL,
  `qualidade` int(11) NOT NULL,
  `subcategoria` varchar(19) NOT NULL,
  `imagem` varchar(1023) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `movel`
--

INSERT INTO `movel` (`idMovel`, `nome`, `preco`, `estilo`, `categoria`, `qualidade`, `subcategoria`, `imagem`) VALUES
(1, 'Alinor Bread Basket, Wrought Iron', 2000, 'Alinor', 'Hearth', 1, 'Baskets and Bags', 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2018/05/High-Elf-Bread-Basket-Wrought-Iron.jpg'),
(12, 'Alinor Bed, Overhang Full', 5000, '	Alinor	', 'Suite', 4, '', 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2018/05/High-Elf-Bed-Overhang-Full.jpg'),
(13, 'Breton Throne', 30000, '	Breton	', 'Gallery', 5, '', 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2017/02/Breton-Throne.jpg'),
(16, 'Alinor Meal, Individual', 5600, '	Alinor	', 'Hearth', 2, '', 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2018/05/High-Elf-Meal-Individual.jpg'),
(17, 'Dark Elf Wardrobe, Scaled', 3000, '	Dark Elf	', 'Suite', 3, '', 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2017/02/Dark-Elf-Wardrobe-Scaled.jpg'),
(19, 'Rough Platform, Stage', 300, '	Common	', 'Miscellaneous', 1, '', 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2017/01/Rough-Platform-Stage.jpg'),
(21, 'Argonian Basket, Serving', 1000, '	Argonian	', '', 2, '', 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2017/02/Argonian-Basket-Serving.jpg'),
(23, 'Argonian Curtain of the Nest', 10000, '	Daedric	', 'Library', 3, '', 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2017/01/Argonian-Curtain-of-the-Nest.jpg');

-- --------------------------------------------------------

--
-- Estrutura da tabela `movelvenda`
--

CREATE TABLE `movelvenda` (
  `idVenda` int(11) NOT NULL,
  `idMovel` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pacote`
--

CREATE TABLE `pacote` (
  `idPacote` int(11) NOT NULL,
  `nome` varchar(64) NOT NULL,
  `preco` int(11) NOT NULL,
  `estilo` varchar(16) NOT NULL,
  `categoria` varchar(16) NOT NULL,
  `imagem` varchar(1023) NOT NULL,
  `conteudo` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pacotevenda`
--

CREATE TABLE `pacotevenda` (
  `idVenda` int(11) NOT NULL,
  `idPacote` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `conta` varchar(32) NOT NULL,
  `senha` varchar(32) NOT NULL,
  `nickname` varchar(32) NOT NULL,
  `email` varchar(127) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `conta`, `senha`, `nickname`, `email`) VALUES
(1, 'pwvendetta', '12345678', 'pwvendetta', 'vendetta@email.pw');

-- --------------------------------------------------------

--
-- Estrutura da tabela `venda`
--

CREATE TABLE `venda` (
  `idVenda` int(11) NOT NULL,
  `data` date NOT NULL,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movel`
--
ALTER TABLE `movel`
  ADD PRIMARY KEY (`idMovel`);

--
-- Indexes for table `movelvenda`
--
ALTER TABLE `movelvenda`
  ADD PRIMARY KEY (`idVenda`,`idMovel`),
  ADD KEY `movel_movelvenda_fk` (`idMovel`);

--
-- Indexes for table `pacote`
--
ALTER TABLE `pacote`
  ADD PRIMARY KEY (`idPacote`);

--
-- Indexes for table `pacotevenda`
--
ALTER TABLE `pacotevenda`
  ADD PRIMARY KEY (`idVenda`,`idPacote`),
  ADD KEY `pacote_pacotesvenda_fk` (`idPacote`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- Indexes for table `venda`
--
ALTER TABLE `venda`
  ADD PRIMARY KEY (`idVenda`),
  ADD KEY `usuario_venda_fk` (`idUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movel`
--
ALTER TABLE `movel`
  MODIFY `idMovel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `pacote`
--
ALTER TABLE `pacote`
  MODIFY `idPacote` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `venda`
--
ALTER TABLE `venda`
  MODIFY `idVenda` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `movelvenda`
--
ALTER TABLE `movelvenda`
  ADD CONSTRAINT `movel_movelvenda_fk` FOREIGN KEY (`idMovel`) REFERENCES `movel` (`idMovel`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `venda_moveisvenda_fk` FOREIGN KEY (`idVenda`) REFERENCES `venda` (`idVenda`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `pacotevenda`
--
ALTER TABLE `pacotevenda`
  ADD CONSTRAINT `pacote_pacotesvenda_fk` FOREIGN KEY (`idPacote`) REFERENCES `pacote` (`idPacote`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `venda_pacotesvenda_fk` FOREIGN KEY (`idVenda`) REFERENCES `venda` (`idVenda`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `venda`
--
ALTER TABLE `venda`
  ADD CONSTRAINT `usuario_venda_fk` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
