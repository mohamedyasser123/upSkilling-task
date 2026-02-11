import { FiSearch } from "react-icons/fi";

export const SearchBar = ({ value, onChange }) => {
  return (
    <div className=" w-full flex items-center bg-white rounded-[25px] px-4 py-3 mb-6">
      <FiSearch className="text-gray-400 mr-3" />
      <input
        value={value}
        onChange={onChange}
        placeholder="Search contacts..."
        className="outline-none w-full"
      />
    </div>
  );
};

