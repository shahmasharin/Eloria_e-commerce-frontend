const ProductPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-16 flex items-center justify-center gap-2">

      {/* Previous */}
      <button
        type="button"
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="border border-[#3a342e] px-4 py-2 text-sm text-[#d8cec2] transition rounded-xl hover:border-[#b89b72] hover:text-[#b89b72] disabled:cursor-not-allowed disabled:opacity-30"
      >
        Previous
      </button>

      {/* Page numbers */}
      {Array.from(
        { length: totalPages },
        (_, index) => index + 1
      ).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          className={`h-10 w-10 border rounded-xl text-sm transition ${
            page === currentPage
              ? "border-[#b89b72] bg-[#b89b72] text-black"
              : "border-[#3a342e] text-[#d8cec2] hover:border-[#b89b72] hover:text-[#b89b72]"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        type="button"
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="border rounded-xl border-[#3a342e] px-4 py-2 text-sm text-[#d8cec2] transition hover:border-[#b89b72] hover:text-[#b89b72] disabled:cursor-not-allowed disabled:opacity-30"
      >
        Next
      </button>

    </div>
  );
};

export default ProductPagination;