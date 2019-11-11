-- novo
-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 11-Nov-2019 às 11:55
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
-- Estrutura da tabela `mensagem`
--

CREATE TABLE `mensagem` (
  `idMensagem` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `assunto` varchar(63) NOT NULL,
  `conteudo` varchar(1023) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `mensagem`
--

INSERT INTO `mensagem` (`idMensagem`, `idUsuario`, `assunto`, `conteudo`) VALUES
(1, 1, 'Teste', 'TEstetesTEStsetuvdbfvk\r\ndsfnadghadf\r\nsadfaduygiuahrtmgfw\r\nghtrusigdfs,czÃ§xlbhdt\r\nrdsfvbgfjklpousryrsgdx\r\nghjyutzdfffcvjTEstetesTEStsetuvdbfvk\r\ndsfnadghadf\r\nsadfaduygiuahrtmgfw\r\nghtrusigdfs,czÃ§xlbhdt\r\nrdsfvbgfjklpousryrsgdx\r\nghjyutzdfffcvjTEstetesTEStsetuvdbfvk\r\ndsfnadghadf\r\nsadfaduygiuahrtmgfw\r\nghtrusigdfs,czÃ§xlbhdt\r\nrdsfvbgfjklpousryrsgdx\r\nghjyutzdfffcvjTEstetesTEStsetuvdbfvk\r\ndsfnadghadf\r\nsadfaduygiuahrtmgfw\r\nghtrusigdfs,czÃ§xlbhdt\r\nrdsfvbgfjklpousryrsgdx\r\nghjyutzdfffcvjTEstetesTEStsetuvdbfvk\r\ndsfnadghadf\r\nsadfaduygiuahrtmgfw\r\nghtrusigdfs,czÃ§xlbhdt\r\nrdsfvbgfjklpousryrsgdx\r\nghjyutzdfffcvjTEstetesTEStsetuvdbfvk\r\ndsfnadghadf\r\nsadfaduygiuahrtmgfw\r\nghtrusigdfs,czÃ§xlbhdt\r\nrdsfvbgfjklpousryrsgdx\r\nghjyutzdfffcvjTEstetesTEStsetuvdbfvk\r\ndsfnadghadf\r\nsadfaduygiuahrtmgfw\r\nghtrusigdfs,czÃ§xlbhdt\r\nrdsfvbgfjklpousryrsgdx\r\nghjyutzdfffcvjTEstetesTEStsetuvdbfvk\r\ndsfnadghadf\r\nsadfaduygiuahrtmgfw\r\nghtrusigdfs,czÃ§xlbhdt\r\nrdsfvbgfjklpousryrsgdx\r\nghjyutzdfffcvjTEstetesTEStsetuvdbfvk\r\ndsfnadghadf\r\nsadfaduygiuahrtmgfw\r\nghtru');

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
(267, 'Alinor Column, Heavy Timeworn', 0, 'Alinor', ' ', 2, ' ', NULL),
(268, 'Alinor Pedestal, Timeworn', 0, 'Alinor', ' ', 2, ' ', NULL),
(269, 'Alinor Post, Stone Wall', 0, 'Alinor', ' ', 2, ' ', NULL),
(270, 'Alinor Pot, Limestone', 0, 'Alinor', ' ', 2, ' ', NULL),
(271, 'Alinor Pot, Patterned', 0, 'Alinor', ' ', 2, ' ', NULL),
(272, 'Alinor Sconce, Candles', 0, 'Alinor', ' ', 2, ' ', NULL),
(273, 'Alinor Tapestry, Alinor Dawn', 0, 'Alinor', ' ', 3, ' ', NULL),
(274, 'Alinor Wall, Stone', 0, 'Alinor', ' ', 2, ' ', NULL),
(275, 'Alinor Wall, Stone Corner', 0, 'Alinor', ' ', 2, ' ', NULL),
(276, 'Alinor Wall, Stone Long', 0, 'Alinor', ' ', 2, ' ', NULL),
(277, 'Argonian Basket, Serving', 0, 'Argonian', ' ', 2, ' ', NULL),
(278, 'Argonian Bowl, Wooden', 0, 'Argonian', ' ', 2, ' ', NULL),
(279, 'Argonian Canopy, Reed', 0, 'Argonian', ' ', 2, ' ', NULL),
(280, 'Argonian Chair, Rough', 0, 'Argonian', ' ', 2, ' ', NULL),
(281, 'Argonian Chimney Stack', 0, 'Argonian', ' ', 2, ' ', NULL),
(282, 'Argonian Cup, Short', 0, 'Argonian', ' ', 2, ' ', NULL),
(283, 'Argonian Lattice, Rough', 0, 'Argonian', ' ', 2, ' ', NULL),
(284, 'Argonian Mug, Tooth', 0, 'Argonian', ' ', 2, ' ', NULL),
(285, 'Argonian Pan, Frying', 0, 'Argonian', ' ', 2, ' ', NULL),
(286, 'Argonian Post, Rough', 0, 'Argonian', ' ', 2, ' ', NULL),
(287, 'Argonian Rack, Sturdy', 0, 'Argonian', ' ', 2, ' ', NULL),
(288, 'Argonian Ramekin, Hardened', 0, 'Argonian', ' ', 2, ' ', NULL),
(289, 'Argonian Snakes on a Rope', 0, 'Argonian', ' ', 2, ' ', NULL),
(290, 'Argonian Trunk, Painted', 0, 'Argonian', ' ', 4, ' ', NULL),
(291, 'Bowl, Serving', 0, 'Common', ' ', 2, ' ', NULL),
(292, 'Breton Amphora, Ceramic', 0, 'Breton', ' ', 2, ' ', NULL),
(293, 'Breton Bed, Bunk', 0, 'Breton', ' ', 2, ' ', NULL),
(294, 'Breton Bed, Single', 0, 'Breton', ' ', 2, ' ', NULL),
(295, 'Breton Bench, Plain', 0, 'Breton', ' ', 2, ' ', NULL),
(296, 'Breton Bookcase, Tall', 0, 'Breton', ' ', 2, ' ', NULL),
(297, 'Breton Chair, Slatted', 0, 'Breton', ' ', 2, ' ', NULL),
(298, 'Breton Chair, Windowed', 0, 'Breton', ' ', 2, ' ', NULL),
(299, 'Breton Desk', 0, 'Breton', ' ', 2, ' ', NULL),
(300, 'Breton Dresser, Open', 0, 'Breton', ' ', 2, ' ', NULL),
(301, 'Breton Lightpost, Single', 0, 'Breton', ' ', 2, ' ', NULL),
(302, 'Breton Pew, Windowed', 0, 'Breton', ' ', 2, ' ', NULL),
(303, 'Breton Rack, Barrel', 0, 'Breton', ' ', 2, ' ', NULL),
(304, 'Breton Sconce, Sturdy Torch', 0, 'Breton', ' ', 2, ' ', NULL),
(305, 'Breton Shelves, Double', 0, 'Breton', ' ', 2, ' ', NULL),
(306, 'Breton Stall, Merchant', 0, 'Breton', ' ', 2, ' ', NULL),
(307, 'Breton Street Post, Plain', 0, 'Breton', ' ', 2, ' ', NULL),
(308, 'Breton Table, Kitchen', 0, 'Breton', ' ', 2, ' ', NULL),
(309, 'Breton Trestle, Sturdy', 0, 'Breton', ' ', 2, ' ', NULL),
(310, 'Cauldron, Covered', 0, 'Common', ' ', 3, ' ', NULL),
(311, 'Clockwork Barrel, Sealed', 0, 'Clockwork', ' ', 2, ' ', NULL),
(312, 'Clockwork Control Panel, Single', 0, 'Clockwork', ' ', 4, ' ', NULL),
(313, 'Clockwork Cup, Empty', 0, 'Clockwork', ' ', 2, ' ', NULL),
(314, 'Clockwork Stool, Practical', 0, 'Clockwork', ' ', 2, ' ', NULL),
(315, 'Clockwork Table, Octagonal', 0, 'Clockwork', ' ', 2, ' ', NULL),
(316, 'Common Basket, Closed', 0, 'Common', ' ', 2, ' ', NULL),
(317, 'Common Bowl of Soup, Display', 0, 'Common', ' ', 2, ' ', NULL),
(318, 'Common Cage, Hunting', 0, 'Common', ' ', 2, ' ', NULL),
(319, 'Common Candle, Set', 0, 'Common', ' ', 2, ' ', NULL),
(320, 'Common Cargo, Covered', 0, 'Common', ' ', 2, ' ', NULL),
(321, 'Common Cleaver, Cooking', 0, 'Common', ' ', 2, ' ', NULL),
(322, 'Common Counter, Island Stall', 0, 'Common', ' ', 2, ' ', NULL),
(323, 'Common Crate, Sealed', 0, 'Common', ' ', 2, ' ', NULL),
(324, 'Common Lantern, Hanging', 0, 'Common', ' ', 2, ' ', NULL),
(325, 'Common Pack, Satchel', 0, 'Common', ' ', 2, ' ', NULL),
(326, 'Common Plate, Setting', 0, 'Common', ' ', 2, ' ', NULL),
(327, 'Common Platter, Serving', 0, 'Common', ' ', 2, ' ', NULL),
(328, 'Common Post, Flag Pole', 0, 'Common', ' ', 2, ' ', NULL),
(329, 'Common Quill, Feather', 0, 'Common', ' ', 2, ' ', NULL),
(330, 'Common Skillet, Practical', 0, 'Common', ' ', 2, ' ', NULL),
(331, 'Common Trap, Hunting', 0, 'Common', ' ', 2, ' ', NULL),
(332, 'Common Trough', 0, 'Common', ' ', 2, ' ', NULL),
(333, 'Common Washtub, Empty', 0, 'Common', ' ', 2, ' ', NULL),
(334, 'Common Wheelbarrow, Barrel', 0, 'Common', ' ', 2, ' ', NULL),
(335, 'Common Wheelbarrow, Flat', 0, 'Common', ' ', 2, ' ', NULL),
(336, 'Common Wheelbarrow, Sided', 0, 'Common', ' ', 2, ' ', NULL),
(337, 'Daedric Base, Ashen', 0, 'Daedric', ' ', 4, ' ', NULL),
(338, 'Daedric Bench, Ashen', 0, 'Daedric', ' ', 3, ' ', NULL),
(339, 'Daedric Brazier, Standing', 0, 'Daedric', ' ', 4, ' ', NULL),
(340, 'Daedric Brazier, Table', 0, 'Daedric', ' ', 4, ' ', NULL),
(341, 'Daedric Chandelier, Ritual', 0, 'Daedric', ' ', 4, ' ', NULL),
(342, 'Daedric Pedestal, Ritual', 0, 'Daedric', ' ', 3, ' ', NULL),
(343, 'Daedric Platform, Ashen', 0, 'Daedric', ' ', 4, ' ', NULL),
(344, 'Daedric Urn, Ashen', 0, 'Daedric', ' ', 4, ' ', NULL),
(345, 'Dark Elf Armchair, Angled', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(346, 'Dark Elf Bed, Single', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(347, 'Dark Elf Candle, Claw Base', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(348, 'Dark Elf Carpet, Mottled', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(349, 'Dark Elf Carpet, Patterned', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(350, 'Dark Elf Cart, Merchant', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(351, 'Dark Elf Chest of Drawers', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(352, 'Dark Elf Lantern, Oil', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(353, 'Dark Elf Rack, Barrel', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(354, 'Dark Elf Runner, Bordered', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(355, 'Dark Elf Shelf, Wall', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(356, 'Dark Elf Streetpost, Banners', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(357, 'Dark Elf Table, Formal', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(358, 'Dark Elf Tapestry, Emblazoned', 0, 'Dark Elf', ' ', 2, ' ', NULL),
(359, 'Dres Bowl, Dinner', 0, 'Dres', ' ', 2, ' ', NULL),
(360, 'Dres Bowl, Serving', 0, 'Dres', ' ', 2, ' ', NULL),
(361, 'Dres Carpet, Chains', 0, 'Dres', ' ', 2, ' ', NULL),
(362, 'Dres Cup, Empty Mazte', 0, 'Dres', ' ', 2, ' ', NULL),
(363, 'Dres Lantern, Stationary', 0, 'Dres', ' ', 2, ' ', NULL),
(364, 'Dres Pot, Sauce', 0, 'Dres', ' ', 2, ' ', NULL),
(365, 'Dres Shelf, Block', 0, 'Dres', ' ', 2, ' ', NULL),
(366, 'Dwarven Cannister, Sealed', 0, 'Dwarven', ' ', 2, ' ', NULL),
(367, 'Dwarven Pipeline Cap, Sealed', 0, 'Dwarven', ' ', 2, ' ', NULL),
(368, 'Dwarven Pot, Sealed', 0, 'Dwarven', ' ', 2, ' ', NULL),
(369, 'Dwarven Urn, Sealed', 0, 'Dwarven', ' ', 2, ' ', NULL),
(370, 'Fabricant Shrubs, Beryl', 0, 'Fabricant', ' ', 2, ' ', NULL),
(371, 'High Elf Basin, Gilded', 0, 'High Elf', ' ', 2, ' ', NULL),
(372, 'High Elf Bed, Bunk', 0, 'High Elf', ' ', 2, ' ', NULL),
(373, 'High Elf Bed, Single', 0, 'High Elf', ' ', 2, ' ', NULL),
(374, 'High Elf Bench, Curved', 1100, 'High Elf', ' ', 2, ' ', NULL),
(375, 'High Elf Bookshelf, Verdant', 1100, 'High Elf', ' ', 2, ' ', NULL),
(376, 'High Elf Counter, Long Cabinet', 0, 'High Elf', ' ', 2, ' ', NULL),
(377, 'High Elf Cup, Gilded', 0, 'High Elf', ' ', 2, ' ', NULL),
(378, 'High Elf Desk, Sturdy', 0, 'High Elf', ' ', 2, ' ', NULL),
(379, 'High Elf Dresser, Sturdy', 0, 'High Elf', ' ', 2, ' ', NULL),
(380, 'High Elf End Table, Sturdy', 1200, 'High Elf', ' ', 2, ' ', NULL),
(381, 'High Elf End Table, Verdant', 0, 'High Elf', ' ', 3, ' ', NULL),
(382, 'High Elf Flask, Gilded', 0, 'High Elf', ' ', 2, ' ', NULL),
(383, 'High Elf Lamp, Oil', 0, 'High Elf', ' ', 3, ' ', NULL),
(384, 'High Elf Lamppost, Spiked', 0, 'High Elf', ' ', 3, ' ', NULL),
(385, 'High Elf Plate, Dinner', 0, 'High Elf', ' ', 2, ' ', NULL),
(386, 'High Elf Platter, Gilded', 0, 'High Elf', ' ', 3, ' ', NULL),
(387, 'High Elf Shelf, Long', 0, 'High Elf', ' ', 2, ' ', NULL),
(388, 'High Elf Stool, Curved', 1000, 'High Elf', ' ', 2, ' ', NULL),
(389, 'High Elf Table, Sturdy Formal', 0, 'High Elf', ' ', 2, ' ', NULL),
(390, 'High Elf Table, Sturdy Kitchen', 0, 'High Elf', ' ', 2, ' ', NULL),
(391, 'High Elf Tapestry, Rustic', 0, 'High Elf', ' ', 2, ' ', NULL),
(392, 'High Elf Tapestry, Water-Themed', 3200, 'High Elf', ' ', 3, ' ', NULL),
(393, 'High Elf Trestle, Sturdy', 0, 'High Elf', ' ', 2, ' ', NULL),
(394, 'High Elf Vase, Gilded', 3400, 'High Elf', ' ', 3, ' ', NULL),
(395, 'High Elf Wagon, Sturdy', 0, 'High Elf ', ' ', 2, ' ', NULL),
(396, 'Hlaalu Bed, Single', 0, 'Hlaalu', ' ', 2, ' ', NULL),
(397, 'Hlaalu Bookcase, Empty', 0, 'Hlaalu', ' ', 3, ' ', NULL),
(398, 'Hlaalu Dresser, Scroll Drawers', 0, 'Hlaalu', ' ', 3, ' ', NULL),
(399, 'Hlaalu Hanger, Mounted', 0, 'Hlaalu', ' ', 2, ' ', NULL),
(400, 'Hlaalu Stool, Polished', 0, 'Hlaalu', ' ', 2, ' ', NULL),
(401, 'Indoril Candelabra, Shrine', 0, 'Indoril', ' ', 3, ' ', NULL),
(402, 'Indoril Lightpost, Stone', 0, 'Indoril', ' ', 2, ' ', NULL),
(403, 'Indoril Shelf, Block', 0, 'Indoril', ' ', 2, ' ', NULL),
(404, 'Indoril Streetlight, Full Stone', 0, 'Indoril', ' ', 2, ' ', NULL),
(405, 'Indoril Streetlight, Stone', 0, 'Indoril', ' ', 2, ' ', NULL),
(406, 'Jester s Pavilion, Open', 0, 'Jester', ' ', 4, ' ', NULL),
(407, 'Kennel, Locked', 0, 'Common', ' ', 3, ' ', NULL),
(408, 'Khajiit Banner, Crescents', 0, 'Khajiit', ' ', 2, ' ', NULL),
(409, 'Khajiit Banner, Hooked', 0, 'Khajiit', ' ', 3, ' ', NULL),
(410, 'Khajiit Banner, Moons', 0, 'Khajiit', ' ', 2, ' ', NULL),
(411, 'Khajiit Bed, Fur', 0, 'Khajiit', ' ', 2, ' ', NULL),
(412, 'Khajiit Carpet, Crescent Moons', 0, 'Khajiit', ' ', 2, ' ', NULL),
(413, 'Khajiit Carpet, Sun', 0, 'Khajiit', ' ', 3, ' ', NULL),
(414, 'Khajiit Cushion, Long', 0, 'Khajiit', ' ', 3, ' ', NULL),
(415, 'Khajiit Desk, Faded', 0, 'Khajiit', ' ', 2, ' ', NULL),
(416, 'Khajiit Drapes, Tattered', 0, 'Khajiit', ' ', 2, ' ', NULL),
(417, 'Khajiit Dresser, Faded', 0, 'Khajiit', ' ', 2, ' ', NULL),
(418, 'Khajiit End Table, Faded', 0, 'Khajiit', ' ', 2, ' ', NULL),
(419, 'Khajiit Firepit, Brick', 0, 'Khajiit', ' ', 2, ' ', NULL),
(420, 'Khajiit Frame, Arched', 0, 'Khajiit', ' ', 2, ' ', NULL),
(421, 'Khajiit Loft, Reed', 0, 'Khajiit', ' ', 2, ' ', NULL),
(422, 'Khajiit Signpost, Fortified', 0, 'Khajiit', ' ', 2, ' ', NULL),
(423, 'Khajiit Stool, Crescent', 0, 'Khajiit', ' ', 2, ' ', NULL),
(424, 'Lettuce, Display', 0, 'Food', ' ', 2, ' ', NULL),
(425, 'Nord Bed, Single', 0, 'Nord', ' ', 2, ' ', NULL),
(426, 'Nord Candle, Tealight', 0, 'Nord', ' ', 2, ' ', NULL),
(427, 'Nord Candleholder, Cup', 0, 'Nord', ' ', 2, ' ', NULL),
(428, 'Nord Cart, Hay', 0, 'Nord', ' ', 2, ' ', NULL),
(429, 'Nord Chair, Braced', 0, 'Nord', ' ', 3, ' ', NULL),
(430, 'Nord Crockpot, Covered', 0, 'Nord', ' ', 3, ' ', NULL),
(431, 'Nord Footlocker, Braced', 0, 'Nord', ' ', 3, ' ', NULL),
(432, 'Nord Hutch, Rough', 0, 'Nord', ' ', 2, ' ', NULL),
(433, 'Nord Lantern, Hanging', 0, 'Nord', ' ', 3, ' ', NULL),
(434, 'Nord Nightstand, Rough', 0, 'Nord', ' ', 2, ' ', NULL),
(435, 'Nord Pot, Ceramic', 0, 'Nord', ' ', 2, ' ', NULL),
(436, 'Nord Shelf, Braced', 0, 'Nord', ' ', 2, ' ', NULL),
(437, 'Nord Shelf, Wall', 0, 'Nord', ' ', 2, ' ', NULL),
(438, 'Nord Stool, Rough', 0, 'Nord', ' ', 2, ' ', NULL),
(439, 'Nord Torch, Triple', 0, 'Nord', ' ', 2, ' ', NULL),
(440, 'Nord Trunk, Heavy', 0, 'Nord', ' ', 2, ' ', NULL),
(441, 'Nord Urn, Ceramic', 0, 'Nord', ' ', 2, ' ', NULL),
(442, 'Orcish Bar, Long Block', 0, 'Orcish', ' ', 2, ' ', NULL),
(443, 'Orcish Bar, Side', 0, 'Orcish', ' ', 2, ' ', NULL),
(444, 'Orcish Bedding, Fur', 0, 'Orcish', ' ', 2, ' ', NULL),
(445, 'Orcish Bench, Cabled', 0, 'Orcish', ' ', 2, ' ', NULL),
(446, 'Orcish Canister, Rugged', 0, 'Orcish', ' ', 2, ' ', NULL),
(447, 'Orcish Counter, Block', 0, 'Orcish', ' ', 2, ' ', NULL),
(448, 'Orcish Counter, Island Stall', 0, 'Orcish', ' ', 2, ' ', NULL),
(449, 'Orcish Lantern, Hooded', 0, 'Orcish', ' ', 2, ' ', NULL),
(450, 'Orcish Platform, Block', 0, 'Orcish', ' ', 2, ' ', NULL),
(451, 'Orcish Sack, Grain', 0, 'Orcish', ' ', 3, ' ', NULL),
(452, 'Orcish Shelter, Shingled', 0, 'Orcish', ' ', 3, ' ', NULL),
(453, 'Orcish Shelves, Braced', 0, 'Orcish', ' ', 2, ' ', NULL),
(454, 'Orcish Stool, Cabled', 0, 'Orcish', ' ', 2, ' ', NULL),
(455, 'Orcish Table, Braced Kitchen', 0, 'Orcish', ' ', 2, ' ', NULL),
(456, 'Orcish Trunk, Braced', 0, 'Orcish', ' ', 2, ' ', NULL),
(457, 'Pie Dish, Empty', 0, 'Common', ' ', 3, ' ', NULL),
(458, 'Redguard Armchair, Slatted', 0, 'Redguard', ' ', 2, ' ', NULL),
(459, 'Redguard Bar, Long Cabinet', 0, 'Redguard', ' ', 2, ' ', NULL),
(460, 'Redguard Bed, Full', 0, 'Redguard', ' ', 2, ' ', NULL),
(461, 'Redguard Bed, Wide', 0, 'Redguard', ' ', 2, ' ', NULL),
(462, 'Redguard Candelabra, Practical', 0, 'Redguard', ' ', 2, ' ', NULL),
(463, 'Redguard Caravan, Merchant', 4600, 'Redguard', ' ', 4, ' ', NULL),
(464, 'Redguard Carpet, Dunes', 0, 'Redguard', ' ', 3, ' ', NULL),
(465, 'Redguard Carriage, Practical', 0, 'Redguard', ' ', 2, ' ', NULL),
(466, 'Redguard Cart, Practical', 0, 'Redguard', ' ', 2, ' ', NULL),
(467, 'Redguard Chalice, Full', 0, 'Redguard', ' ', 2, ' ', NULL),
(468, 'Redguard Couch, Bolted', 0, 'Redguard', ' ', 2, ' ', NULL),
(469, 'Redguard Couch, Padded', 0, 'Redguard', ' ', 3, ' ', NULL),
(470, 'Redguard Cup, Full', 0, 'Redguard', ' ', 2, ' ', NULL),
(471, 'Redguard Curtain, Smoky', 0, 'Redguard', ' ', 2, ' ', NULL),
(472, 'Redguard Desk, Sturdy', 0, 'Redguard', ' ', 2, ' ', NULL),
(473, 'Redguard Divider, Florid', 0, 'Redguard', ' ', 3, ' ', NULL),
(474, 'Redguard Pot, Hanging Brushed', 0, 'Redguard', ' ', 2, ' ', NULL),
(475, 'Redguard Shelf, Sturdy', 0, 'Redguard', ' ', 2, ' ', NULL),
(476, 'Redguard Streetlamp, Single', 1600, 'Redguard', ' ', 2, ' ', NULL),
(477, 'Redguard Vessel, Lacquered', 1500, 'Redguard', ' ', 2, ' ', NULL),
(478, 'Redguard Wagon, Merchant', 0, 'Redguard', ' ', 2, ' ', NULL),
(479, 'Redguard Well, Covered', 3000, 'Redguard', ' ', 1, ' ', NULL),
(480, 'Redoran Bed, Single', 0, 'Redoran', ' ', 2, ' ', NULL),
(481, 'Redoran Bowl, Saltrice Mash', 0, 'Redoran', ' ', 3, ' ', NULL),
(482, 'Redoran Carpet, Volcanic Sands', 0, 'Redoran', ' ', 2, ' ', NULL),
(483, 'Rough Box, Boarded', 0, 'Common', ' ', 0, ' ', NULL),
(484, 'Rough Container, Cargo', 0, 'Common', ' ', 0, ' ', NULL),
(485, 'Rough Crate, Reinforced', 0, 'Common', ' ', 0, ' ', NULL),
(486, 'Rough Cup, Empty', 0, 'Common', ' ', 1, ' ', NULL),
(487, 'Rough Hatchet, Practical', 0, 'Common', ' ', 0, ' ', NULL),
(488, 'Rough Knife, Butcher', 0, 'Common', ' ', 1, ' ', NULL),
(489, 'Rough Platform, Stage', 0, 'Common', ' ', 0, ' ', NULL),
(490, 'Simple Blue Banner', 0, 'Common', ' ', 2, ' ', NULL),
(491, 'Wood Elf Bar, Drying', 0, 'Wood Elf', ' ', 2, ' ', NULL),
(492, 'Wood Elf Canopy, Leather', 0, 'Wood Elf', ' ', 2, ' ', NULL),
(493, 'Wood Elf Cask, Ceramic', 0, 'Wood Elf', ' ', 3, ' ', NULL),
(494, 'Wood Elf Cup, Ceramic', 0, 'Wood Elf', ' ', 2, ' ', NULL),
(495, 'Wood Elf Cup, Striped', 0, 'Wood Elf', ' ', 2, ' ', NULL),
(496, 'Wood Elf Divider, Taut', 0, 'Wood Elf', ' ', 3, ' ', NULL),
(497, 'Wood Elf Hammock, Single', 0, 'Wood Elf', ' ', 3, ' ', NULL),
(498, 'Wood Elf Pedestal, Engraved', 0, 'Wood Elf', ' ', 0, ' ', NULL),
(499, 'Wood Elf Pitcher, Painted', 0, 'Wood Elf', ' ', 3, ' ', NULL),
(500, 'Wood Elf Shelf, Tiered', 0, 'Wood Elf', ' ', 2, ' ', NULL),
(501, 'Wood Elf Stool, Leather', 0, 'Wood Elf', ' ', 2, ' ', NULL),
(502, 'Wood Elf Table, Leather', 0, 'Wood Elf', ' ', 2, ' ', NULL),
(503, 'Wood Elf Tent, Sturdy', 0, 'Wood Elf', ' ', 3, ' ', NULL),
(504, 'Wood Elf Totem, Skull', 0, 'Wood Elf', ' ', 4, ' ', NULL),
(505, 'Wood Elf Urn, Deer', 0, 'Wood Elf', ' ', 2, ' ', NULL),
(506, 'Wood Elf Vase, Swirled', 0, 'Wood Elf', ' ', 2, ' ', NULL),
(507, 'Wood Elf Wall Hide, Fur', 0, 'Wood Elf', ' ', 2, ' ', NULL),
(508, 'Wood Elf Wall Hide, Pierced', 0, 'Wood Elf', ' ', 2, ' ', NULL),
(509, 'Wood Elf Wall Hide, Spotted', 0, 'Wood Elf', ' ', 2, ' ', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `movelvenda`
--

CREATE TABLE `movelvenda` (
  `idVenda` int(11) NOT NULL,
  `idMovel` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `movelvenda`
--

INSERT INTO `movelvenda` (`idVenda`, `idMovel`, `quantidade`) VALUES
(1, 476, 2),
(1, 477, 2),
(1, 479, 1),
(2, 463, 1),
(2, 476, 2),
(2, 477, 2),
(2, 479, 1),
(3, 374, 1),
(3, 375, 1),
(3, 380, 1),
(3, 388, 1),
(3, 392, 1),
(3, 394, 1),
(4, 374, 1),
(4, 375, 1),
(4, 380, 1),
(4, 394, 1),
(4, 463, 1),
(5, 374, 1),
(5, 375, 1),
(5, 380, 1),
(5, 394, 1),
(5, 463, 1),
(6, 394, 1),
(6, 477, 1);

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

--
-- Extraindo dados da tabela `pacote`
--

INSERT INTO `pacote` (`idPacote`, `nome`, `preco`, `estilo`, `categoria`, `imagem`, `conteudo`) VALUES
(3, 'Breton Randoms 1', 10000, '', '', 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2017/01/Argonian-Curtain-of-the-Nest.jpg', 'soon'),
(4, 'ertdrg', 1234, '	Orcish	', 'Parlor', 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2017/01/Rough-Platform-Stage.jpg', 'sdvfcsjg\r\nsryhrtust\r\n'),
(6, 'asuf', 12436, '', '', 'http://localhost/phpmyadmin/themes/pmahomme/img/logo_left.png', '\r\nwqRYUL\r\nYTRECW'),
(7, 'Breton Randoms 2', 3254, '', '', 'https://esosslfiles-a.akamaihd.net/cms/2018/10/8ad202102a2e5f25662ac81ad68fce59.jpg', 'gtrjnhdsfd'),
(8, 'fkc', 12436, '', '', 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2018/05/High-Elf-Meal-Individual.jpg', 'kimiu\r\nrfcedecvbnmkukiye\r\nvtbynumiukyjntrfecdwBYN\r\nMIKJYHVGFECt');

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
(1, 'admin', 'admin', 'Administrator', 'admin@admin.adm');

-- --------------------------------------------------------

--
-- Estrutura da tabela `venda`
--

CREATE TABLE `venda` (
  `idVenda` int(11) NOT NULL,
  `data` date NOT NULL,
  `concluido` tinyint(1) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `valor` int(11) NOT NULL,
  `produto` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `venda`
--

INSERT INTO `venda` (`idVenda`, `data`, `concluido`, `idUsuario`, `valor`, `produto`) VALUES
(1, '2019-11-07', 1, 1, 0, 0),
(2, '2019-11-07', 1, 1, 0, 0),
(3, '2019-11-07', 1, 1, 0, 0),
(4, '2019-11-07', 0, 1, 0, 0),
(5, '2019-11-07', 0, 1, 0, 0),
(6, '2019-11-07', 0, 1, 4900, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mensagem`
--
ALTER TABLE `mensagem`
  ADD PRIMARY KEY (`idMensagem`),
  ADD KEY `idUsuario` (`idUsuario`);

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
-- AUTO_INCREMENT for table `mensagem`
--
ALTER TABLE `mensagem`
  MODIFY `idMensagem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `movel`
--
ALTER TABLE `movel`
  MODIFY `idMovel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=510;

--
-- AUTO_INCREMENT for table `pacote`
--
ALTER TABLE `pacote`
  MODIFY `idPacote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `venda`
--
ALTER TABLE `venda`
  MODIFY `idVenda` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Limitadores para a tabela `mensagem`
--
ALTER TABLE `mensagem`
  ADD CONSTRAINT `usuario_mensagem_fk` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
