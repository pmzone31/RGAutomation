import React, { useState } from 'react';

export default function AppForm() {
  const [formData, setFormData] = useState({
    appName: '',
    businessUnit: '',
    environment: '',
    appOwner: '',
    internetAccessible: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://qargui.azurewebsites.net/api/myfunc?', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Submission failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register Your Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'App Name', name: 'appName' },
          { label: 'Business Unit', name: 'businessUnit' },
          { label: 'App Owner', name: 'appOwner' }
        ].map(({ label, name }) => (
          <div key={name}>
            <label className="block font-semibold mb-1">{label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div>
          <label className="block font-semibold mb-1">Environment</label>
          <select
            name="environment"
            value={formData.environment}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select--</option>
            <option value="Development">Development</option>
            <option value="Staging">Staging</option>
            <option value="Production">Production</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Internet Accessible</label>
          <select
            name="internetAccessible"
            value={formData.internetAccessible}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">--Select--</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
