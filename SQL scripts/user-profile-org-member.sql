-- Create a table for public "profile"
create table profile (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  display_name text,
  bio text,
  avatar_url text,
  twitter_link text,
  discord_link text,

  eth_addr text unique,
  metadata json,


  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profile enable row level security;

create policy "Public profiles are viewable by everyone."
  on profile for select
  using ( true );

create policy "Users can insert their own profile."
  on profile for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profile for update
  using ( auth.uid() = id );

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table profile;

-- Set up Storage!
insert into storage.buckets (id, name)
values ('avatars', 'avatars');

create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );


-- Organsiations & DAOs

create table org (
  id uuid not null,
  owner_id uuid references auth.users not null, 
  updated_at timestamp with time zone,
  orgname text unique,
  display_name text,
  descr text,
  website_link text,
  twitter_link text,
  discord_link text,
  github_link text,
  source_link text,

  primary key (id),
  unique(orgname),
  constraint orgname_length check (char_length(orgname) >= 3)
);

alter table org enable row level security;

create policy "Org can be read by everyone."
  on org for select
  using ( true );

create policy "Owner Users can create their own org."
  on org for insert
  with check ( auth.uid() = owner_id );

create policy "Users can update own their org."
  on org for update
  using ( auth.uid() = owner_id );



create table member (
  org_id uuid references org not null,
  user_id uuid references auth.users not null,
  updated_at timestamp with time zone,
  joined_at timestamp with time zone,
  contributions json,

  primary key (org_id, user_id)
);
