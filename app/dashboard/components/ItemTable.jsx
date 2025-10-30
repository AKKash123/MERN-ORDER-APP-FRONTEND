"use client";

import { useState } from "react";

export default function ItemTable({ items, setItems }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const [editingItem, setEditingItem] = useState(null);

  // ADD ITEM
  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    if (form.image) formData.append("image", form.image);

    try {
      const res = await fetch("https://mern-order-app-backend.vercel.app/api/items", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add item");

      const newItem = await res.json();
      setItems([...items, newItem]);
      setForm({ name: "", description: "", price: "", stock: "", image: null });
      alert("Item added successfully!");
    } catch (err) {
      console.error(err);
      alert("Error adding item");
    }
  };

  // DELETE ITEM
  const handleDelete = async (id) => {
    await fetch(`https://mern-order-app-backend.vercel.app/api/items/${id}`, { method: "DELETE" });
    setItems(items.filter((item) => item._id !== id));
  };

  // EDIT ITEM
 const handleEditSubmit = async (e) => {
  e.preventDefault();

  if (!editingItem) return;

  const formData = new FormData();
  formData.append("name", editingItem.name || "");
  formData.append("description", editingItem.description || "");
  formData.append("price", editingItem.price || 0);
  formData.append("stock", editingItem.stock || 0);

  // only append image if a new one is selected
  if (editingItem.imageFile instanceof File) {
    formData.append("image", editingItem.imageFile);
  }

  try {
    const res = await fetch(
      `https://mern-order-app-backend.vercel.app/api/items/${editingItem._id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!res.ok) throw new Error("Failed to update item");

    const updated = await res.json();

    // ✅ update state list
    setItems((prev) =>
      prev.map((i) => (i._id === updated._id ? updated : i))
    );

    alert("✅ Item updated successfully!");
    setEditingItem(null);
  } catch (err) {
    console.error("Error updating item:", err);
    alert("❌ Error updating item");
  }
};

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Items</h2>

      {/* ADD ITEM FORM */}
      <form onSubmit={handleAdd} className="flex flex-wrap gap-2 mb-6">
        <input
          type="text"
          placeholder="Item name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded p-2 flex-1"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded p-2 flex-1"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border rounded p-2 w-28"
          required
        />
        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="border rounded p-2 w-28"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500"
        >
          Add
        </button>
      </form>

      {/* ITEMS TABLE */}
      <table className="w-full border-collapse bg-white shadow-md rounded">
        <thead className="bg-indigo-100 text-indigo-800">
          <tr>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length ? (
            items.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="p-3">
                  {item.image ? (
                    <img
                      src={`https://mern-order-app-backend.vercel.app${item.image}`}
                      alt={item.name}
                      className="h-18 w-18 object-cover"
                    />
                  ) : (
                    <div className="h-18 flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  )}
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.description}</td>
                <td className="p-3">₹{item.price}</td>
                <td className="p-3">{item.stock}</td>
                <td className="p-3 flex justify-center gap-2">
                  <button
                    onClick={() => setEditingItem(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-3 text-center text-gray-500">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editingItem && (
        <form onSubmit={handleEditSubmit} className="mt-6 p-4 bg-white rounded shadow-md">
          <h2 className="text-xl font-semibold mb-3">Edit Item</h2>

          <input
            type="text"
            value={editingItem.name}
            onChange={(e) =>
              setEditingItem({ ...editingItem, name: e.target.value })
            }
            placeholder="Item name"
            className="border p-2 w-full mb-2 rounded"
            required
          />
          <input
            type="text"
            value={editingItem.description}
            onChange={(e) =>
              setEditingItem({ ...editingItem, description: e.target.value })
            }
            placeholder="Description"
            className="border p-2 w-full mb-2 rounded"
            required
          />
          <input
            type="number"
            value={editingItem.price}
            onChange={(e) =>
              setEditingItem({ ...editingItem, price: e.target.value })
            }
            placeholder="Price"
            className="border p-2 w-full mb-2 rounded"
            required
          />
          <input
            type="number"
            value={editingItem.stock}
            onChange={(e) =>
              setEditingItem({ ...editingItem, stock: e.target.value })
            }
            placeholder="Stock"
            className="border p-2 w-full mb-2 rounded"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setEditingItem({ ...editingItem, imageFile: e.target.files[0] })
            }
            className="border p-2 w-full mb-3 rounded"
          />

          <div className="flex space-x-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

    </div>
  );
}
