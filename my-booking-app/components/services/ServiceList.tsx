// components/ServiceList.tsx

"use client";
import { Service } from "@/types/service";

type Props = {
  services: Service[];
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
};

export default function ServiceList({ services, onEdit, onDelete }: Props) {
  return (
    <table className="w-full bg-white text-black border rounded-lg shadow-sm">
      <thead className="bg-purple-100">
        <tr>
          <th className="text-left py-3 px-4">Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Extra Notes</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {services.map(service => (
          <tr key={service.id} className="border-t hover:bg-gray-50">
            <td className="py-2 px-4 text-black">{service.name}</td>
            <td className="text-center text-black">{service.category}</td>
            <td className="text-center text-black">{service.price} CAD</td>
            <td className="text-center text-black">{service.extraNotes}</td>
            <td className="text-right space-x-2 px-4">
              <button
                onClick={() => onEdit(service)}
                className="px-3 py-1 text-sm font-medium text-white bg-purple-500 rounded hover:bg-purple-400 transition"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(service.id)}
                className="px-3 py-1 text-sm font-medium text-white bg-purple-500 rounded hover:bg-purple-400 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        {services.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center py-4 text-gray-500">
              No services found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
