-- =======================================================
-- Barril Choperia — seed de categorias, itens e config
-- Idempotente (on conflict do nothing).
-- =======================================================

-- ----- Categorias -----
insert into cardapio_categorias (slug, nome, descricao, ordem) values
  ('tabuas-1-sabor',   'Tábuas (1 sabor)',     'Acompanha fritas',                                         10),
  ('tabuas-mistinhas', 'Tábuas Mistinhas',     '2 sabores misturados (porção pequena)',                    20),
  ('tabua-mista',      'Tábua Mista',          '2 sabores combinados (porção média)',                      30),
  ('tabua-mistao-2',   'Tábua Mistão (2 sabores)', '2 sabores na porção grande',                           40),
  ('tabua-mistao-3',   'Tábua Mistão (3 sabores)', '3 sabores combinados',                                 50),
  ('tabua-mistao-4',   'Tábua Mistão (4 sabores)', 'Combinação completa, 4 sabores',                       60),
  ('petiscos',         'Petiscos',             'Pra acompanhar o chopp',                                   70),
  ('hamburguer',       'Linha Hambúrguer',     'Os clássicos do Barril',                                   80),
  ('espetinhos',       'Espetinhos',           'Na brasa, no capricho',                                    90),
  ('frios',            'Frios',                'Tábuas e porções de frios',                               100),
  ('chopp',            'Chopp',                'Mar.Beer, caneca e bastão',                               110),
  ('long-neck',        'Long Neck',            'Cervejas geladíssimas',                                   120),
  ('bebidas-sem-alcool', 'Bebidas s/ Álcool',  'Águas, refrigerantes, energéticos',                       130),
  ('sucos-taca',       'Sucos (taça)',         'Naturais, na taça',                                       140),
  ('sucos-jarra',      'Sucos (jarra)',        'Naturais, na jarra',                                      150),
  ('cachacas',         'Cachaças',             'Doses e garrafas',                                        160),
  ('drinks',           'Drinks',               'Caipirinhas, nevadas, doses',                             170),
  ('whisky',           'Whisky',               'Doses selecionadas',                                      180)
on conflict (slug) do nothing;

-- ----- Helper: garante que a inserção dos itens use o id da categoria pelo slug -----
-- Padrão repetido: select id from cardapio_categorias where slug = '...'

-- ----- Tábuas (1 sabor) -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='tabuas-1-sabor'), '41',  'Carne de Sol c/ Fritas',                99.99,  10),
  ((select id from cardapio_categorias where slug='tabuas-1-sabor'), '43',  'Frango c/ Fritas',                      79.90,  20),
  ((select id from cardapio_categorias where slug='tabuas-1-sabor'), '44',  'Filé c/ Fritas',                        99.99,  30),
  ((select id from cardapio_categorias where slug='tabuas-1-sabor'), '54',  '½ Carne de Sol c/ Fritas',              69.90,  40),
  ((select id from cardapio_categorias where slug='tabuas-1-sabor'), '55',  'Camarão Alho e Óleo c/ Fritas',        109.90,  50),
  ((select id from cardapio_categorias where slug='tabuas-1-sabor'), '88',  '½ Filé c/ Fritas',                      69.90,  60),
  ((select id from cardapio_categorias where slug='tabuas-1-sabor'), '111', '½ Camarão Alho e Óleo c/ Fritas',       69.90,  70),
  ((select id from cardapio_categorias where slug='tabuas-1-sabor'), '112', '½ Calabresa c/ Fritas',                 59.90,  80),
  ((select id from cardapio_categorias where slug='tabuas-1-sabor'), '113', '½ Frango c/ Fritas',                    59.90,  90)
on conflict do nothing;

