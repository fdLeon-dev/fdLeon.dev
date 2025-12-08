-- Ejecuta esto en Supabase SQL Editor para crear las tablas necesarias

-- 1. Tabla para participantes del sorteo
CREATE TABLE IF NOT EXISTS sorteo_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  business TEXT,
  phone TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(email)
);

-- 2. Tabla para mensajes de contacto
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabla para suscriptores del blog
CREATE TABLE IF NOT EXISTS blog_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  source TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE,
  ip_address TEXT,
  user_agent TEXT,
  UNIQUE(email)
);

-- Crear índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_sorteo_participants_email ON sorteo_participants(email);
CREATE INDEX IF NOT EXISTS idx_contact_messages_email ON contact_messages(email);
CREATE INDEX IF NOT EXISTS idx_blog_subscribers_email ON blog_subscribers(email);
