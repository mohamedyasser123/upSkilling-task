import React, { useState } from 'react'
import { useUser } from '../hooks/useUsers';
import { MainLayout } from '../layout/Layout';
import { SearchBar } from '../components/SearchBar';
import { ContactCard } from '../components/ContactCard';
import { FiChevronLeft, FiChevronRight, FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const { data, isLoading } = useUser(page);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    if (isLoading) return <p className="text-white">Loading...</p>;

    const filteredUsers = data?.data?.filter((user) =>
        `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(
        Number(data?.total) / Number(data?.limit || 10)
    );
    const paginatedUsers = data?.data || [];

    const displayedUsers =
        search.trim() === ""
            ? paginatedUsers.slice(0, 2)
            : filteredUsers;
    console.log("page:", page);
    console.log("total:", data?.total);
    console.log("limit:", data?.limit);

    return (

        <MainLayout>
            <div className='max-w-[50%] mx-auto flex flex-col items-center justify-center rounded-[25px] px-8 md:px-16 py-16 border border-white '>
                <SearchBar
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex justify-end w-full">
                    <button
                        onClick={() => navigate("/add-user")}
                        className="flex items-center gap-2 bg-[#1BB0F0] hover:bg-blue-700 text-white px-6 py-3 rounded-[15px] shadow-lg transition-all active:scale-95"
                    >
                        <FiPlus size={22} />
                        <span className="font-semibold">Add New User</span>
                    </button>
                </div>

                {displayedUsers?.map((user) => (
                    <ContactCard
                        key={user.id}
                        user={user}
                        onEdit={(user) => console.log("edit", user)}
                        onDelete={(id) => console.log("delete", id)}
                    />
                ))}
                <div className="w-full flex justify-end items-center gap-4 mt-8 mb-4 text-white">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 0))}
                        disabled={page === 0}
                        className={`p-1 hover:bg-white/10 rounded-full transition-all ${page === 0 ? 'opacity-30' : ''}`}
                    >
                        <FiChevronLeft size={24} />
                    </button>
                    <div className="flex items-center gap-1 font-medium text-lg">
                        <span>{page + 1}</span>
                        <span className="opacity-50">/</span>
                        <span className="opacity-50">{totalPages || 10}</span>
                    </div>
                    <button
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page + 1 >= totalPages}
                        className={`p-1 hover:bg-white/10 rounded-full transition-all ${page + 1 >= totalPages ? 'opacity-30' : ''
                            }`}
                    >
                        <FiChevronRight size={24} />
                    </button>

                </div>
            </div>
        </MainLayout>
    );
};