-- ----- Tábuas Mistinhas (2 sabores, R$69,90) -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='tabuas-mistinhas'), '110',  'Camarão e Filé c/ Fritas',           69.90,  10),
  ((select id from cardapio_categorias where slug='tabuas-mistinhas'), '1101', 'Camarão e Carne de Sol c/ Fritas',   69.90,  20),
  ((select id from cardapio_categorias where slug='tabuas-mistinhas'), '1102', 'Carne de Sol e Filé c/ Fritas',      69.90,  30),
  ((select id from cardapio_categorias where slug='tabuas-mistinhas'), '1103', 'Camarão e Frango c/ Fritas',         69.90,  40),
  ((select id from cardapio_categorias where slug='tabuas-mistinhas'), '1104', 'Filé de Frango e Filé c/ Fritas',    69.90,  50),
  ((select id from cardapio_categorias where slug='tabuas-mistinhas'), '1105', 'Calabresa e Carne de Sol c/ Fritas', 69.90,  60),
  ((select id from cardapio_categorias where slug='tabuas-mistinhas'), '1106', 'Camarão e Calabresa c/ Fritas',      69.90,  70),
  ((select id from cardapio_categorias where slug='tabuas-mistinhas'), '1107', 'Sol e Frango c/ Fritas',             69.90,  80),
  ((select id from cardapio_categorias where slug='tabuas-mistinhas'), '1108', 'Filé e Calabresa c/ Fritas',         69.90,  90),
  ((select id from cardapio_categorias where slug='tabuas-mistinhas'), '1109', 'Frango e Calabresa c/ Fritas',       69.90, 100)
on conflict do nothing;

-- ----- Tábua Mista (2 sabores, R$109,99) -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='tabua-mista'), '114',  'Camarão e Filé c/ Fritas',                109.99,  10),
  ((select id from cardapio_categorias where slug='tabua-mista'), '1141', 'Camarão e Carne de Sol c/ Fritas',        109.99,  20),
  ((select id from cardapio_categorias where slug='tabua-mista'), '1142', 'Camarão e Filé de Frango c/ Fritas',      109.99,  30),
  ((select id from cardapio_categorias where slug='tabua-mista'), '1143', 'Camarão e Calabresa c/ Fritas',           109.99,  40),
  ((select id from cardapio_categorias where slug='tabua-mista'), '1144', 'Carne de Sol e Filé c/ Fritas',           109.99,  50),
  ((select id from cardapio_categorias where slug='tabua-mista'), '1145', 'Filé de Frango e Filé c/ Fritas',         109.99,  60),
  ((select id from cardapio_categorias where slug='tabua-mista'), '1146', 'Calabresa e Carne de Sol c/ Fritas',      109.99,  70),
  ((select id from cardapio_categorias where slug='tabua-mista'), '1147', 'Sol e Frango c/ Fritas',                  109.99,  80),
  ((select id from cardapio_categorias where slug='tabua-mista'), '1148', 'Filé e Calabresa c/ Fritas',              109.99,  90),
  ((select id from cardapio_categorias where slug='tabua-mista'), '1149', 'Frango e Calabresa c/ Fritas',            109.99, 100)
on conflict do nothing;

-- ----- Tábua Mistão (2 sabores, R$129,99) -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='tabua-mistao-2'), '104',  'Camarão e Filé c/ Fritas',             129.99,  10),
  ((select id from cardapio_categorias where slug='tabua-mistao-2'), '1041', 'Camarão e Carne de Sol c/ Fritas',     129.99,  20),
  ((select id from cardapio_categorias where slug='tabua-mistao-2'), '1042', 'Carne de Sol e Filé c/ Fritas',        129.99,  30),
  ((select id from cardapio_categorias where slug='tabua-mistao-2'), '1043', 'Camarão e Frango c/ Fritas',           129.99,  40),
  ((select id from cardapio_categorias where slug='tabua-mistao-2'), '1044', 'Filé de Frango e Filé c/ Fritas',      129.99,  50),
  ((select id from cardapio_categorias where slug='tabua-mistao-2'), '1045', 'Calabresa e Carne de Sol c/ Fritas',   129.99,  60),
  ((select id from cardapio_categorias where slug='tabua-mistao-2'), '1046', 'Camarão e Calabresa c/ Fritas',        129.99,  70),
  ((select id from cardapio_categorias where slug='tabua-mistao-2'), '77',   'Só Camarão c/ Fritas',                 129.99,  80),
  ((select id from cardapio_categorias where slug='tabua-mistao-2'), '1047', 'Sol e Frango c/ Fritas',               129.99,  90),
  ((select id from cardapio_categorias where slug='tabua-mistao-2'), '1048', 'Filé e Calabresa c/ Fritas',           129.99, 100),
  ((select id from cardapio_categorias where slug='tabua-mistao-2'), '1049', 'Frango e Calabresa c/ Fritas',         129.99, 110)
on conflict do nothing;

-- ----- Tábua Mistão (3 sabores, R$129,99) -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='tabua-mistao-3'), '115',  'Calabresa, Carne de Sol e Frango c/ Fritas',          129.99,  10),
  ((select id from cardapio_categorias where slug='tabua-mistao-3'), '1151', 'Filé, Carne de Sol e Filé de Frango c/ Fritas',       129.99,  20),
  ((select id from cardapio_categorias where slug='tabua-mistao-3'), '1152', 'Filé de Frango, Calabresa e Filé c/ Fritas',          129.99,  30),
  ((select id from cardapio_categorias where slug='tabua-mistao-3'), '1153', 'Camarão, Filé e Calabresa c/ Fritas',                 129.99,  40),
  ((select id from cardapio_categorias where slug='tabua-mistao-3'), '1154', 'Camarão, Carne de Sol e Filé c/ Fritas',              129.99,  50),
  ((select id from cardapio_categorias where slug='tabua-mistao-3'), '1155', 'Camarão, Carne de Sol e Frango c/ Fritas',            129.99,  60),
  ((select id from cardapio_categorias where slug='tabua-mistao-3'), '1156', 'Camarão, Calabresa e Filé de Frango c/ Fritas',       129.99,  70),
  ((select id from cardapio_categorias where slug='tabua-mistao-3'), '1157', 'Camarão e Calabresa c/ Fritas',                       129.99,  80),
  ((select id from cardapio_categorias where slug='tabua-mistao-3'), '1158', 'Camarão, Frango e Filé c/ Fritas',                    129.99,  90),
  ((select id from cardapio_categorias where slug='tabua-mistao-3'), '1159', 'Carne de Sol, Calabresa e Filé',                      129.99, 100)
on conflict do nothing;

-- ----- Tábua Mistão (4 sabores, R$149,99) -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem, destaque) values
  ((select id from cardapio_categorias where slug='tabua-mistao-4'), '47',  'Camarão, Calabresa, Filé Carne, Frango c/ Fritas',                149.99,  10, true),
  ((select id from cardapio_categorias where slug='tabua-mistao-4'), '100', 'Camarão, Filé Carne, Carne de Sol e Filé de Frango c/ Fritas',    149.99,  20, false),
  ((select id from cardapio_categorias where slug='tabua-mistao-4'), '46',  'Filé Carne, Carne de Sol, Filé Frango e Calabresa c/ Fritas',     149.99,  30, false)
on conflict do nothing;

-- ----- Petiscos -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='petiscos'), '62',  'Isca de Frango Empanado',          37.90,  10),
  ((select id from cardapio_categorias where slug='petiscos'), '64',  'Isca de Peixe Empanado',           39.90,  20),
  ((select id from cardapio_categorias where slug='petiscos'), '48',  'Tripa',                            22.90,  30),
  ((select id from cardapio_categorias where slug='petiscos'), '49',  'Batata',                           25.90,  40),
  ((select id from cardapio_categorias where slug='petiscos'), '45',  'Filé Acebolado',                   49.90,  50),
  ((select id from cardapio_categorias where slug='petiscos'), '50',  'Bolinhos de Bacalhau (10 unid.)',  28.90,  60),
  ((select id from cardapio_categorias where slug='petiscos'), '51',  'Bolinhos de Charque (10 unid.)',   28.90,  70),
  ((select id from cardapio_categorias where slug='petiscos'), '52',  'Ovos de Codorna (12 unid.)',       15.90,  80),
  ((select id from cardapio_categorias where slug='petiscos'), '53',  'Queijo Coalho Assado',             15.90,  90),
  ((select id from cardapio_categorias where slug='petiscos'), '56',  'Caldinho de Camarão',              14.90, 100),
  ((select id from cardapio_categorias where slug='petiscos'), '156', 'Caldinho de Camarão Pequeno',       8.90, 110),
  ((select id from cardapio_categorias where slug='petiscos'), '101', 'Camarão Alho e Óleo',              55.90, 120),
  ((select id from cardapio_categorias where slug='petiscos'), '116', '½ Camarão Alho e Óleo',            29.90, 130),
  ((select id from cardapio_categorias where slug='petiscos'), '103', 'Amendoim',                          2.99, 140),
  ((select id from cardapio_categorias where slug='petiscos'), '42',  'Carne de Sol Acebolada',           49.90, 150),
  ((select id from cardapio_categorias where slug='petiscos'), '70',  'Frango Acebolado',                 39.90, 160)
on conflict do nothing;

-- ----- Linha Hambúrguer -----
insert into cardapio_itens (categoria_id, codigo, nome, descricao, preco, ordem) values
  ((select id from cardapio_categorias where slug='hamburguer'), '65', 'Barril X-burguer',     'Pão Bola, Hambúrguer, Queijo e Salada',           10.99, 10),
  ((select id from cardapio_categorias where slug='hamburguer'), '66', 'Barril X-bacon',       'Pão Bola, Hambúrguer, Queijo, Bacon e Salada',    14.99, 20),
  ((select id from cardapio_categorias where slug='hamburguer'), '67', 'Barril X-burguer Egg', 'Pão Bola, Hambúrguer, Queijo, Ovo e Salada',      14.99, 30),
  ((select id from cardapio_categorias where slug='hamburguer'), '68', 'Barril X-calabresa',   'Pão Bola, Hambúrguer, Queijo, Calabresa e Salada', 14.99, 40)
on conflict do nothing;

-- ----- Espetinhos -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='espetinhos'), '57', 'Espetinho de Frango',           9.99, 10),
  ((select id from cardapio_categorias where slug='espetinhos'), '58', 'Espetinho de Coração',          9.99, 20),
  ((select id from cardapio_categorias where slug='espetinhos'), '59', 'Espetinho de Carne',           13.90, 30),
  ((select id from cardapio_categorias where slug='espetinhos'), '60', 'Espetinho de Camarão',         13.90, 40),
  ((select id from cardapio_categorias where slug='espetinhos'), '89', 'Espetinho de Frango c/ Bacon', 13.90, 50)
on conflict do nothing;

-- ----- Frios -----
insert into cardapio_itens (categoria_id, codigo, nome, descricao, preco, ordem) values
  ((select id from cardapio_categorias where slug='frios'), '118', 'Frios',                  'Queijo, Presunto e Azeitona',           19.90, 10),
  ((select id from cardapio_categorias where slug='frios'), '61',  'Tábua de Frios',         'Presunto, Queijo, Azeite e Salame',     39.90, 20),
  ((select id from cardapio_categorias where slug='frios'), '63',  'Azeitonas',              null,                                    11.90, 30),
  ((select id from cardapio_categorias where slug='frios'), '105', 'Porção de Salame',       null,                                    24.90, 40),
  ((select id from cardapio_categorias where slug='frios'), '999', 'Embalagem para Viagem',  null,                                     1.00, 50)
on conflict do nothing;

-- ----- Chopp -----
insert into cardapio_itens (categoria_id, codigo, nome, descricao, preco, ordem, destaque) values
  ((select id from cardapio_categorias where slug='chopp'), '01',  'Mar.Beer 2.500ml',     'Com bastão dentro', 54.90, 10, true),
  ((select id from cardapio_categorias where slug='chopp'), '02',  'Mar.Beer 3.500ml',     'Com bastão dentro', 69.90, 20, true),
  ((select id from cardapio_categorias where slug='chopp'), '123', 'Chopp 1 Litro',        'Com bastão dentro', 26.90, 30, false),
  ((select id from cardapio_categorias where slug='chopp'), '08',  'Caneca',               null,                12.90, 40, false),
  ((select id from cardapio_categorias where slug='chopp'), '07',  'Caneca / Vinho',       null,                13.90, 50, false)
on conflict do nothing;

-- ----- Long Neck -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='long-neck'), '10',  'Brahma / Itaipava Pilsen / Itaipava 100%',  7.99, 10),
  ((select id from cardapio_categorias where slug='long-neck'), '500', 'Heineken Zero',                            11.00, 20),
  ((select id from cardapio_categorias where slug='long-neck'), '600', 'Heineken',                                 13.99, 30),
  ((select id from cardapio_categorias where slug='long-neck'), '601', 'Stella Artois / Spaten',                   11.99, 40),
  ((select id from cardapio_categorias where slug='long-neck'), '602', 'Petra',                                     9.99, 50),
  ((select id from cardapio_categorias where slug='long-neck'), '603', 'Budweiser',                                11.99, 60),
  ((select id from cardapio_categorias where slug='long-neck'), '605', 'Corona',                                   13.99, 70),
  ((select id from cardapio_categorias where slug='long-neck'), '09',  'Malzbier',                                 10.99, 80),
  ((select id from cardapio_categorias where slug='long-neck'), '12',  'Cerveja Sem Álcool',                        9.99, 90)
on conflict do nothing;

-- ----- Bebidas s/ Álcool -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='bebidas-sem-alcool'), '13',  'Água Mineral',                 4.99,  10),
  ((select id from cardapio_categorias where slug='bebidas-sem-alcool'), '14',  'Refrigerante Lata',            7.99,  20),
  ((select id from cardapio_categorias where slug='bebidas-sem-alcool'), '16',  'Coca-Cola 500ml',              9.99,  30),
  ((select id from cardapio_categorias where slug='bebidas-sem-alcool'), '161', 'Refrigerante Litro',          13.99,  40),
  ((select id from cardapio_categorias where slug='bebidas-sem-alcool'), '17',  'Coco (copo)',                  6.99,  50),
  ((select id from cardapio_categorias where slug='bebidas-sem-alcool'), '18',  'Coco (jarra)',                18.90,  60),
  ((select id from cardapio_categorias where slug='bebidas-sem-alcool'), '133', 'Água Tônica',                  7.99,  70),
  ((select id from cardapio_categorias where slug='bebidas-sem-alcool'), '137', 'Aquarius Fresh / H2O',         9.99,  80),
  ((select id from cardapio_categorias where slug='bebidas-sem-alcool'), '138', 'TNT Energético',               9.99,  90),
  ((select id from cardapio_categorias where slug='bebidas-sem-alcool'), '128', 'Red Bull Energético',         14.99, 100)
on conflict do nothing;

-- ----- Sucos (taça) -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='sucos-taca'), '39',  'Limão',     8.99, 10),
  ((select id from cardapio_categorias where slug='sucos-taca'), '40',  'Laranja',   8.99, 20),
  ((select id from cardapio_categorias where slug='sucos-taca'), '401', 'Maracujá',  8.99, 30),
  ((select id from cardapio_categorias where slug='sucos-taca'), '405', 'Cajú',      8.99, 40),
  ((select id from cardapio_categorias where slug='sucos-taca'), '402', 'Acerola',   8.99, 50),
  ((select id from cardapio_categorias where slug='sucos-taca'), '403', 'Cajá',      8.99, 60),
  ((select id from cardapio_categorias where slug='sucos-taca'), '404', 'Graviola',  8.99, 70),
  ((select id from cardapio_categorias where slug='sucos-taca'), '406', 'Goiaba',    8.99, 80)
on conflict do nothing;

-- ----- Sucos (jarra) — todos R$ 24,90 -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='sucos-jarra'), '390', 'Limão',     24.90, 10),
  ((select id from cardapio_categorias where slug='sucos-jarra'), '126', 'Laranja',   24.90, 20),
  ((select id from cardapio_categorias where slug='sucos-jarra'), '391', 'Maracujá',  24.90, 30),
  ((select id from cardapio_categorias where slug='sucos-jarra'), '392', 'Acerola',   24.90, 40),
  ((select id from cardapio_categorias where slug='sucos-jarra'), '393', 'Cajá',      24.90, 50),
  ((select id from cardapio_categorias where slug='sucos-jarra'), '394', 'Graviola',  24.90, 60)
on conflict do nothing;

-- ----- Cachaças -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='cachacas'), '32',  'Serra Limpa / Volúpia',  6.99, 10),
  ((select id from cardapio_categorias where slug='cachacas'), '700', 'São Paulo Cristal',       4.99, 20),
  ((select id from cardapio_categorias where slug='cachacas'), '80',  'Triunfo',                 4.99, 30),
  ((select id from cardapio_categorias where slug='cachacas'), '108', 'São Paulo',               4.99, 40),
  ((select id from cardapio_categorias where slug='cachacas'), '130', 'Rainha / Matuta',         6.49, 50),
  ((select id from cardapio_categorias where slug='cachacas'), '132', 'Triunfo Garrafa',        24.90, 60),
  ((select id from cardapio_categorias where slug='cachacas'), '701', 'São Paulo Garrafa',      24.90, 70),
  ((select id from cardapio_categorias where slug='cachacas'), '703', 'Matuta Garrafa',         26.90, 80)
on conflict do nothing;

-- ----- Drinks (Bebidas Quentes / Drinks) -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='drinks'), '139', 'Nevada de Morango',                          19.99,  10),
  ((select id from cardapio_categorias where slug='drinks'), '04',  'Nevada de Kiwi',                             19.99,  20),
  ((select id from cardapio_categorias where slug='drinks'), '131', 'Nevada de Limão',                            15.90,  30),
  ((select id from cardapio_categorias where slug='drinks'), '33',  'Caipifruta de Morango',                      19.90,  40),
  ((select id from cardapio_categorias where slug='drinks'), '499', 'Caipifruta de Kiwi',                         19.90,  50),
  ((select id from cardapio_categorias where slug='drinks'), '140', 'Caipirinha',                                 13.90,  60),
  ((select id from cardapio_categorias where slug='drinks'), '141', 'Caipiroska Orloff',                          14.90,  70),
  ((select id from cardapio_categorias where slug='drinks'), '20',  'Martini',                                     6.99,  80),
  ((select id from cardapio_categorias where slug='drinks'), '21',  'Ron Montilla',                                6.99,  90),
  ((select id from cardapio_categorias where slug='drinks'), '22',  'Ron Bacardi',                                 7.99, 100),
  ((select id from cardapio_categorias where slug='drinks'), '23',  'Ron Limon / Big Apple',                       8.99, 110),
  ((select id from cardapio_categorias where slug='drinks'), '24',  'Domecq',                                      7.99, 120),
  ((select id from cardapio_categorias where slug='drinks'), '25',  'Campari',                                     9.99, 130),
  ((select id from cardapio_categorias where slug='drinks'), '26',  'Orloff',                                      8.99, 140),
  ((select id from cardapio_categorias where slug='drinks'), '34',  'Vinho da Casa',                              10.99, 150),
  ((select id from cardapio_categorias where slug='drinks'), '35',  'Gin',                                         9.99, 160),
  ((select id from cardapio_categorias where slug='drinks'), '78',  'Vodka Smirnoff',                              9.99, 170),
  ((select id from cardapio_categorias where slug='drinks'), '79',  'Smirnoff Ice / Ice Cabaré',                  13.90, 180),
  ((select id from cardapio_categorias where slug='drinks'), '134', 'Vinho Quinta do Morgado',                    29.90, 190),
  ((select id from cardapio_categorias where slug='drinks'), '129', 'Dreher',                                      6.99, 200),
  ((select id from cardapio_categorias where slug='drinks'), '135', 'Tequila',                                    16.90, 210),
  ((select id from cardapio_categorias where slug='drinks'), '136', 'Conhaque de Alcatrão',                        6.99, 220),
  ((select id from cardapio_categorias where slug='drinks'), '142', 'Fogo Paulista',                               8.99, 230),
  ((select id from cardapio_categorias where slug='drinks'), '202', 'Amarula',                                    18.90, 240),
  ((select id from cardapio_categorias where slug='drinks'), '203', 'Cointreau / Tanqueray',                      17.90, 250),
  ((select id from cardapio_categorias where slug='drinks'), '207', 'Vinho Garrafa (Reservado / Santa Helena)',   51.90, 260)
