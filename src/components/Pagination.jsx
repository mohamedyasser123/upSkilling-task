import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Pagination = ({ page, totalPages, onPrev, onNext }) => {
  return (
    <div className="w-full flex justify-end items-center gap-4 mt-8 mb-4 text-white">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className={`p-1 hover:bg-white/10 rounded-full transition-all ${
          page === 0 ? "opacity-30" : ""
        }`}
      >
        <FiChevronLeft size={24} />
      </button>

      <div className="flex items-center gap-1 font-medium text-lg">
        <span>{page + 1}</span>
        <span className="opacity-50">/</span>
        <span className="opacity-50">{totalPages}</span>
      </div>

      <button
        onClick={onNext}
        disabled={page + 1 >= totalPages}
        className={`p-1 hover:bg-white/10 rounded-full transition-all ${
          page + 1 >= totalPages ? "opacity-30" : ""
        }`}
      >
        <FiChevronRight size={24} />
      </button>
    </div>
  );
};