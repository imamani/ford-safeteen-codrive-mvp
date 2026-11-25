-- ========================================================
-- FORD SAFETEEN CO-DRIVE - ESQUEMA DE BASE DE DATOS SUPABASE
-- APF3 - Diseño de Productos y Servicios (UTP Arequipa)
-- ========================================================

-- 1. Extensión para UUIDs
create extension if not exists "uuid-ossp";

-- 2. Tabla de Vehículos Vinculados (Ford Territory Titanium)
create table if not exists public.vehiculos (
    vin text primary key,
    modelo text not null default 'Ford Territory Titanium 1.5L EcoBoost (2026)',
    placa text default 'V8F-421 (Arequipa)',
    bateria_pct int default 84 check (bateria_pct between 0 and 100),
    estado_conexion text default 'online',
    creado_el timestamptz default now()
);

-- Habilitar RLS en Vehículos
alter table public.vehiculos enable row level security;

create policy "Lectura de vehículos para usuarios autenticados"
on public.vehiculos for select
to authenticated
using (true);

-- 3. Tabla de Perfiles de Usuario (Padres e Hijos con Roles RBAC)
create table if not exists public.perfiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text not null,
    nombre text not null,
    rol text not null check (rol in ('tutor', 'hijo')), -- 'tutor' (Ricardo) o 'hijo' (Tomás)
    vin text references public.vehiculos(vin),
    codigo_familia text not null,
    score_actual int default 94 check (score_actual between 0 and 100),
    creado_el timestamptz default now(),
    actualizado_el timestamptz default now()
);

-- Función auxiliar SECURITY DEFINER para obtener el código de familia sin provocar recursión infinita en RLS
create or replace function public.get_my_family_code()
returns text
language sql
stable
security definer set search_path = ''
as $$
    select codigo_familia from public.perfiles where id = auth.uid() limit 1;
$$;

-- Habilitar RLS en Perfiles
alter table public.perfiles enable row level security;

-- Política: Cada usuario puede leer su propio perfil y el de los miembros de su familia
create policy "Lectura de perfiles de la misma familia"
on public.perfiles for select
to authenticated
using (
    (select auth.uid()) = id
    or codigo_familia = public.get_my_family_code()
);

-- Política: Cada usuario puede actualizar su propio perfil
create policy "Actualización del propio perfil"
on public.perfiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- 4. Tabla de Viajes y Telemetría CAN del Conductor Joven
create table if not exists public.viajes_telemetria (
    id uuid primary key default gen_random_uuid(),
    usuario_id uuid not null references public.perfiles(id) on delete cascade,
    vin text not null references public.vehiculos(vin),
    score_viaje int default 94 check (score_viaje between 0 and 100),
    velocidad_max_kmh float default 52.0,
    frenado_suave_pct int default 96,
    control_carril_pct int default 92,
    origen text default 'Cerro Colorado',
    destino text default 'Campus UTP (Arequipa)',
    en_marcha boolean default false,
    palanca_cambios text default 'P' check (palanca_cambios in ('P', 'R', 'N', 'D', 'S')),
    arribo_confirmado boolean default true,
    creado_el timestamptz default now()
);

alter table public.viajes_telemetria enable row level security;

-- El tutor y el hijo de la misma familia pueden ver los viajes
create policy "Ver viajes telemáticos de la familia"
on public.viajes_telemetria for select
to authenticated
using (
    usuario_id = (select auth.uid())
    or usuario_id in (
        select p.id from public.perfiles p
        where p.codigo_familia = public.get_my_family_code()
    )
);

-- Solo el sistema o el conductor autenticado puede insertar telemetría
create policy "Insertar telemetría de viaje"
on public.viajes_telemetria for insert
to authenticated
with check (usuario_id = (select auth.uid()));

-- 5. Tabla del Contrato Digital Familiar (Pacto Tutor - Joven)
create table if not exists public.contrato_digital (
    id uuid primary key default gen_random_uuid(),
    codigo_familia text not null unique,
    tutor_id uuid references public.perfiles(id),
    hijo_id uuid references public.perfiles(id),
    score_meta int default 88 check (score_meta between 70 and 100),
    firmado boolean default true,
    permiso_fin_semana boolean default true,
    clausula text default 'Si Tomás mantiene un Score >= 88 pts, el sistema autoriza automáticamente la llave de la Ford Territory para el fin de semana sin discusiones.',
    actualizado_el timestamptz default now()
);

alter table public.contrato_digital enable row level security;

create policy "Ver contrato de la familia"
on public.contrato_digital for select
to authenticated
using (
    tutor_id = (select auth.uid()) or hijo_id = (select auth.uid())
);

-- Solo el tutor puede modificar la meta del contrato o el estado
create policy "Tutor puede actualizar contrato digital"
on public.contrato_digital for update
to authenticated
using (tutor_id = (select auth.uid()))
with check (tutor_id = (select auth.uid()));

-- 6. Trigger para crear perfil público cuando se registra un usuario en auth.users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
declare
    user_rol text;
    user_nombre text;
    user_cod_familia text;
    user_vin text;
begin
    user_rol := coalesce(new.raw_user_meta_data->>'rol', 'hijo');
    user_nombre := coalesce(new.raw_user_meta_data->>'nombre', 'Conductor');
    user_cod_familia := coalesce(new.raw_user_meta_data->>'codigo_familia', 'FAM-MORALES-2026');
    user_vin := coalesce(new.raw_user_meta_data->>'vin', 'WF0NXXGCDN123456');

    insert into public.perfiles (id, email, nombre, rol, vin, codigo_familia)
    values (new.id, new.email, user_nombre, user_rol, user_vin, user_cod_familia);

    return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Datos semilla del vehículo
insert into public.vehiculos (vin, modelo, placa, bateria_pct, estado_conexion)
values ('WF0NXXGCDN123456', 'Ford Territory Titanium 1.5L EcoBoost (2026)', 'V8F-421 (Arequipa)', 84, 'online')
on conflict (vin) do nothing;
