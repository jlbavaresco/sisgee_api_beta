-- criação da tabela prédios
create table predios (
	codigo serial primary key, 
	nome varchar(40) not null, 
	descricao varchar(40) not null, 
	sigla varchar(4) not null 	
);

-- inserindo registros na tabela prédios
insert into predios (nome, descricao, sigla) 
values ('Predio 5', 'Predio da Computação', 'P5')
returning codigo, nome, descricao, sigla;


-- criação da tabela salas
create table salas (
	codigo serial primary key, 
	numero integer not null, 
	descricao varchar(40) not null, 
	capacidade integer not null, 
	predio integer not null, 
	foreign key (predio) references predios (codigo)
);

-- inserindo alguns registros na tabela salas
insert into salas (numero, descricao, capacidade, predio) 
values (511, 'Laboratório', 12, 1), (301, 'Sala de aula', 12, 1)
returning codigo, numero, descricao, capacidade, predio;

-- criação da tabela equipamentos
create table equipamentos (
	codigo serial primary key, 
	descricao varchar(40) not null, 
	numero_serie varchar(40) not null, 
	valor numeric(10,2) not null, 
	sala integer not null, 
	foreign key (sala) references salas (codigo)
);

-- inserindo alguns registros na tabela equipamentos
insert into equipamentos (descricao, numero_serie, valor, sala) 
values ('Computador', '123456', 2500.00, 1), ('Computador', '234567', 2500.00, 1);