import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      if (res.ok) {
        fetchProjects(); // refresh list
      } else {
        alert('Failed to delete project');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    }
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-foreground">Projects Management</h2>
        <Link to="/admin/projects/new" className="bg-gold text-white px-6 py-3 rounded-full font-bold hover:bg-gold/90 transition-all hover-scale shadow-sm">
          + Add New Project
        </Link>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden border border-white/40 shadow-sm relative z-10">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No projects found. Add one to get started!</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 font-semibold text-gray-600">Project Name</th>
                <th className="p-4 font-semibold text-gray-600">Location</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map(project => (
                <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium">{project.name}</td>
                  <td className="p-4 text-gray-500">{project.location}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      project.status === 'Ongoing' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'New Launch' ? 'bg-purple-100 text-purple-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link to={`/admin/projects/edit/${project._id}`} className="text-blue-600 font-medium hover:underline mr-4">Edit</Link>
                    <button onClick={() => handleDelete(project._id)} className="text-red-500 font-medium hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
