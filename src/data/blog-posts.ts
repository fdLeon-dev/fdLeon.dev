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
    id: "cursor-ai-seguridad",
    title: "Guía de Cursor AI para Crear Landing Pages Seguras",
    slug: "cursor-ai-landing-pages-seguras",
    excerpt: "Descubre cómo usar Cursor AI para crear landing pages modernas con código seguro. Mejores prácticas de seguridad en desarrollo web.",
    content: `# Guía de Cursor AI para Crear Landing Pages Seguras

La seguridad en el desarrollo web moderno no es opcional. Cada línea de código que escribes es una puerta potencial para vulnerabilidades. Con Cursor AI, puedes no solo crear landing pages increíbles, sino asegurarte de que sean seguras desde el primer día.

## El Problema Real de la Seguridad Web

Cuando creas una landing page, estás recopilando datos de usuarios: emails, números de teléfono, nombres. Cada dato es una responsabilidad. La seguridad no es solo para aplicaciones complejas - incluso una landing page simple necesita protección.

Cursor AI puede ayudarte a implementar mejores prácticas de seguridad automáticamente. No necesitas ser un experto en seguridad para escribir código seguro.

## Validación de Datos: La Primera Línea de Defensa

Todo dato que entra a tu aplicación debe ser validado. En formularios de landing pages, esto significa verificar que los emails sean válidos, que los campos obligatorios no estén vacíos, y que no hay intentos de inyección.

Con Cursor AI, puedes pedirle que implemente validación robusta. Es simplemente decir: "Agrega validación del lado del cliente y del servidor para este formulario". Cursor incluirá validaciones apropiadas usando bibliotecas estándar.

La clave es no confiar nunca en la validación del cliente. El servidor siempre debe validar. Cursor puede generar ambas capas de validación automáticamente.

## Sanitización de Entradas: Más Allá de la Validación

Validar que un campo no esté vacío es una cosa. Asegurarte de que no contenga código malicioso es otra. La sanitización es el proceso de limpiar las entradas del usuario.

Sanitiza todo lo que venga del usuario antes de guardarlo o mostrarlo. Esto previene ataques XSS (Cross-Site Scripting) donde atacantes inyectan código malicioso en tu sitio.

Cursor AI puede generar código que sanitice automáticamente las entradas usando bibliotecas probadas como DOMPurify. Es un nivel adicional de protección que puedes agregar con un simple prompt.

## Autenticación Segura: Nunca Almacenes Contraseñas en Texto Plano

Si tu landing page tiene un área de acceso, nunca almacenes contraseñas en texto plano. Usa hashing con bcrypt o similar. Cada contraseña debe ser única incluso si dos usuarios eligen la misma contraseña.

Cursor AI puede generar el código de autenticación seguro automáticamente. Simplemente pide implementar autenticación con JWT y bcrypt, y Cursor estructurará todo correctamente.

## Rate Limiting: Protección Contra Abuso

Las landing pages son populares por ataques de fuerza bruta. Implementa rate limiting para prevenir que atacantes intenten miles de login en segundos.

Rate limiting significa limitar cuántas veces alguien puede hacer cierta acción en un período de tiempo. Por ejemplo, máximo 5 intentos de login por minuto.

Cursor puede generar middleware de rate limiting. Es protección simple pero efectiva que previene la mayoría de ataques automatizados.

## HTTPS: No Negociable

Usa HTTPS siempre. En 2024, no hay excusa. Los navegadores marcan sitios HTTP como inseguros, y tienen razón en hacerlo.

Con Vercel o Netlify, HTTPS viene gratis y automático. Si estás en otro hosting, obtén un certificado SSL. Let's Encrypt los da gratis.

Cursor puede ayudarte a configurar redirects de HTTP a HTTPS. Es configuración simple que debe estar en todos los proyectos.

## Variables de Entorno: Secreto significa Secreto

Nunca hardcodees API keys, tokens o credenciales en tu código. Usa variables de entorno. Cursor puede generar código que lea de \`process.env\` correctamente.

Las variables de entorno son la forma estándar de manejar secretos. Tu código lee de estas variables en runtime, no las incluye en el código fuente.

## CORS Configurado Correctamente

Si tu landing page hace requests a APIs, configura CORS apropiadamente. CORS (Cross-Origin Resource Sharing) controla quién puede hacer requests a tu API.

Configura CORS restrictivo. Solo permite los orígenes que necesitas. Nunca uses wildcards (\`*\`) en producción - es una invitación abierta a atacantes.

Cursor puede generar configuraciones de CORS correctas. Simplemente especifica los orígenes permitidos.

## Content Security Policy: Capa Extra de Protección

Content Security Policy (CSP) es un header HTTP que previene ataques XSS. Especifica de dónde el navegador puede cargar recursos.

Una CSP bien configurada previene la mayoría de ataques XSS. Aunque requiere configuración inicial, vale la pena.

Cursor puede generar configuraciones CSP apropiadas para tu proyecto. Es un nivel adicional de seguridad que puedes agregar sin mucha complejidad.

## Pruebas de Seguridad: Constantemente

La seguridad no es algo que haces una vez. Es un proceso continuo. Revisa tu código regularmente buscando vulnerabilidades comunes.

Usa herramientas como npm audit para encontrar dependencias vulnerables. Actualiza regularmente. Las vulnerabilidades se descubren constantemente.

Cursor puede ayudar a generar tests de seguridad. Tests automatizados que verifican que tus protecciones funcionan.

## Conclusión: Seguridad desde el Principio

La seguridad no es algo que agregas después. Debe estar en cada línea de código que escribes. Cursor AI puede ayudarte a implementar mejores prácticas de seguridad desde el primer día.

No necesitas ser un experto en seguridad. Usa herramientas como Cursor para generar código seguro. Aprende de lo que genera. Con el tiempo, escribir código seguro se vuelve natural.

Recuerda: cada vulnerabilidad que previenes es un cliente cuyos datos están seguros. En el mundo moderno, eso no es solo buena práctica - es tu responsabilidad.

Empieza simple. Implementa validación básica. Usa HTTPS. Sanitiza entradas. Con cada proyecto, agrega más capas de seguridad. Cursor AI hace que sea más fácil de lo que piensas.

La seguridad perfecta no existe. Pero puedes acercarte significativamente con las herramientas y prácticas correctas. Y eso hace toda la diferencia.`,
    publishedAt: "2025-01-15",
    updatedAt: "2025-01-17",
    author: {
      name: "Facundo de Leon",
      email: "facudeleon92@gmail.com",
      avatar: "/avatar.png"
    },
    tags: ["Cursor AI", "Seguridad Web", "Landing Pages", "Desarrollo Web", "Best Practices"],
    category: "Desarrollo",
    featuredImage: "/images/blog/cursor.jpg",
    readingTime: 10,
    seo: {
      metaTitle: "Cursor AI: Guía para Crear Landing Pages Seguras",
      metaDescription: "Aprende cómo usar Cursor AI para crear landing pages modernas con código seguro. Mejores prácticas de seguridad en desarrollo web.",
      keywords: ["Cursor AI", "Seguridad Web", "Landing Pages", "XSS", "Security Best Practices"]
    },
    featured: true,
    published: true
  },
  {
    id: "typescript-best-practices",
    title: "Mejores Prácticas de TypeScript para Desarrollo Web Moderno",
    slug: "typescript-best-practices",
    excerpt: "Descubre las mejores prácticas de TypeScript para escribir código más seguro, mantenible y escalable en aplicaciones web modernas.",
    content: `# Mejores Prácticas de TypeScript para Desarrollo Web Moderno

![TypeScript](/images/blog/typescript.webp)

TypeScript se ha convertido en el estándar de facto para el desarrollo web moderno. No es solo JavaScript con tipos - es una forma completamente nueva de pensar en el código. En este artículo, compartiré las mejores prácticas que he aprendido tras años de trabajar con TypeScript en proyectos de producción.

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
    featuredImage: "/images/blog/typescript.webp",
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
    featuredImage: "/images/blog/react.jpg",
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

