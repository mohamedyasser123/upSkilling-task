import { FiEdit, FiTrash2 } from "react-icons/fi";

export const ContactCard = ({ user, onEdit, onDelete }) => {
    return (
    <div className="w-full flex flex-col ">
        <div className=" w-full flex items-center justify-between  p-4  ">
            <div className="flex items-center gap-4">
                <img
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                    <h3 className="font-semibold text-white">
                        {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-white text-sm">+201009390789</p>
                </div>
            </div>

            <div className="flex gap-4 text-gray-600">
                <button
                    onClick={() => onEdit(user)}
                    className="bg-white p-2 rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                > <FiEdit size={20} />
                </button>
                <button onClick={() => onDelete(user.id)}
                    className="bg-white p-2 rounded-md hover:bg-gray-100 transition-colors shadow-sm"
                > <FiTrash2 size={20} className="text-red-500" />
                </button>
            </div>
        </div>
        <div className="border-t border-white/20  bg-white">
  </div>
    </div>
    );
};

