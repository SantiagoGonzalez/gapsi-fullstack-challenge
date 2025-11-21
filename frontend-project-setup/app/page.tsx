"use client"

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gapsi React Challenge - Proyecto Vite</h1>
          <p className="text-gray-700 mb-6">
            Este es un proyecto base para un challenge fullstack con las siguientes tecnologías:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Frontend Stack</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Vite</li>
                <li>React 17</li>
                <li>Redux Toolkit</li>
                <li>React Router v5</li>
                <li>Material-UI v4</li>
                <li>Tailwind CSS v3</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Utilidades</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Axios para API calls</li>
                <li>Jest para testing</li>
                <li>date-fns para fechas</li>
                <li>Variables de entorno</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-lg mb-2 text-blue-900">📋 Estructura del Proyecto</h3>
            <ul className="space-y-2 text-blue-800">
              <li>
                <strong>Home Page:</strong> Formulario con nombre, edad y datepicker que guarda en Redux
              </li>
              <li>
                <strong>Detail Page:</strong> Muestra los datos almacenados en Redux
              </li>
              <li>
                <strong>Extra Page:</strong> Ejemplos de llamadas API con Axios
              </li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-2 text-green-900">🚀 Para ejecutar localmente:</h3>
            <ol className="list-decimal list-inside space-y-2 text-green-800">
              <li>Descarga el proyecto usando el botón "Download ZIP" arriba</li>
              <li>
                Ejecuta <code className="bg-green-100 px-2 py-1 rounded">npm install</code>
              </li>
              <li>
                Configura el archivo <code className="bg-green-100 px-2 py-1 rounded">.env</code> con la URL de tu
                backend
              </li>
              <li>
                Ejecuta <code className="bg-green-100 px-2 py-1 rounded">npm run dev</code>
              </li>
              <li>
                Abre <code className="bg-green-100 px-2 py-1 rounded">http://localhost:3000</code>
              </li>
            </ol>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Nota:</strong> Este proyecto está diseñado para conectarse con un backend en Java/Spring Boot.
              Asegúrate de configurar las variables de entorno en el archivo{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">.env</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
