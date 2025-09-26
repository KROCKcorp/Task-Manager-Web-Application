export default function PaginationBar({page, pageSize, total, onPageChange}) {
  const totalPages = Math.max(1, Math.ceil((total ?? 0) / pageSize))
  const canPrev = page > 1
  const canNext = page < totalPages

  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      <div className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`px-3 py-2 text-sm rounded-lg border border-gray-200 ${
            canPrev ? 'text-indigo-600 bg-white cursor-pointer hover:bg-indigo-100' : 'text-gray-400 cursor-not-allowed'
          }`}
          disabled={!canPrev}
          onClick={() => canPrev && onPageChange(page - 1)}
        >
          Previous
        </button>
        <button
          className={`px-3 py-2 text-sm rounded-lg border border-gray-200 ${
            canNext ? 'text-indigo-600 bg-white cursor-pointer hover:bg-indigo-100' : 'text-gray-400 cursor-not-allowed'
          }`}
          disabled={!canNext}
          onClick={() => canNext && onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}
