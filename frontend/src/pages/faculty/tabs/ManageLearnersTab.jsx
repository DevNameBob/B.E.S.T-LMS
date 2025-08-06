import { useState, useEffect } from 'react';
import SummaryCard from '../../../components/cards/SummaryCard';
import {
  UserPlusIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import axiosInstance from '../../../api/axiosInstance';

export default function ManageLearnersTab() {
  const [learners, setLearners] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [step, setStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    grade: '',
    status: 'Active',
    address: '',
    allergies: '',
    medicalConditions: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    medicalAid: '',
    parentName: '',
    relationship: '',
    parentContact: '',
    parentEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLearners = async () => {
    try {
      const res = await axiosInstance.get('/learners');
      setLearners(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch learners:', err);
      setLearners([]);
    }
  };

  useEffect(() => {
    fetchLearners();
  }, []);

  useEffect(() => {
    if (expandedId) {
      const learner = learners.find((l) => l._id === expandedId);
      if (learner) setEditForm(learner);
    }
  }, [expandedId, learners]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axiosInstance.post('/learners', form);
      setForm({
        name: '',
        email: '',
        password: '',
        grade: '',
        status: 'Active',
        address: '',
        allergies: '',
        medicalConditions: '',
        emergencyContactName: '',
        emergencyContactNumber: '',
        medicalAid: '',
        parentName: '',
        relationship: '',
        parentContact: '',
        parentEmail: '',
      });
      setShowModal(false);
      setStep(1);
      fetchLearners();
    } catch (err) {
      setError(err.response?.data?.error || 'Enrolment failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this learner?')) return;
    try {
      await axiosInstance.delete(`/learners/${id}`);
      setLearners((prev) => prev.filter((l) => l._id !== id));
      setExpandedId(null);
    } catch (err) {
      console.error('Failed to delete learner:', err);
    }
  };

  const filtered = learners.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard icon={<UserGroupIcon className="w-6 h-6" />} label="Total Learners" value={learners.length} />
        <SummaryCard icon={<UserPlusIcon className="w-6 h-6" />} label="New This Term" value="36" />
        <SummaryCard icon={<ArrowTrendingUpIcon className="w-6 h-6" />} label="Withdrawals" value="5" />
      </div>

      {!expandedId && (
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Manage Learners</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              + Enrol New Learner
            </button>
          </div>

          <div className="relative mb-4">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search learners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded w-full text-sm"
            />
          </div>

          <table className="w-full text-sm text-left">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="py-2">Name</th>
                <th>Email</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((learner) => (
                <tr
                  key={learner._id}
                  className="border-b hover:bg-gray-50 cursor-pointer"
                  onClick={() => setExpandedId(learner._id)}
                >
                  <td className="py-2">{learner.name}</td>
                  <td>{learner.email}</td>
                  <td>{learner.grade}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        learner.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {learner.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 👤 Learner Profile */}
      {expandedId && (
        <div className="bg-white rounded-xl shadow p-6">
          <button
            onClick={() => {
              setExpandedId(null);
              setIsEditing(false);
            }}
            className="mb-4 text-gray-500 hover:text-gray-700"
          >
            ← Back to Learners
          </button>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Learner Profile</h2>
          <div className="space-y-2">
            {[
              ['Email', 'email'],
              ['Password', 'password'],
              ['Grade', 'grade'],
              ['Status', 'status'],
              ['Address', 'address'],
              ['Allergies', 'allergies'],
              ['Medical Conditions', 'medicalConditions'],
              ['Emergency Contact Name', 'emergencyContactName'],
              ['Emergency Contact Number', 'emergencyContactNumber'],
              ['Medical Aid', 'medicalAid'],
              ['Parent Name', 'parentName'],
              ['Relationship', 'relationship'],
              ['Parent Contact', 'parentContact'],
              ['Parent Email', 'parentEmail'],
            ].map(([label, key]) => (
              <div key={key}>
                <strong>{label}:</strong>{' '}
                {key === 'password' ? (
                  isEditing ? (
                    <>
                      <input
                        type="password"
                        name="password"
                        value={editForm.password || ''}
                        onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                        className="border px-2 py-1 rounded text-sm w-full mt-1"
                      />
                      <small className="text-gray-500 block">
                        Changing the password will update their login credentials.
                      </small>
                    </>
                  ) : (
                    <span className="italic text-gray-500">Hidden for security</span>
                  )
                ) : isEditing ? (
                  <input
                    name={key}
                    value={editForm[key] || ''}
                    onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                    className="border px-2 py-1 rounded text-sm w-full mt-1"
                  />
                ) : (
                  <span>{editForm[key] || '—'}</span>
                )}
              </div>
            ))}

            <div className="flex gap-4 mt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={async () => {
                      if (!editForm._id) return console.error('No learner ID found');
                      try {
                        await axiosInstance.put(`/learners/${editForm._id}`, editForm);
                        fetchLearners();
                        setIsEditing(false);
                      } catch (err) {
                        console.error('Failed to update learner:', err);
                      }
                    }}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-indigo-600 hover:underline"
                >
                  Edit Profile
                </button>
              )}
              <button
                onClick={() => {
                  if (!editForm._id) return console.error('No learner ID found');
                  handleDelete(editForm._id);
                }}
                className="text-red-600 hover:underline"
              >
                Delete Learner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧾 Multi-Step Enrolment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setShowModal(false);
                setStep(1);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {step === 1 ? 'Step 1: Learner Info' : 'Step 2: Parental Info'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required className="w-full border rounded px-3 py-2 text-sm" />
                  <small className="text-gray-500 block mb-2">
                    This will be the learner’s login password. You can set it now or let them change it later.
                  </small>
                  <input type="text" placeholder="Grade (e.g. 10)" value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} required className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="text" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="text" placeholder="Allergies" value={form.allergies} onChange={(e) => setForm({ ...form, allergies: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="text" placeholder="Medical Conditions" value={form.medicalConditions} onChange={(e) => setForm({ ...form, medicalConditions: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="text" placeholder="Emergency Contact Name" value={form.emergencyContactName} onChange={(e) => setForm({ ...form, emergencyContactName: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="text" placeholder="Emergency Contact Number" value={form.emergencyContactNumber} onChange={(e) => setForm({ ...form, emergencyContactNumber: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="text" placeholder="Medical Aid Info" value={form.medicalAid} onChange={(e) => setForm({ ...form, medicalAid: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
                  <button type="button" onClick={() => setStep(2)} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                    Next: Parental Info →
                  </button>
                </>
              ) : (
                <>
                  <input type="text" placeholder="Parent/Guardian Name" value={form.parentName} onChange={(e) => setForm({ ...form, parentName: e.target.value })} required className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="text" placeholder="Relationship" value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="text" placeholder="Parent Contact" value={form.parentContact} onChange={(e) => setForm({ ...form, parentContact: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
                  <input type="email" placeholder="Parent Email" value={form.parentEmail} onChange={(e) => setForm({ ...form, parentEmail: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <div className="flex justify-between gap-2">
                    <button type="button" onClick={() => setStep(1)} className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition">
                      ← Back
                    </button>
                    <button type="submit" disabled={loading} className="w-1/2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                                           {loading ? 'Enrolling...' : 'Finish Enrolment'}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}