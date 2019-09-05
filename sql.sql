-- Criação
CREATE TABLE Pacote (
                idPacote INT AUTO_INCREMENT NOT NULL,
                nome VARCHAR(64) NOT NULL,
                preco INT NOT NULL,
                estilo VARCHAR(16) NOT NULL,
                categoria VARCHAR(16) NOT NULL,
                PRIMARY KEY (idPacote)
);

CREATE TABLE Movel (
                idMovel INT AUTO_INCREMENT NOT NULL,
                nome VARCHAR(64) NOT NULL,
                preco INT NOT NULL,
                estilo VARCHAR(16) NOT NULL,
                categoria VARCHAR(16) NOT NULL,
                qualidade INT NOT NULL,
                subcategoria VARCHAR(17) NOT NULL,
                PRIMARY KEY (idMovel)
);

CREATE TABLE MovelPacote (
                idMovel INT NOT NULL,
                idPacote INT NOT NULL,
                quantidade INT NOT NULL,
                PRIMARY KEY (idMovel, idPacote)
);

CREATE TABLE Usuario (
                idUsuario INT AUTO_INCREMENT NOT NULL,
                conta VARCHAR(32) NOT NULL,
                senha VARCHAR(32) NOT NULL,
                nickname VARCHAR(32) NOT NULL,
                email VARCHAR(127) NOT NULL,
                PRIMARY KEY (idUsuario)
);

CREATE TABLE Venda (
                idVenda INT AUTO_INCREMENT NOT NULL,
                data DATE NOT NULL,
                idUsuario INT NOT NULL,
                PRIMARY KEY (idVenda)
);

CREATE TABLE PacoteVenda (
                idVenda INT NOT NULL,
                idPacote INT NOT NULL,
                quantidade INT NOT NULL,
                PRIMARY KEY (idVenda, idPacote)
);

CREATE TABLE MovelVenda (
                idVenda INT NOT NULL,
                idMovel INT NOT NULL,
                quantidade INT NOT NULL,
                PRIMARY KEY (idVenda, idMovel)
);

ALTER TABLE PacoteVenda ADD CONSTRAINT pacote_pacotesvenda_fk
FOREIGN KEY (idPacote)
REFERENCES Pacote (idPacote)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE MovelPacote ADD CONSTRAINT pacote_movelpacote_fk
FOREIGN KEY (idPacote)
REFERENCES Pacote (idPacote)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE MovelPacote ADD CONSTRAINT movel_movelpacote_fk
FOREIGN KEY (idMovel)
REFERENCES Movel (idMovel)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE MovelVenda ADD CONSTRAINT movel_movelvenda_fk
FOREIGN KEY (idMovel)
REFERENCES Movel (idMovel)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE Venda ADD CONSTRAINT usuario_venda_fk
FOREIGN KEY (idUsuario)
REFERENCES Usuario (idUsuario)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE MovelVenda ADD CONSTRAINT venda_moveisvenda_fk
FOREIGN KEY (idVenda)
REFERENCES Venda (idVenda)
ON DELETE NO ACTION
ON UPDATE NO ACTION;

ALTER TABLE PacoteVenda ADD CONSTRAINT venda_pacotesvenda_fk
FOREIGN KEY (idVenda)
REFERENCES Venda (idVenda)
ON DELETE NO ACTION
ON UPDATE NO ACTION;


-- Dados Exemplo

INSERT INTO `usuario` (`idUsuario`, `conta`, `senha`, `nickname`, `email`)
VALUES (NULL, 'pwvendetta', '12345678', 'pwvendetta', 'vendetta@email.pw');


INSERT INTO `movel` (`idMovel`, `nome`, `preco`, `estilo`, `categoria`, `qualidade`, `subcategoria`)
VALUES (NULL, 'Alinor Bread Basket, Wrought Iron', '2000', 'Alinor', 'Hearth', '3', 'Baskets and Bags');

INSERT INTO `movel` (`idMovel`, `nome`, `preco`, `estilo`, `categoria`, `qualidade`, `subcategoria`)
VALUES (NULL, 'Bread, Braided', '2000', 'Common', 'Hearth', '3', 'Breads and Desserts');

INSERT INTO `movel` (`idMovel`, `nome`, `preco`, `estilo`, `categoria`, `qualidade`, `subcategoria`)
VALUES (NULL, 'Bread, Hearty Loaves', '2000', 'Common', 'Hearth', '3', 'Breads and Desserts');

INSERT INTO `movel` (`idMovel`, `nome`, `preco`, `estilo`, `categoria`, `qualidade`, `subcategoria`)
VALUES (NULL, 'Hearty Bread', '2000', 'Common', 'Hearth', '3', 'Breads and Desserts');



INSERT INTO `pacote` (`idPacote`, `nome`, `preco`, `estilo`, `categoria`)
VALUES (NULL, 'Simple Bread Basket', '10000', 'Common', 'Hearth');


INSERT INTO `movelpacote` (`idMovel`, `idPacote`, `quantidade`) VALUES
(1, 1, 1),
(2, 1, 2),
(4, 1, 1);


INSERT INTO `venda` (`idVenda`, `data`, `idUsuario`) VALUES (NULL, '2019-08-06', '1'), (NULL, '2019-08-06', '1');


INSERT INTO `pacotevenda` (`idVenda`, `idPacote`, `quantidade`) VALUES ('1', '1', '1');
INSERT INTO `movelvenda` (`idVenda`, `idMovel`, `quantidade`) VALUES ('2', '3', '2');


ALTER TABLE `movel` ADD `imagem` VARCHAR(9999) NOT NULL AFTER `subcategoria`;


UPDATE `movel` SET `Imagem` = 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2018/05/High-Elf-Bread-Basket-Wrought-Iron.jpg' WHERE `movel`.`idMovel` = 1;
UPDATE `movel` SET `Imagem` = 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2017/02/Bread-Braided.jpg' WHERE `movel`.`idMovel` = 2;
UPDATE `movel` SET `Imagem` = 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2017/02/Bread-Hearty-Loaf.jpg' WHERE `movel`.`idMovel` = 3;
UPDATE `movel` SET `Imagem` = 'https://eso.mmo-fashion.com/wp-content/uploads/sites/2/2017/02/Hearty-Bread.jpg' WHERE `movel`.`idMovel` = 4;

