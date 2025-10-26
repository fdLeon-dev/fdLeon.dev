export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  updatedAt?: string
  author: {
    name: string
    email: string
    avatar?: string
  }
  tags: string[]
  category: string
  featuredImage?: string
  readingTime: number // in minutes
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
  featured: boolean
  published: boolean
}

export const blogPosts: BlogPost[] = [
  {
    id: "nextjs-15-features",
    title: "Nuevas Características de Next.js 15: Una Guía Completa",
    slug: "nextjs-15-features",
    excerpt: "Explora las nuevas características de Next.js 15, incluyendo mejoras en performance, nuevas APIs y optimizaciones para desarrolladores.",
    content: `# Nuevas Características de Next.js 15: Guía Técnica Completa

Next.js 15 ha revolucionado el desarrollo web con mejoras significativas en performance, developer experience y nuevas APIs. En esta guía técnica, exploraremos las características más importantes y cómo implementarlas correctamente.

## 🚀 Turbopack: El Futuro de la Compilación

Turbopack ha recibido mejoras masivas en velocidad de compilación, especialmente para proyectos enterprise.

### Configuración Optimizada

\`\`\`javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // Optimizaciones de bundle
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
\`\`\`

### Mejores Prácticas para Turbopack

\`\`\`javascript
// Componente optimizado para Turbopack
import { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';

// Lazy loading con Suspense
const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default function OptimizedPage() {
  return (
    <div>
      <h1>Página Optimizada</h1>
      <Suspense fallback={<div>Cargando...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}

// Dynamic imports para componentes pesados
const Chart = dynamic(() => import('./Chart'), {
  loading: () => <p>Cargando gráfico...</p>,
  ssr: false, // Solo en cliente si es necesario
});
\`\`\`

## 🎯 App Router: Patrones Avanzados

El App Router ahora está completamente estabilizado con patrones avanzados para aplicaciones complejas.

### Server Components vs Client Components

\`\`\`javascript
// app/dashboard/page.js - Server Component
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session) {
    redirect('/login');
  }

  // Datos del servidor
  const userData = await fetchUserData(session.user.id);
  
  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardClient initialData={userData} />
    </div>
  );
}

// app/dashboard/DashboardClient.js - Client Component
'use client';
import { useState, useEffect } from 'react';

export default function DashboardClient({ initialData }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    const response = await fetch('/api/dashboard');
    const newData = await response.json();
    setData(newData);
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleRefresh} disabled={loading}>
        {loading ? 'Actualizando...' : 'Actualizar'}
      </button>
      {/* Renderizar datos */}
    </div>
  );
}
\`\`\`

### Middleware Avanzado

\`\`\`javascript
// middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Protección de rutas
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Rate limiting
  const ip = request.ip || '127.0.0.1';
  const rateLimitKey = \`rate_limit_\${ip}\`;
  
  // Implementar lógica de rate limiting
  const rateLimit = await checkRateLimit(rateLimitKey);
  
  if (!rateLimit.allowed) {
    return new NextResponse('Too Many Requests', { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ],
};
\`\`\`

## 🖼️ Optimización de Imágenes Avanzada

Next.js 15 introduce optimizaciones automáticas más inteligentes para imágenes.

### Configuración de Imágenes

\`\`\`javascript
// next.config.js - Configuración de imágenes
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['example.com', 'cdn.example.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};
\`\`\`

### Componente de Imagen Optimizado

\`\`\`javascript
// components/OptimizedImage.js
import Image from 'next/image';
import { useState } from 'react';

export default function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className = '',
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div 
        className={\`bg-gray-200 flex items-center justify-center \${className}\`}
        style={{ width, height }}
      >
        <span className="text-gray-500">Error cargando imagen</span>
      </div>
    );
  }

  return (
    <div className={\`relative \${className}\`}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        onLoad={handleLoad}
        onError={handleError}
        className={\`transition-opacity duration-300 \${isLoading ? 'opacity-0' : 'opacity-100'\`}
        {...props}
      />
    </div>
  );
}
\`\`\`

## 🔧 API Routes Mejoradas

### Patrón de API con Validación

\`\`\`javascript
// app/api/users/route.js
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';

// Esquema de validación
const createUserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(18).max(100),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const identifier = request.ip ?? '127.0.0.1';
    const { success } = await rateLimit.limit(identifier);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    const body = await request.json();
    
    // Validación con Zod
    const validatedData = createUserSchema.parse(body);
    
    // Lógica de negocio
    const user = await createUser(validatedData);
    
    return NextResponse.json(
      { user, message: 'Usuario creado exitosamente' },
      { status: 201 }
    );
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
\`\`\`

## 📊 Monitoreo y Performance

### Métricas de Performance

\`\`\`javascript
// lib/analytics.js
export function trackWebVitals(metric) {
  const { name, value, id } = metric;
  
  // Enviar a Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      event_label: id,
      non_interaction: true,
    });
  }
  
  // Enviar a servicio personalizado
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      metric: name,
      value: value,
      timestamp: Date.now(),
    }),
  });
}

// app/layout.js
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
\`\`\`

## 🛡️ Seguridad y Mejores Prácticas

### Headers de Seguridad

\`\`\`javascript
// next.config.js - Headers de seguridad
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
\`\`\`

## 🎯 Conclusión

Next.js 15 representa un salto cuántico en el desarrollo web moderno. Las mejoras en Turbopack, App Router y optimizaciones de imágenes hacen que sea la elección perfecta para aplicaciones enterprise.

**Próximos pasos:**
1. Migra tu proyecto a Next.js 15
2. Implementa Server Components donde sea posible
3. Optimiza tus imágenes con las nuevas características
4. Configura métricas de performance
5. Implementa headers de seguridad

¿Listo para aprovechar el poder de Next.js 15? ¡El futuro del desarrollo web está aquí!`,
    publishedAt: "2025-03-15T10:00:00Z",
    author: {
      name: "fdLeon-dev",
      email: "contact@fdleon.dev",
    },
    tags: ["Next.js", "React", "JavaScript", "Web Development"],
    category: "Tutorial",
    featuredImage: "/multimedia/blog/nextjs-15-features.svg",
    readingTime: 8,
    seo: {
      metaTitle: "Nuevas Características de Next.js 15: Guía Completa 2025",
      metaDescription: "Descubre las nuevas características de Next.js 15, incluyendo Turbopack mejorado, App Router estabilizado y optimizaciones de performance.",
      keywords: ["Next.js 15", "React", "JavaScript", "Web Development", "Tutorial"]
    },
    featured: true,
    published: true
  },
  {
    id: "typescript-best-practices",
    title: "Mejores Prácticas de TypeScript para Desarrollo Web Moderno",
    slug: "typescript-best-practices",
    excerpt: "Descubre las mejores prácticas de TypeScript para escribir código más seguro, mantenible y escalable en aplicaciones web modernas.",
    content: `# TypeScript Avanzado: Patrones y Mejores Prácticas para Desarrollo Web

TypeScript se ha convertido en el estándar de facto para desarrollo web moderno. En esta guía avanzada, exploraremos patrones complejos, técnicas de optimización y mejores prácticas para escribir código TypeScript de nivel enterprise.

## 🚀 Configuración Avanzada de TypeScript

### tsconfig.json Optimizado para Producción

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/types/*": ["./src/types/*"]
    },
    "strictNullChecks": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
\`\`\`

### Configuración de ESLint para TypeScript

\`\`\`javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    '@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  },
};
\`\`\`

## 🎯 Patrones Avanzados de TypeScript

### Generic Types Avanzados

\`\`\`typescript
// Generic con constraints y conditional types
type ApiResponse<T, E = string> = {
  data: T;
  error: E | null;
  loading: boolean;
};

// Generic utility para API calls
async function apiCall<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    return {
      data: data as T,
      error: null,
      loading: false,
    };
  } catch (error) {
    return {
      data: null as T,
      error: error instanceof Error ? error.message : 'Unknown error',
      loading: false,
    };
  }
}

// Uso del generic
interface User {
  id: number;
  name: string;
  email: string;
}

const userResponse = await apiCall<User>('/api/users/1');
\`\`\`

### Utility Types Personalizados

\`\`\`typescript
// Utility types personalizados
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type NonNullable<T> = T extends null | undefined ? never : T;

type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Ejemplo de uso
interface User {
  id: number;
  name: string;
  email?: string;
  profile?: {
    avatar?: string;
    bio?: string;
  };
}

type UserUpdate = DeepPartial<User>;
type UserWithEmail = RequiredKeys<User, 'email'>;

// Conditional types avanzados
type ApiEndpoint<T extends string> = T extends \`/users/\${infer Id}\`
  ? { id: Id; type: 'user' }
  : T extends \`/posts/\${infer Id}\`
  ? { id: Id; type: 'post' }
  : never;

type UserEndpoint = ApiEndpoint<'/users/123'>; // { id: '123'; type: 'user' }
\`\`\`

### Template Literal Types

\`\`\`typescript
// Template literal types para APIs
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type ApiRoute<M extends HttpMethod, P extends string> = 
  \`\${M} \${P}\`;

type UserRoutes = 
  | ApiRoute<'GET', '/users'>
  | ApiRoute<'GET', '/users/:id'>
  | ApiRoute<'POST', '/users'>
  | ApiRoute<'PUT', '/users/:id'>
  | ApiRoute<'DELETE', '/users/:id'>;

// Type-safe API client
class ApiClient {
  async request<T>(
    route: UserRoutes,
    data?: unknown
  ): Promise<T> {
    // Implementación type-safe
    const [method, path] = route.split(' ') as [HttpMethod, string];
    
    const response = await fetch(path, {
      method,
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return response.json();
  }
}

// Uso type-safe
const client = new ApiClient();
const users = await client.request<User[]>('GET /users');
\`\`\`

## 🔧 Patrones de Diseño con TypeScript

### Factory Pattern con Generics

\`\`\`typescript
// Abstract factory pattern
interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string): Promise<T[]>;
}

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}

// Factory interface
interface DatabaseFactory {
  createConnection(config: DatabaseConfig): DatabaseConnection;
}

// MySQL implementation
class MySQLConnection implements DatabaseConnection {
  constructor(private config: DatabaseConfig) {}
  
  async connect(): Promise<void> {
    // MySQL connection logic
  }
  
  async disconnect(): Promise<void> {
    // MySQL disconnect logic
  }
  
  async query<T>(sql: string): Promise<T[]> {
    // MySQL query logic
    return [];
  }
}

class MySQLFactory implements DatabaseFactory {
  createConnection(config: DatabaseConfig): DatabaseConnection {
    return new MySQLConnection(config);
  }
}

// PostgreSQL implementation
class PostgreSQLConnection implements DatabaseConnection {
  constructor(private config: DatabaseConfig) {}
  
  async connect(): Promise<void> {
    // PostgreSQL connection logic
  }
  
  async disconnect(): Promise<void> {
    // PostgreSQL disconnect logic
  }
  
  async query<T>(sql: string): Promise<T[]> {
    // PostgreSQL query logic
    return [];
  }
}

class PostgreSQLFactory implements DatabaseFactory {
  createConnection(config: DatabaseConfig): DatabaseConnection {
    return new PostgreSQLConnection(config);
  }
}

// Database manager
class DatabaseManager {
  private connection: DatabaseConnection | null = null;
  
  constructor(private factory: DatabaseFactory) {}
  
  async initialize(config: DatabaseConfig): Promise<void> {
    this.connection = this.factory.createConnection(config);
    await this.connection.connect();
  }
  
  async query<T>(sql: string): Promise<T[]> {
    if (!this.connection) {
      throw new Error('Database not initialized');
    }
    return this.connection.query<T>(sql);
  }
  
  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.disconnect();
      this.connection = null;
    }
  }
}

// Uso
const mysqlFactory = new MySQLFactory();
const dbManager = new DatabaseManager(mysqlFactory);
\`\`\`

### Observer Pattern con TypeScript

\`\`\`typescript
// Type-safe observer pattern
type EventMap = {
  userCreated: { id: number; name: string; email: string };
  userUpdated: { id: number; changes: Partial<User> };
  userDeleted: { id: number };
  orderPlaced: { orderId: string; userId: number; total: number };
};

type EventName = keyof EventMap;
type EventData<T extends EventName> = EventMap[T];

interface EventListener<T extends EventName> {
  (data: EventData<T>): void | Promise<void>;
}

class EventEmitter {
  private listeners = new Map<EventName, Set<EventListener<any>>>();

  on<T extends EventName>(
    event: T,
    listener: EventListener<T>
  ): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    this.listeners.get(event)!.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(listener);
    };
  }

  async emit<T extends EventName>(
    event: T,
    data: EventData<T>
  ): Promise<void> {
    const eventListeners = this.listeners.get(event);
    if (!eventListeners) return;

    const promises = Array.from(eventListeners).map(listener => 
      Promise.resolve(listener(data))
    );
    
    await Promise.all(promises);
  }

  off<T extends EventName>(event: T, listener: EventListener<T>): void {
    this.listeners.get(event)?.delete(listener);
  }

  removeAllListeners(event?: EventName): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

// Uso del EventEmitter
const eventEmitter = new EventEmitter();

// Type-safe event listeners
const unsubscribe = eventEmitter.on('userCreated', (user) => {
  console.log(\`New user created: \${user.name} (\${user.email})\`);
});

eventEmitter.on('orderPlaced', async (order) => {
  console.log(\`Order \${order.orderId} placed by user \${order.userId}\`);
  // Send email notification
});

// Emit events
await eventEmitter.emit('userCreated', {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com'
});
\`\`\`

## 🛡️ Type Guards y Type Narrowing

### Advanced Type Guards

\`\`\`typescript
// Type guards personalizados
function isString(value: unknown): value is string {
  return typeof value === 'string';
}

function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    typeof (value as any).id === 'number' &&
    typeof (value as any).name === 'string'
  );
}

// Discriminated unions
type LoadingState = {
  status: 'loading';
};

type SuccessState<T> = {
  status: 'success';
  data: T;
};

type ErrorState = {
  status: 'error';
  error: string;
};

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

// Type guard para discriminated union
function isSuccessState<T>(state: AsyncState<T>): state is SuccessState<T> {
  return state.status === 'success';
}

function isErrorState<T>(state: AsyncState<T>): state is ErrorState {
  return state.status === 'error';
}

// Uso con type narrowing
function handleAsyncState<T>(state: AsyncState<T>) {
  if (isSuccessState(state)) {
    // TypeScript sabe que state.data existe
    console.log('Data:', state.data);
  } else if (isErrorState(state)) {
    // TypeScript sabe que state.error existe
    console.error('Error:', state.error);
} else {
    // TypeScript sabe que es LoadingState
    console.log('Loading...');
  }
}
\`\`\`

## 📊 Performance y Optimización

### Lazy Loading con TypeScript

\`\`\`typescript
// Lazy loading con type safety
class LazyLoader<T> {
  private loader: () => Promise<T>;
  private cached: T | null = null;
  private loading: Promise<T> | null = null;

  constructor(loader: () => Promise<T>) {
    this.loader = loader;
  }

  async load(): Promise<T> {
    if (this.cached !== null) {
      return this.cached;
    }

    if (this.loading !== null) {
      return this.loading;
    }

    this.loading = this.loader().then(result => {
      this.cached = result;
      this.loading = null;
      return result;
    });

    return this.loading;
  }

  isLoaded(): boolean {
    return this.cached !== null;
  }

  getCached(): T | null {
    return this.cached;
  }
}

// Uso
const userLoader = new LazyLoader(async () => {
  const response = await fetch('/api/user');
  return response.json();
});

// Type-safe lazy loading
const user = await userLoader.load(); // Type: User
\`\`\`

### Memoization con TypeScript

\`\`\`typescript
// Memoization function con type safety
function memoize<TArgs extends readonly unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn
): (...args: TArgs) => TReturn {
  const cache = new Map<string, TReturn>();

  return (...args: TArgs): TReturn => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Ejemplo de uso
const expensiveCalculation = memoize((n: number, m: number): number => {
  console.log('Calculating...');
  return n * m * Math.random();
});

// Primera llamada - calcula
const result1 = expensiveCalculation(5, 10);

// Segunda llamada - usa cache
const result2 = expensiveCalculation(5, 10);
\`\`\`

## 🎯 Conclusión

TypeScript avanzado te permite escribir código más seguro, mantenible y escalable. Los patrones mostrados aquí son fundamentales para aplicaciones enterprise.

**Próximos pasos:**
1. Implementa configuración estricta de TypeScript
2. Usa generic types para código reutilizable
3. Aplica patrones de diseño con type safety
4. Optimiza performance con lazy loading y memoization
5. Crea type guards para runtime safety

¿Listo para llevar tu TypeScript al siguiente nivel? ¡El código type-safe te está esperando!`,
    publishedAt: "2025-03-08T09:15:00Z",
    author: {
      name: "fdLeon-dev",
      email: "contact@fdleon.dev",
    },
    tags: ["TypeScript", "JavaScript", "Web Development", "Best Practices"],
    category: "Tutorial",
    featuredImage: "/multimedia/blog/typescript-best-practices.svg",
    readingTime: 15,
    seo: {
      metaTitle: "TypeScript Mejores Prácticas: Guía Completa para Desarrollo Web",
      metaDescription: "Aprende las mejores prácticas de TypeScript para desarrollo web moderno. Configuración, patrones avanzados y tips para código más seguro.",
      keywords: ["TypeScript", "JavaScript", "Web Development", "Best Practices", "Programming"]
    },
    featured: true,
    published: true
  },
  {
    id: "react-18-features",
    title: "React 18: Características Avanzadas y Patrones Modernos",
    slug: "react-18-features",
    excerpt: "Domina React 18 con Concurrent Features, Suspense, Server Components y patrones avanzados de desarrollo.",
    content: `# React 18: Características Avanzadas y Patrones Modernos

## 🚀 Concurrent Features: El Futuro de React

React 18 introduce Concurrent Features que permiten interrumpir y reanudar el trabajo de renderizado.

\`\`\`typescript
import { startTransition, useTransition } from 'react'

function SearchResults({ query }: { query: string }) {
  const [isPending, startTransition] = useTransition()
  const [results, setResults] = useState<SearchResult[]>([])
  
  useEffect(() => {
    if (!query) return
    
    startTransition(() => {
      // Esta actualización puede ser interrumpida
      setResults(performSearch(query))
    })
  }, [query])
  
  return (
    <div>
      {isPending && <div>Buscando...</div>}
      {results.map(result => (
        <SearchResultItem key={result.id} result={result} />
      ))}
    </div>
  )
}
\`\`\`

## 🎭 Suspense Avanzado

### Suspense con Error Boundaries
\`\`\`typescript
import { Suspense, ErrorBoundary } from 'react'
import { createResource } from 'react-resource'

// Crear un recurso para datos asíncronos
const userResource = createResource(
  (userId: string) => fetchUser(userId)
)

function UserProfile({ userId }: { userId: string }) {
  const user = userResource.read(userId)
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Suspense fallback={<UserSkeleton />}>
        <UserProfile userId="123" />
      </Suspense>
    </ErrorBoundary>
  )
}
\`\`\`

### Suspense con Lazy Loading
\`\`\`typescript
import { lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<div>Cargando componente pesado...</div>}>
      <LazyComponent />
    </Suspense>
  )
}
\`\`\`

## 🔄 Server Components

### Server Component
\`\`\`typescript
// app/dashboard/page.tsx (Server Component por defecto)
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { getPosts } from '@/lib/posts'

export default async function Dashboard() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }
  
  const posts = await getPosts()
  
  return (
    <div>
      <h1>Dashboard</h1>
      <PostsList posts={posts} />
    </div>
  )
}
\`\`\`

### Client Component con Interactividad
\`\`\`typescript
'use client'
import { useState, useTransition } from 'react'

export function InteractiveButton() {
  const [isPending, startTransition] = useTransition()
  const [count, setCount] = useState(0)
  
  const handleClick = () => {
    startTransition(() => {
      setCount(prev => prev + 1)
    })
  }
  
  return (
    <button 
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? 'Procesando...' : \`Contador: \${count}\`}
    </button>
  )
}
\`\`\`

## 🎯 useId Hook

\`\`\`typescript
import { useId } from 'react'

function FormField({ label, type = 'text' }: { label: string; type?: string }) {
  const id = useId()
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id}
        type={type}
        name={id}
      />
    </div>
  )
}

// Uso en formularios
function ContactForm() {
  return (
    <form>
      <FormField label="Nombre" />
      <FormField label="Email" type="email" />
      <FormField label="Teléfono" type="tel" />
    </form>
  )
}
\`\`\`

## 🔄 useDeferredValue Hook

\`\`\`typescript
import { useDeferredValue, useMemo } from 'react'

function SearchResults({ query }: { query: string }) {
  const deferredQuery = useDeferredValue(query)
  
  const results = useMemo(() => {
    if (!deferredQuery) return []
    return performExpensiveSearch(deferredQuery)
  }, [deferredQuery])
  
  return (
    <div>
      {results.map(result => (
        <SearchResultItem key={result.id} result={result} />
      ))}
    </div>
  )
}
\`\`\`

## 🎭 useSyncExternalStore Hook

\`\`\`typescript
import { useSyncExternalStore } from 'react'

// Store personalizado
class CounterStore {
  private listeners = new Set<() => void>()
  private count = 0
  
  subscribe = (listener: () => void) => {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }
  
  getSnapshot = () => this.count
  
  increment = () => {
    this.count++
    this.listeners.forEach(listener => listener())
  }
  
  decrement = () => {
    this.count--
    this.listeners.forEach(listener => listener())
  }
}

const counterStore = new CounterStore()

function Counter() {
  const count = useSyncExternalStore(
    counterStore.subscribe,
    counterStore.getSnapshot
  )
  
  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={counterStore.increment}>+</button>
      <button onClick={counterStore.decrement}>-</button>
    </div>
  )
}
\`\`\`

## 🎨 Patrones Avanzados con Hooks

### Custom Hook para Estado Complejo
\`\`\`typescript
import { useState, useCallback, useRef, useEffect } from 'react'

interface UseAsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
  execute: (...args: any[]) => Promise<T>
  reset: () => void
}

function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>
): UseAsyncState<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const isMountedRef = useRef(true)
  
  const execute = useCallback(async (...args: any[]) => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await asyncFunction(...args)
      if (isMountedRef.current) {
        setData(result)
      }
      return result
    } catch (err) {
      if (isMountedRef.current) {
        setError(err as Error)
      }
      throw err
    } finally {
      if (isMountedRef.current) {
        setLoading(false)
      }
    }
  }, [asyncFunction])
  
  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])
  
  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [])
  
  return { data, loading, error, execute, reset }
}

// Uso del hook
function UserProfile({ userId }: { userId: string }) {
  const { data: user, loading, error, execute } = useAsync(fetchUser)
  
  useEffect(() => {
    execute(userId)
  }, [userId, execute])
  
  if (loading) return <div>Cargando usuario...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!user) return <div>Usuario no encontrado</div>
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  )
}
\`\`\`

## 🔄 Patrón de Render Props con Hooks

\`\`\`typescript
import { ReactNode, createContext, useContext } from 'react'

interface DataProviderProps<T> {
  children: ReactNode
  fetcher: () => Promise<T>
}

interface DataContextValue<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

const DataContext = createContext<DataContextValue<any> | null>(null)

function DataProvider<T>({ children, fetcher }: DataProviderProps<T>) {
  const { data, loading, error, execute } = useAsync(fetcher)
  
  const value: DataContextValue<T> = {
    data,
    loading,
    error,
    refetch: execute
  }
  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

function useData<T>(): DataContextValue<T> {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

// Uso
function App() {
  return (
    <DataProvider fetcher={() => fetchPosts()}>
      <PostsList />
    </DataProvider>
  )
}

function PostsList() {
  const { data: posts, loading, error } = useData<Post[]>()
  
  if (loading) return <div>Cargando posts...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return (
    <div>
      {posts?.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  )
}
\`\`\`

## 🎯 Conclusión

React 18 introduce características poderosas que transforman cómo desarrollamos aplicaciones. Con Concurrent Features, Suspense, y los nuevos hooks, puedes crear experiencias de usuario más fluidas y aplicaciones más eficientes.

**Próximos pasos:**
1. Implementa Concurrent Features en tus componentes
2. Usa Suspense para manejar estados de carga
3. Aprovecha Server Components para mejor rendimiento
4. Crea Custom Hooks reutilizables
5. Aplica patrones avanzados de estado

¿Te interesa profundizar en alguna característica específica de React 18?`,
    publishedAt: "2025-03-01T08:30:00Z",
    author: {
      name: "fdLeon-dev",
      email: "contact@fdleon.dev",
    },
    tags: ["React", "JavaScript", "Hooks", "Concurrent", "Suspense"],
    category: "Tutorial",
    featuredImage: "/multimedia/blog/performance-optimization.svg",
    readingTime: 18,
    seo: {
      metaTitle: "React 18: Características Avanzadas y Patrones Modernos",
      metaDescription: "Domina React 18 con Concurrent Features, Suspense, Server Components y patrones avanzados de desarrollo web moderno.",
      keywords: ["React 18", "JavaScript", "Hooks", "Concurrent", "Suspense", "Web Development"]
    },
    featured: true,
    published: true
  }
]

// Funciones de utilidad
export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured && post.published)
}

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category && post.published)
}

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug && post.published)
}

export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export const getAllTags = (): string[] => {
  const allTags = blogPosts
    .filter(post => post.published)
    .flatMap(post => post.tags)

  return Array.from(new Set(allTags)).sort()
}

export const getAllCategories = (): string[] => {
  const allCategories = blogPosts
    .filter(post => post.published)
    .map(post => post.category)

  return Array.from(new Set(allCategories)).sort()
}

