import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryCard from '../../../components/cards/SummaryCard';
import {
  UserGroupIcon,
  UserPlusIcon,
  ArrowTrendingUpIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

const ManageFacultyTab = () => {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    phone: '',
    subject: '',
    bio: ''
  });

  const fetchFaculty = async () => {
    try {
      const res = await axios.get('/api/faculty');
      setFaculty(res.data);
    } catch (err) {
      console.error('Failed to fetch faculty:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = { ...editForm };
      if (newPassword) payload.password = newPassword;

      await axios.put(`/api/faculty/${editForm._id}`, payload);
      fetchFaculty();
      setIsEditing(false);
      setNewPassword('');
    } catch (err) {
      console.error('Failed to update faculty:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) return;
    try {
      await axios.delete(`/api/faculty/${id}`);
      fetchFaculty();
      setExpandedId(null);
    } catch (err) {
      console.error('Failed to delete faculty:', err);
    }
  };

  const handleHire = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/faculty', newFaculty, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewFaculty({
        name: '',
        email: '',
        password: '',
        role: '',
        phone: '',
        subject: '',
        bio: ''
      });
      setShowModal(false);
      fetchFaculty();
    } catch (err) {
      console.error('❌ Failed to hire faculty:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const filtered = faculty.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* 📊 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard icon={<UserGroupIcon className="w-6 h-6" />} label="Total Faculty" value={faculty.length} />
        <SummaryCard icon={<UserPlusIcon className="w-6 h-6" />} label="New This Term" value="5" />
        <SummaryCard icon={<ArrowTrendingUpIcon className="w-6 h-6" />} label="Departures" value="1" />
      </div>

      {/* 📋 Faculty Table */}
      {!expandedId && (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Manage Faculty</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              + Hire Faculty
            </button>
          </div>

          {/* 🔍 Search */}
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search faculty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded w-full text-sm"
            />
          </div>

          {/* 📄 Table */}
          <table className="w-full text-sm text-left">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr
                  key={f._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setExpandedId(f._id);
                    setEditForm(f);
                    setIsEditing(false);
                  }}
                >
                  <td className="py-2">{f.name}</td>
                  <td>{f.email}</td>
                  <td>{f.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 👤 Expanded Faculty Profile */}
      {expandedId && editForm._id && (
        <div className="mt-10 bg-white rounded-xl shadow-lg p-6 border border-indigo-100">
          <button
            onClick={() => {
              setExpandedId(null);
              setIsEditing(false);
            }}
            className="mb-4 text-indigo-600 hover:underline text-sm"
          >
            Back to Faculty List
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${editForm.name}`}
              alt="Profile"
              className="w-28 h-28 rounded-full border shadow"
            />
            <div className="flex-1 space-y-3 text-sm text-gray-700">
              {[
                ['Name', 'name'],
                ['Email', 'email'],
                ['Phone', 'phone'],
                ['Subject', 'subject'],
                ['Bio', 'bio'],
              ].map(([label, key]) => (
                <div key={key}>
                  <strong>{label}:</strong>{' '}
                  {isEditing ? (
                    <input
                      name={key}
                      value={editForm[key] || ''}
                      onChange={(e) =>
                        setEditForm({ ...editForm, [key]: e.target.value })
                      }
                      className="border px-2 py-1 rounded text-sm w-full mt-1"
                    />
                  ) : (
                    <span>{editForm[key] || '—'}</span>
                  )}
                </div>
              ))}

              {/* 🔐 Password Update */}
              {isEditing && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password"
                      className="border px-3 py-2 rounded w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mt-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setNewPassword('');
                      }}
                      className="text-gray-600 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-indigo-600 hover:underline"
                    >
                      Edit Profile
                    </button>
                    <button
                      onClick={() => handleDelete(editForm._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete Faculty
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ➕ Hire Faculty Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-4">Hire New Faculty</h2>
            <form onSubmit={handleHire} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newFaculty.name}
                onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                required
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={newFaculty.email}
                onChange={(e) => setNewFaculty({ ...newFaculty, email: e.target.value })}
                required
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="password"
                placeholder="Temporary Password"
                value={newFaculty.password}
                onChange={(e) => setNewFaculty({ ...newFaculty, password: e.target.value })}
                required
                className="border px-3 py-2 rounded w-full"
              />
              <select
                value={newFaculty.role}
                onChange={(e) => setNewFaculty({ ...newFaculty, role: e.target.value })}
                required
                className="border px-3 py-2 rounded w-full"
              >
                <option value="">Select Role</option>
                <option value="educator">Educator</option>
                <option value="contentHead">Content Head</option>
                <option value="onboarder">Onboarder</option>
                <option value="announcer">Announcer</option>
              </select>
              <input
                type="text"
                placeholder="Phone Number"
                value={newFaculty.phone}
                onChange={(e) => setNewFaculty({ ...newFaculty, phone: e.target.value })}
                className="border px-3 py-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Subject / Learning Area"
                value={newFaculty.subject}
                onChange={(e) => setNewFaculty({ ...newFaculty, subject: e.target.value })}
                className="border px-3 py-2 rounded w-full"
              />
              <textarea
                placeholder="Short Bio"
                value={newFaculty.bio}
                onChange={(e) => setNewFaculty({ ...newFaculty, bio: e.target.value })}
                className="border px-3 py-2 rounded w-full"
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 w-full"
              >
                Hire Faculty
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageFacultyTab;