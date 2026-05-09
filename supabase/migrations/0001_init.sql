-- =======================================================
-- Barril Choperia — schema inicial
-- Rodar este arquivo no SQL Editor do Supabase, na ordem.
-- =======================================================

-- ----- Categorias do cardápio -----
create table if not exists cardapio_categorias (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  slug text not null unique,
  descricao text,
  ordem int not null default 0,
  ativo boolean not null default true,
  banner_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ----- Itens do cardápio -----
create table if not exists cardapio_itens (
  id uuid primary key default gen_random_uuid(),
  categoria_id uuid not null references cardapio_categorias(id) on delete cascade,
  codigo text,
  nome text not null,
  descricao text,
  preco numeric(10,2) not null check (preco >= 0),
  foto_url text,
  ordem int not null default 0,
  ativo boolean not null default true,
  destaque boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_itens_categoria on cardapio_itens(categoria_id);
create index if not exists idx_itens_ativo on cardapio_itens(ativo) where ativo = true;
create index if not exists idx_itens_ordem on cardapio_itens(categoria_id, ordem);

-- ----- Galeria de fotos -----
create table if not exists galeria_fotos (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  legenda text,
  ordem int not null default 0,
  ativo boolean not null default true,
  created_at timestamptz not null default now()
);

-- ----- Configurações chave-valor -----
create table if not exists config_site (
  chave text primary key,
  valor text not null,
  tipo text not null default 'string', -- 'string' | 'text' | 'url' | 'json'
  updated_at timestamptz not null default now()
);

-- ----- Trigger de updated_at -----
create or replace function trg_set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists tr_categorias_updated on cardapio_categorias;
create trigger tr_categorias_updated before update on cardapio_categorias
  for each row execute function trg_set_updated_at();

drop trigger if exists tr_itens_updated on cardapio_itens;
create trigger tr_itens_updated before update on cardapio_itens
  for each row execute function trg_set_updated_at();

drop trigger if exists tr_config_updated on config_site;
create trigger tr_config_updated before update on config_site
  for each row execute function trg_set_updated_at();

-- =======================================================
-- Row Level Security
-- =======================================================
alter table cardapio_categorias enable row level security;
alter table cardapio_itens enable row level security;
alter table galeria_fotos enable row level security;
alter table config_site enable row level security;

-- Leitura pública (anon + authenticated)
drop policy if exists "categorias_read_public" on cardapio_categorias;
create policy "categorias_read_public" on cardapio_categorias
  for select using (true);

drop policy if exists "itens_read_public" on cardapio_itens;
create policy "itens_read_public" on cardapio_itens
  for select using (true);

drop policy if exists "galeria_read_public" on galeria_fotos;
create policy "galeria_read_public" on galeria_fotos
  for select using (true);

drop policy if exists "config_read_public" on config_site;
create policy "config_read_public" on config_site
  for select using (true);

-- Escrita apenas autenticado
drop policy if exists "categorias_write_auth" on cardapio_categorias;
create policy "categorias_write_auth" on cardapio_categorias
  for all to authenticated using (true) with check (true);

drop policy if exists "itens_write_auth" on cardapio_itens;
create policy "itens_write_auth" on cardapio_itens
  for all to authenticated using (true) with check (true);

drop policy if exists "galeria_write_auth" on galeria_fotos;
create policy "galeria_write_auth" on galeria_fotos
  for all to authenticated using (true) with check (true);

drop policy if exists "config_write_auth" on config_site;
create policy "config_write_auth" on config_site
  for all to authenticated using (true) with check (true);

-- =======================================================
-- Storage: buckets públicos para galeria e fotos do cardápio
-- (criar via dashboard se preferir; este SQL roda só se as
-- tabelas de storage permitirem insert direto.)
-- =======================================================
insert into storage.buckets (id, name, public)
values
  ('galeria', 'galeria', true),
  ('cardapio', 'cardapio', true)
on conflict (id) do nothing;

-- Acesso de leitura público nos buckets
drop policy if exists "storage_read_public" on storage.objects;
create policy "storage_read_public" on storage.objects
  for select using (bucket_id in ('galeria', 'cardapio'));

-- Upload/edit/delete só authenticated
drop policy if exists "storage_write_auth" on storage.objects;
create policy "storage_write_auth" on storage.objects
  for all to authenticated
  using (bucket_id in ('galeria', 'cardapio'))
  with check (bucket_id in ('galeria', 'cardapio'));
