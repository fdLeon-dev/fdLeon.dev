// Ejemplo ultra breve del componente BriefCodeBlock

import { BriefCodeSection } from '@/components/ui/markdown-renderer'

// Ejemplo de código React ultra resumido
const reactExample = `const [count, setCount] = useState(0)`

// Uso en un artículo del blog
export function BriefBlogExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">useState Hook</h1>

      <p className="text-lg mb-4">
        Hook para agregar estado a componentes funcionales.
      </p>

      <BriefCodeSection
        code={reactExample}
        language="javascript"
        note="Inicializa estado con valor 0"
      />

      <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
        <code>useState</code> devuelve el valor actual y función para actualizarlo.
      </p>
    </div>
  )
}
