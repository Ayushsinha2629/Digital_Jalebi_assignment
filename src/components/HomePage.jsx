import React, { useEffect } from 'react';
import { useState } from 'react';


const HomePage = () => {
    // State variables
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);


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

    const handleClick = (user) => {
        setSelectedUser(user);
        setShowModal(true);
        console.log(user.age)
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className='mb-14 flex gap-5 justify-center'>
                <input className='w-[30vw] p-2 text-white rounded-lg bg-slate-800' type="text" placeholder="Search by name" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className='flex justify-center mt-6'>
                <div className='flex border-2 border-white gap-5 w-[55vw] py-2 bg-zinc-900 text-left p-4 max-h-[80vh] overflow-y-scroll rounded-xl bg-opacity-70'>
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
                                    <td
                                        onClick={() => handleClick(user)}
                                        className='p-7 cursor-pointer '>{user.firstName} {user.lastName}</td>
                                    <td className='pl-4'>{user.email}</td>
                                    <td>{user.address.address}, {user.address.city}, {user.address.state}, {user.address.postalCode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Modal */}
            {showModal && (
                <div className="flex fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50">
                    <div className=" flex flex-col gap-7 bg-black p-8 rounded-lg text-white font-semibold text-xl w-[45vw] max-h-[70vh] overflow-y-scroll text-left mt-10">
                        <h2 className="text-2xl font-semibold mb-4 flex justify-between">User Details
                        <button onClick={closeModal} className=" bg-gray-800 text-white px-2 py-2 rounded-lg">Close</button>
                        </h2>
                        {selectedUser && (
                            <>
                                <img src={selectedUser.image} alt="User" className="w-32 h-32 rounded-full mt-4 mx-auto" />
                                <p>Name: {selectedUser.firstName} {selectedUser.lastName}</p>
                                <p>Email: {selectedUser.email}</p>
                                <p>Age: {selectedUser.age}</p>
                                <p>Gender: {selectedUser.gender}</p>
                                <p>Phone: {selectedUser.phone}</p>
                                <p>Address: {selectedUser.address?.address}, {selectedUser.address?.city}, {selectedUser.address?.state}, {selectedUser.address?.postalCode}</p>
                                <p>Maiden Name: {selectedUser.maidenName}</p>
                                <p>Blood Group: {selectedUser.bloodGroup}</p>
                                <p>Height: {selectedUser.height}</p>
                                <p>Weight: {selectedUser.weight}</p>
                                <p>Eye Color: {selectedUser.eyeColor}</p>
                                <p>Hair Color: {selectedUser.hair?.color}</p>
                                <p>Hair Type: {selectedUser.hair?.type}</p>
                                <p>Domain: {selectedUser.domain}</p>
                                <p>IP Address: {selectedUser.ip}</p>
                                <p>University: {selectedUser.university}</p>
                                <p>Department: {selectedUser.company?.department}</p>
                                <p>Company: {selectedUser.company?.name}</p>
                                <p>Title: {selectedUser.company?.title}</p>
                                <p>Card Expiry: {selectedUser.bank?.cardExpire}</p>
                                <p>Card Number: {selectedUser.bank?.cardNumber}</p>
                                <p>Card Type: {selectedUser.bank?.cardType}</p>
                                <p>Currency: {selectedUser.bank?.currency}</p>
                                <p>IBAN: {selectedUser.bank?.iban}</p>
                                <p>Mac Address: {selectedUser.macAddress}</p>
                                <p>SSN: {selectedUser.ssn}</p>
                                <p>User Agent: {selectedUser.userAgent}</p>
                                <p>Crypto Coin: {selectedUser.crypto?.coin}</p>
                                <p>Wallet Address: {selectedUser.crypto?.wallet}</p>
                                <p>Crypto Network: {selectedUser.crypto?.network}</p>
                                
                            </>
                        )}
                        {/* Include other user details as needed */}
                        
                    </div>
                </div>
            )}
        </>
    );
};

export default HomePage