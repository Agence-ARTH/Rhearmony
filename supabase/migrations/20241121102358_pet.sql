insert into public.role_permissions (role, permission)
values
  ('admin', 'pets.delete'),
  ('admin', 'pets.update'),
  ('admin', 'pets.create'),
  ('admin', 'pets.read');

create table pets (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL, -- Reference to the user's ID
    name TEXT NOT NULL,
    breed TEXT,
    age INT CHECK (age >= 0), -- Optional age with a non-negative constraint
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) 
        REFERENCES public.users(id)
);

alter table public.pets enable row level security;

create policy "Allow authorized insert access" on public.pets for insert with check ( authorize('pets.create') );
create policy "Allow authorized read access" on public.pets for select using ( authorize('pets.read') );
create policy "Allow authorized update access" on public.pets for update using ( authorize('pets.update') );
create policy "Allow authorized delete access" on public.pets for delete using ( authorize('pets.delete') );

create policy "Allow individual insert access" on public.pets for insert with check ( auth.uid() = user_id  );
create policy "Allow individual read access" on public.pets for select using ( auth.uid() = user_id  );
create policy "Allow individual update access" on public.pets for update using ( auth.uid() = user_id  );
create policy "Allow individual delete access" on public.pets for delete using ( auth.uid() = user_id  );


