import { getSchoolBySubdomain } from "@/lib/db";

export default async function SchoolPage({ params }) {
  const schoolSubdomain = params.school;
  const schoolData = await getSchoolBySubdomain(schoolSubdomain);

  if (!schoolData) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-500 text-center">School not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4 text-center">{schoolData.name}</h1>
      <p className="text-lg mb-2">{schoolData.description}</p>
      <p className="text-gray-600 text-lg">Contact: {schoolData.contact}</p>
    </div>
  );
}
