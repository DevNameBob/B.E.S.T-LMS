import { useState } from 'react';

export default function UserForm({ role = 'learner', onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    grade: '',
    classGroup: '',
    parentName: '',
    relationship: '',
    parentContact: '',
    parentEmail: '',
    address: '',
    allergies: '',
    medicalConditions: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    medicalAid: '',
    ...initialData,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <h3 className="text-lg font-semibold">Basic Info</h3>
      <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} required className="w-full border p-2 rounded" />
      <input name="grade" placeholder="Grade" value={formData.grade} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="classGroup" placeholder="Class Group (e.g. 10A)" value={formData.classGroup} onChange={handleChange} className="w-full border p-2 rounded" />

      <h3 className="text-lg font-semibold mt-6">Parental Info</h3>
      <input name="parentName" placeholder="Parent/Guardian Name" value={formData.parentName} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="relationship" placeholder="Relationship" value={formData.relationship} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="parentContact" placeholder="Parent Contact" value={formData.parentContact} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="parentEmail" placeholder="Parent Email" value={formData.parentEmail} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />

      <h3 className="text-lg font-semibold mt-6">Health & Emergency</h3>
      <input name="allergies" placeholder="Allergies" value={formData.allergies} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="medicalConditions" placeholder="Medical Conditions" value={formData.medicalConditions} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="emergencyContactName" placeholder="Emergency Contact Name" value={formData.emergencyContactName} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="emergencyContactNumber" placeholder="Emergency Contact Number" value={formData.emergencyContactNumber} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="medicalAid" placeholder="Medical Aid Info" value={formData.medicalAid} onChange={handleChange} className="w-full border p-2 rounded" />

      <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
        Save Learner
      </button>
    </form>
  );
}