"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [credentials, setCredentials] = useState({ userId: "", password: "" });
  const [error, setError] = useState(null);
  const [schoolData, setSchoolData] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "", contact: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      userId: credentials.userId,
      password: credentials.password,
    });

    if (res?.error) {
      setError("Invalid credentials");
    }
  };

  // When logged in, fetch school data using the schoolId from session
  useEffect(() => {
    async function fetchSchoolData() {
      if (session?.user?.schoolId) {
        setLoading(true);
        try {
          const response = await fetch(`/api/schools/${session.user.schoolId}`);
          if (!response.ok) throw new Error("Failed to fetch school data");
          const data = await response.json();
          setSchoolData(data);
          setFormData({
            name: data.name,
            description: data.description,
            contact: data.contact,
          });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchSchoolData();
  }, [session]);

  // Handler to update school data
  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(`/api/schools/${session.user.schoolId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Update failed");
      } else {
        setSchoolData(result);
        alert("School updated successfully!");
      }
    } catch (err) {
      setError("Update failed!");
    }
  };

  // If not logged in, show login form
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl">Admin Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin} className="mt-4 flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Admin Email"
            value={credentials.userId}
            onChange={(e) =>
              setCredentials({ ...credentials, userId: e.target.value })
            }
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            className="p-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </form>
      </div>
    );
  }

  // After successful login, display the admin edit form
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl mb-4">Welcome, {session.user.name} (Admin)</h1>
      <button
        onClick={() => signOut()}
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>

      {loading ? (
        <p>Loading school data...</p>
      ) : schoolData ? (
        <div className="max-w-lg w-full bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Edit {schoolData.name}</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleUpdate} className="space-y-4">
            <label className="block">
              <span className="text-gray-700">School Name</span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Description</span>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Contact</span>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
                className="mt-1 p-2 border rounded w-full"
              />
            </label>

            <button type="submit" className="w-full px-4 py-2 bg-green-500 text-white rounded">
              Update School Info
            </button>
          </form>
        </div>
      ) : (
        <p>No school data found.</p>
      )}
    </div>
  );
}
