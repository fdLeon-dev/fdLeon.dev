# 🗄️ Configuración de Supabase para fdLeon-dev

## 1. Crear cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Anota tu URL y API Key

## 2. Variables de entorno

Agrega estas variables a tu `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_api_key_anonima
```

## 3. Crear las tablas

Ejecuta estos comandos SQL en el SQL Editor de Supabase:

### Tabla para participantes del sorteo:
```sql
CREATE TABLE sorteo_participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  business TEXT,
  phone TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX idx_sorteo_participants_email ON sorteo_participants(email);
CREATE INDEX idx_sorteo_participants_created_at ON sorteo_participants(created_at);
```

### Tabla para suscriptores del blog:
```sql
CREATE TABLE blog_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  ip_address TEXT,
  user_agent TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejor rendimiento
CREATE INDEX idx_blog_subscribers_email ON blog_subscribers(email);
CREATE INDEX idx_blog_subscribers_active ON blog_subscribers(is_active);
```

## 4. Configurar políticas de seguridad (RLS)

### Para sorteo_participants:
```sql
-- Habilitar RLS
ALTER TABLE sorteo_participants ENABLE ROW LEVEL SECURITY;

-- Permitir inserción pública (para el formulario)
CREATE POLICY "Allow public insert" ON sorteo_participants
  FOR INSERT WITH CHECK (true);

-- Permitir lectura solo para usuarios autenticados (opcional)
CREATE POLICY "Allow authenticated read" ON sorteo_participants
  FOR SELECT USING (auth.role() = 'authenticated');
```

> 💾 **Exportación de participantes**
>
> Para bajar todos los registros puedes utilizar el endpoint que ya se agregó al proyecto:
>
> ```text
> GET /api/sorteo/export
> ```
>
> La respuesta es un CSV descargable con las columnas `name,email,business,phone,created_at,ip_address,user_agent`.
> Este archivo puede abrirse en Excel/Google Sheets y guardarse como PDF, o bien puedes extender el handler para construir directamente un PDF usando una librería como `pdfkit` o `jsPDF`.
> La idea es mantener los datos en la base y generar el documento solo cuando lo necesites.

### Para blog_subscribers:
```sql
-- Habilitar RLS
ALTER TABLE blog_subscribers ENABLE ROW LEVEL SECURITY;

-- Permitir inserción pública
CREATE POLICY "Allow public insert" ON blog_subscribers
  FOR INSERT WITH CHECK (true);

-- Permitir actualización para desuscripción
CREATE POLICY "Allow public update" ON blog_subscribers
  FOR UPDATE USING (true);
```

## 5. Configurar Resend para emails

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta
3. Verifica tu dominio
4. Obtén tu API key

Agrega a tu `.env.local`:
```env
RESEND_API_KEY=tu_api_key_de_resend
```

## 6. Configurar EmailJS para notificaciones

1. Ve a [emailjs.com](https://emailjs.com)
2. Crea una cuenta
3. Configura tu servicio de email
4. Crea templates para:
   - Confirmación de sorteo
   - Notificación de nuevo artículo

Agrega a tu `.env.local`:
```env
EMAILJS_SERVICE_ID=tu_service_id
EMAILJS_TEMPLATE_ID=tu_template_id
EMAILJS_PUBLIC_KEY=tu_public_key
```

## 7. API Key para automatización

Agrega a tu `.env.local`:
```env
API_SECRET_KEY=tu_clave_secreta_para_automatizacion
```

## 8. Script de automatización

Crea un script para enviar notificaciones cuando publiques un artículo:

```bash
# Ejemplo de uso
curl -X POST http://localhost:3000/api/blog/notify \
  -H "Content-Type: application/json" \
  -H "x-api-key: tu_clave_secreta" \
  -d '{
    "title": "Nuevo Artículo: React 19 Features",
    "excerpt": "Descubre las nuevas características de React 19...",
    "url": "https://fdleon.dev/blog/react-19-features",
    "publishedAt": "2025-01-15T10:00:00Z"
  }'
```

## 9. Beneficios de esta configuración

✅ **Gratis hasta 500MB de datos**
✅ **Hasta 2GB de transferencia mensual**
✅ **Backup automático**
✅ **Dashboard intuitivo**
✅ **Queries SQL directas**
✅ **Real-time updates**
✅ **Fácil escalabilidad**

## 10. Monitoreo y Analytics

Con Supabase puedes:
- Ver estadísticas en tiempo real
- Exportar datos a CSV
- Crear reportes personalizados
- Monitorear el rendimiento





