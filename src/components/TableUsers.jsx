import { useState, useEffect } from 'react';
import ButtonSort from './ButtonSort';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './../redux/slices/userSlice';

function TableUsers() {

    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const dispatch = useDispatch();
    const { list: users, status, error } = useSelector((state) => state.users);


    const handleSort = (column) => {
        // Toggle sort direction if clicking on the same column
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // Set new column to sort and default to ascending direction
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const TableHead = () => {
        return (
            <thead className="text-normall capitalize bg-[#191919] text-gray-300">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        No
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center gap-4 md:gap-12">
                            <span>Name</span>
                            <ButtonSort handleClick={() => handleSort('name')} />
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center gap-4 md:gap-12">
                            <span>Email</span>
                            <ButtonSort handleClick={() => handleSort('email')} />
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center gap-4 md:gap-12">
                            <span>Address</span>
                            <ButtonSort handleClick={() => handleSort('address')} />
                        </div>
                    </th>
                    <th scope="col" className="px-6 py-3">
                        <div className="flex items-center gap-4 md:gap-12">
                            <span>Phone</span>
                            <ButtonSort handleClick={() => handleSort('phone')} />
                        </div>
                    </th>
                </tr>
            </thead>
        );
    };

    const TableRow = ({ index, row }) => {
        const isEven = index % 2 === 0;

        return (
            <tr
                className={`
          ${isEven ? 'bg-[#212126]' : 'bg-[#28282e]'}
          hover:bg-gray-800`}
                key={index}
            >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{row.name}</td>
                <td className="px-6 py-4">{row.email}</td>
                <td className="px-6 py-4">{row.address && row.address.street}</td>
                <td className="px-6 py-4">{row.phone}</td>
            </tr>
        );
    };

    const TableCount = ({ count }) => {
        return <div className="text-[14px] text-gray-300 py-[20px]">Total {count} data.</div>;
    };

    if (status === 'loading') {
        return (
            <div className="flex justify-center py-[20px] text-gray-300">
                Loading...
            </div>
        );
    }
    if (status === 'failed') {
        return (
            <div className="flex justify-center py-[20px] text-gray-300">
                Error: {error}
            </div>
        );

    }

    // Fungsi untuk melakukan sorting
    const sortUsers = (a, b) => {
        const columnA = a[sortColumn];
        const columnB = b[sortColumn];

        // Menggunakan operator ternary untuk menentukan arah sorting
        const comparison = sortDirection === 'asc' ? (columnA > columnB ? 1 : -1) : (columnA < columnB ? 1 : -1);

        return comparison;
    };

    const sortedUsers = users.slice().sort(sortUsers);
    return (
        <>
            <div className="relative p-5 overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-300">
                    <TableHead />
                    <tbody>
                        {sortedUsers.map((row, index) => (
                            <TableRow key={index} index={index} row={row} />
                        ))}
                    </tbody>
                </table>
                <TableCount count={users.length} />
            </div>
        </>
    );

}

export default TableUsers;
