const EmptyResults = ({ query, onReset }) => {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No encontramos resultados para "{query}"
        </h3>
        <p className="mt-1 text-gray-500">
          Intenta con términos de búsqueda diferentes o más generales.
        </p>
        <div className="mt-6">
          <button
            onClick={onReset}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Reintentar búsqueda
          </button>
        </div>
      </div>
    );
  };
  
  export default EmptyResults;