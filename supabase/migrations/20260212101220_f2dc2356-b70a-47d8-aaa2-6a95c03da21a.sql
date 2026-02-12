
-- Create participant type enum
CREATE TYPE public.participant_type AS ENUM ('estudante', 'profissional', 'empresa', 'outro');

-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin');

-- Registrations table
CREATE TABLE public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  profession TEXT NOT NULL,
  institution TEXT NOT NULL,
  participant_type participant_type NOT NULL DEFAULT 'outro',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Event settings table
CREATE TABLE public.event_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Helper function: is_admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'admin'
  )
$$;

-- RLS: registrations
CREATE POLICY "Anyone can insert registrations"
  ON public.registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view registrations"
  ON public.registrations FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete registrations"
  ON public.registrations FOR DELETE
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- RLS: event_settings
CREATE POLICY "Admins can view event_settings"
  ON public.event_settings FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert event_settings"
  ON public.event_settings FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update event_settings"
  ON public.event_settings FOR UPDATE
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- RLS: user_roles
CREATE POLICY "Admins can view user_roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.is_admin(auth.uid()));

-- Insert default event settings
INSERT INTO public.event_settings (key, value) VALUES
  ('event_date', '27 de Fevereiro de 2025'),
  ('event_location', 'Novo Hotel – Lubango'),
  ('event_description', 'A cidade do Lubango acolhe a primeira Imersão de Inteligência Artificial em Angola.'),
  ('registrations_enabled', 'true');

-- Create updated_at trigger for event_settings
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_event_settings_updated_at
  BEFORE UPDATE ON public.event_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
