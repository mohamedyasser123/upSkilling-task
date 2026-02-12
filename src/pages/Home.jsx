import React, { useState } from 'react'
import { useUser } from '../hooks/useUsers';
import { MainLayout } from '../layout/Layout';
import { SearchBar } from '../components/SearchBar';
import { ContactCard } from '../components/ContactCard';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '../components/Pagination';
import { useDelUser } from '../hooks/useDelUser';

export const Home = () => {
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const { data, isLoading } = useUser(page);
    const navigate = useNavigate();
      const deleteMutation = useDelUser();
    if (isLoading) return <p className="text-white">Loading...</p>;

    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };
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
                         onEdit={(user) => navigate(`/edit/${user.id}`)}
                        onDelete={handleDelete}
                    />
                ))}
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    onPrev={() => setPage((p) => Math.max(p - 1, 0))}
                    onNext={() => setPage((p) => p + 1)}
                />
            </div>
        </MainLayout>
    );
};

