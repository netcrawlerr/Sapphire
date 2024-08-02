import { useState } from "react";
import { FaSort, FaSortUp, FaSortDown, FaPen } from "react-icons/fa";
import EditUserModal from "./EditUserModal"; // Adjust the path as needed

const Users = () => {
  const [users, setUsers] = useState([
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      location: "New York",
      phone: "123-456-7890",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      location: "California",
      phone: "987-654-3210",
    },
    {
      firstName: "Louise",
      lastName: "SandovalSmith",
      email: "Cameron@example.com",
      location: "Guam",
      phone: "987-654-3210",
    },
    {
      firstName: "Warren",
      lastName: "IngramSmith",
      email: "Frederick@example.com",
      location: "Laos",
      phone: "987-654-3210",
    },
    {
      firstName: "Lillie",
      lastName: "CainSmith",
      email: "Lillian@example.com",
      location: "Qatar",
      phone: "987-654-3210",
    },
    {
      firstName: "John",
      lastName: "ParkSmith",
      email: "Marc@example.com",
      location: "India",
      phone: "987-654-3210",
    },
    {
      firstName: "Sallie",
      lastName: "SimsSmith",
      email: "Keith@example.com",
      location: "St. Barthélemy",
      phone: "987-654-3210",
    },
    {
      firstName: "Gene",
      lastName: "WeaverSmith",
      email: "Augusta@example.com",
      location: "Central African Republic",
      phone: "987-654-3210",
    },
    {
      firstName: "Rosalie",
      lastName: "BennettSmith",
      email: "Lewis@example.com",
      location: "Belize",
      phone: "987-654-3210",
    },
    // Add more user data as needed
  ]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const sortUsers = (key) => {
    let sortedUsers = [...users];
    if (sortConfig.key === key) {
      sortedUsers.reverse();
      setSortConfig({
        key,
        direction:
          sortConfig.direction === "ascending" ? "descending" : "ascending",
      });
    } else {
      sortedUsers.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      setSortConfig({ key, direction: "ascending" });
    }
    setUsers(sortedUsers);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <FaSortUp />
      ) : (
        <FaSortDown />
      );
    }
    return <FaSort />;
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleSave = (updatedUser) => {
    setUsers(
      users.map((user) =>
        user.email === updatedUser.email ? updatedUser : user
      )
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-5">Manage Users</h1>
      <div className="overflow-x-auto">
        <div className="overflow-y-auto max-h-[500px]">
          {" "}
          {/* Set the max-height here */}
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
              <tr className="border-b md:border-none block md:table-row">
                <th
                  className="text-left p-3 px-4 bg-purple-300 font-semibold text-sm block md:table-cell cursor-pointer"
                  onClick={() => sortUsers("firstName")}
                >
                  <div className="flex items-center">
                    <span className="mr-2">First Name</span>
                    {getSortIcon("firstName")}
                  </div>
                </th>
                <th
                  className="text-left p-3 px-4 bg-purple-300 font-semibold text-sm block md:table-cell cursor-pointer"
                  onClick={() => sortUsers("lastName")}
                >
                  <div className="flex items-center">
                    <span className="mr-2">Last Name</span>
                    {getSortIcon("lastName")}
                  </div>
                </th>
                <th
                  className="text-left p-3 px-4 bg-purple-300 font-semibold text-sm block md:table-cell cursor-pointer"
                  onClick={() => sortUsers("email")}
                >
                  <div className="flex items-center">
                    <span className="mr-1">Email</span>
                    {getSortIcon("email")}
                  </div>
                </th>
                <th
                  className="text-left p-3 px-4 bg-purple-300 font-semibold text-sm block md:table-cell cursor-pointer"
                  onClick={() => sortUsers("location")}
                >
                  <div className="flex items-center">
                    <span className="mr-2">Location</span>
                    {getSortIcon("location")}
                  </div>
                </th>
                <th className="text-left p-3 px-4 bg-purple-300 font-semibold text-sm block md:table-cell">
                  <div className="flex items-center justify-center">Phone</div>
                </th>
                <th className="text-left p-3 px-4 bg-purple-300 font-semibold text-sm block md:table-cell">
                  <div className="flex items-center justify-center">
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {users.map((user, index) => (
                <tr
                  key={index}
                  className="bg-white border-b md:border-none block md:table-row"
                >
                  <td className="p-2 px-3 block md:table-cell">
                    {user.firstName}
                  </td>
                  <td className="p-2 px-3 block md:table-cell">
                    {user.lastName}
                  </td>
                  <td className="p-2 px-3 block md:table-cell">{user.email}</td>
                  <td className="p-2 px-3 block md:table-cell">
                    {user.location}
                  </td>
                  <td className="p-3 px-3 block md:table-cell">{user.phone}</td>
                  <td className="p-2 px-3 block md:table-cell">
                    <button
                      className="text-blue-500 px-2 py-1 rounded mr-2"
                      onClick={() => handleEditClick(user)}
                    >
                      <FaPen />
                    </button>
                    <button className="text-red-400 px-2 py-1 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <EditUserModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          user={selectedUser}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Users;