on conflict do nothing;

-- ----- Whisky -----
insert into cardapio_itens (categoria_id, codigo, nome, preco, ordem) values
  ((select id from cardapio_categorias where slug='whisky'), '27',  'Old Eight',                              8.99, 10),
  ((select id from cardapio_categorias where slug='whisky'), '29',  'Johnnie Walker Red',                    14.90, 20),
  ((select id from cardapio_categorias where slug='whisky'), '30',  'White Horse',                           12.90, 30),
  ((select id from cardapio_categorias where slug='whisky'), '99',  'Old Parr',                              17.90, 40),
  ((select id from cardapio_categorias where slug='whisky'), '124', 'Johnnie Walker Black / Jack Daniel''s', 17.90, 50),
  ((select id from cardapio_categorias where slug='whisky'), '125', 'Black White',                            9.99, 60)
on conflict do nothing;

-- =======================================================
-- Configurações iniciais do site
-- =======================================================
insert into config_site (chave, valor, tipo) values
  ('hero_headline',          'Chopp estupidamente gelado, tábuas de carne, no coração dos Bancários',                       'string'),
  ('hero_subheadline',       'No Shopping Sul, em João Pessoa — sem cobrar os 10% de taxa de serviço',                      'string'),
  ('hero_badge',             'Não cobramos os 10%',                                                                          'string'),
  ('historia_titulo',        'A casa do chopp gelado',                                                                       'string'),
  ('historia_paragrafos',    'O Barril Choperia nasceu da paixão do Edson Vieira por oferecer um boteco autêntico, onde o chopp é servido estupidamente gelado e as tábuas de carne saem do fogo direto pra mesa.

Localizado no coração dos Bancários, no Shopping Sul de João Pessoa, é uma das casas mais antigas e queridas do shopping — sempre priorizando qualidade e atendimento honesto.

Aqui você encontra um ambiente acolhedor, sem firulas: apenas o prazer de uma boa conversa acompanhada de um chopp perfeito.', 'text'),
  ('historia_video_url',     'https://www.instagram.com/reel/DUYQvCUjivo/embed',                                             'url'),
  ('endereco',               'Av. Bancário Sérgio Guerra, 900 — Bancários, João Pessoa/PB, CEP 58051-255 (Shopping Sul)',  'string'),
  ('horario_funcionamento',  'Segunda a Quinta: 10h às 21h
Sexta a Domingo e feriados: 11h às 22h',                                                                                    'text'),
  ('telefone',               '(83) 3255-0101',                                                                               'string'),
  ('telefone_link',          '+558332550101',                                                                                'string'),
  ('whatsapp',               '(83) 99646-2621',                                                                              'string'),
  ('whatsapp_link',          '5583996462621',                                                                                'string'),
  ('instagram_url',          'https://instagram.com/barrilchopperia',                                                        'url'),
  ('instagram_handle',       '@barrilchopperia',                                                                             'string'),
  ('mapa_embed_url',         'https://www.google.com/maps?q=Shopping+Sul+Bancarios+Joao+Pessoa&output=embed',                'url'),
  ('google_maps_url',        'https://www.google.com/maps/search/?api=1&query=Shopping+Sul+Bancarios+Joao+Pessoa',           'url')
on conflict (chave) do nothing;
