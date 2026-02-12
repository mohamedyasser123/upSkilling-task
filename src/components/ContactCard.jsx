import { FiEdit, FiTrash2 } from "react-icons/fi";

export const ContactCard = ({ user, onEdit, onDelete }) => {
    const { id, firstName, lastName, picture } = user;

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <img
                        src={picture || "https://i.pravatar.cc/150?img=3"}
                        className="w-14 h-14 rounded-full object-cover"
                        alt="User Avatar"
                    />
                    <div>
                        <h3 className="font-semibold text-white">
                            {firstName} {lastName}
                        </h3>
                        <p className="text-white text-sm">+201009390789</p>
                    </div>
                </div>
                <div className="flex gap-4 text-gray-600">
                    <button
                        onClick={() => onEdit(user)}
                        className="bg-white p-2 rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                    >
                        <FiEdit size={20} />
                    </button>

                    <button
                        onClick={() => onDelete(id)}
                        className="bg-white p-2 rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                    >
                        <FiTrash2 size={20} className="text-red-500" />
                    </button>
                </div>
            </div>
            <div className="border-t border-white/20" />
        </div>
    );
};
