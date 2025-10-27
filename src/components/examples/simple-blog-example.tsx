// Ejemplo de uso del componente SimpleCodeBlock


import { SimpleCodeBlock } from '@/components/ui/simple-code-block'

// Ejemplo de código React con explicación breve
const reactExample = `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}`

// Uso en un artículo del blog
export function BlogArticleExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">useState Hook en React</h1>

      <p className="text-lg mb-6">
        El hook <code>useState</code> te permite agregar estado a componentes funcionales.
      </p>

      <SimpleCodeBlock
        code={reactExample}
        language="javascript"
        title="Contador con useState"
        description="Este ejemplo muestra cómo usar useState para crear un contador simple. El hook devuelve el valor actual y una función para actualizarlo."
      />

      <h2 className="text-2xl font-bold mt-8 mb-4">Conceptos clave:</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        <li><code>useState(0)</code> - Inicializa el estado con valor 0</li>
        <li><code>count</code> - Variable que contiene el valor actual</li>
        <li><code>setCount</code> - Función para actualizar el estado</li>
        <li><code>onClick</code> - Evento que ejecuta la actualización</li>
      </ul>
    </div>
  )
}
