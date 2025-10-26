// Ejemplo de uso del componente CodeExplanation en artículos del blog

import { CodeExplanationSection } from '@/components/ui/markdown-renderer'

// Ejemplo de código React con explicación
const reactExample = `import { useState } from 'react'

function App() {
  const [x, setX] = useState(300)
  
  const updateX = () => {
    setX(100)
  }
  
  return (
    <div className="App">
      <h1>{x}</h1>
      <button onClick={updateX}>Actualizar</button>
    </div>
  )
}

export default App`

const explanation = `
<p>Este código React demuestra el uso del hook <strong>useState</strong>:</p>
<ul>
  <li><strong>useState(300)</strong>: Inicializa la variable de estado <code>x</code> con el valor 300</li>
  <li><strong>setX(100)</strong>: Función para actualizar el estado de <code>x</code> a 100</li>
  <li><strong>onClick={updateX}</strong>: Ejecuta la función cuando se hace clic en el botón</li>
</ul>
<p>El componente se re-renderiza automáticamente cuando el estado cambia.</p>
`

// Uso en un artículo del blog
export function BlogArticleExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cómo usar useState en React</h1>

      <p className="text-lg mb-6">
        El hook <code>useState</code> es fundamental en React para manejar el estado local de los componentes.
      </p>

      <CodeExplanationSection
        code={reactExample}
        language="javascript"
        title="Ejemplo básico de useState"
        explanation={explanation}
      />

      <p className="text-lg mt-6">
        Como puedes ver, el código se adapta automáticamente al tema oscuro o claro de tu navegador.
      </p>
    </div>
  )
}
