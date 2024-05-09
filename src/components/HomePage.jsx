import React, { useEffect } from 'react';
import { useState } from 'react';


const HomePage = () => {
    // State variables
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    // Fetch contacts data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/users',);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                setUsers(data.users);
            } catch (error) {
                console.error('Error while fetching data:', error.message);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const filtered = users.filter(user =>
            user.firstName.toLowerCase().includes(search.toLowerCase()) ||
            user.lastName.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [search, users]);

    return (
        <>
            <div className='mb-14 flex gap-5 justify-center'>
                <input className='w-[30vw] p-2 text-white'
                    type="text"
                    placeholder="Search by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='flex justify-center mt-6'>
                <div className='flex border-2 border-white gap-5 w-[55vw] py-2 bg-zinc-900 text-left p-4 max-h-[80vh] overflow-y-scroll rounded-xl'>
                    <table>
                        <thead>
                            <tr>
                                <th className='p-7'>Name</th>
                                <th className='p-[20px]'>Email</th>
                                <th className=''>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className='p-7 '>{user.firstName} {user.lastName}</td>
                                        <td className='pl-4'>{user.email}</td>
                                        <td>{user.address.address}, {user.address.city}, {user.address.state}, {user.address.postalCode}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    );
};

export default HomePage