import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  createMenuCard,
  createMenuItem,
  deleteMenuItem,
  getMenuCardByRestaurant,
  updateMenuItem,
} from "../api/menuApi";
import type { MenuCard, MenuItem } from "../types/menu.types";

const MenuPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();

  const [menuCard, setMenuCard] = useState<MenuCard | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [menuCardTitle, setMenuCardTitle] = useState("Main Menu");
  const [menuCardDescription, setMenuCardDescription] = useState("");
  const [creatingMenuCard, setCreatingMenuCard] = useState(false);

  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemAvailable, setItemAvailable] = useState(true);
  const [itemLoading, setItemLoading] = useState(false);

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editAvailable, setEditAvailable] = useState(true);

  const [error, setError] = useState("");

  const groupedItems = useMemo(() => {
    const groups: Record<string, MenuItem[]> = {};

    for (const item of menuItems) {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    }

    return groups;
  }, [menuItems]);

  useEffect(() => {
    if (restaurantId) {
      fetchMenuData();
    }
  }, [restaurantId]);

  const fetchMenuData = async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);
      setError("");

      const data = await getMenuCardByRestaurant(restaurantId);
      setMenuCard(data.menuCard);
      setMenuItems(data.menuItems || []);
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setMenuCard(null);
        setMenuItems([]);
      } else {
        setError("Failed to fetch menu data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMenuCard = async () => {
    if (!restaurantId) return;

    try {
      setCreatingMenuCard(true);
      setError("");

      await createMenuCard(restaurantId, {
        title: menuCardTitle,
        description: menuCardDescription,
      });

      await fetchMenuData();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create menu card");
    } finally {
      setCreatingMenuCard(false);
    }
  };

  const handleCreateMenuItem = async () => {
    if (!restaurantId) return;

    try {
      setItemLoading(true);
      setError("");

      await createMenuItem(restaurantId, {
        name: itemName,
        description: itemDescription,
        category: itemCategory,
        price: Number(itemPrice),
        isAvailable: itemAvailable,
      });

      setItemName("");
      setItemDescription("");
      setItemCategory("");
      setItemPrice("");
      setItemAvailable(true);

      await fetchMenuData();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create menu item");
    } finally {
      setItemLoading(false);
    }
  };

  const startEdit = (item: MenuItem) => {
    setEditingItemId(item._id);
    setEditName(item.name);
    setEditDescription(item.description || "");
    setEditCategory(item.category);
    setEditPrice(String(item.price));
    setEditAvailable(item.isAvailable);
  };

  const cancelEdit = () => {
    setEditingItemId(null);
    setEditName("");
    setEditDescription("");
    setEditCategory("");
    setEditPrice("");
    setEditAvailable(true);
  };

  const handleUpdateItem = async (itemId: string) => {
    if (!restaurantId) return;

    try {
      setError("");

      await updateMenuItem(restaurantId, itemId, {
        name: editName,
        description: editDescription,
        category: editCategory,
        price: Number(editPrice),
        isAvailable: editAvailable,
      });

      cancelEdit();
      await fetchMenuData();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update menu item");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!restaurantId) return;

    try {
      setError("");
      await deleteMenuItem(restaurantId, itemId);
      await fetchMenuData();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to delete menu item");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-neutral-950">Menu Management</h1>
            <p className="text-sm text-neutral-500">
              Create the menu card and manage menu items
            </p>
          </div>

          <Link
            to="/restaurants"
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Back to restaurants
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center text-neutral-500">
            Loading menu...
          </div>
        ) : !menuCard ? (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border border-neutral-200 bg-white p-8">
              <h2 className="text-3xl font-bold tracking-tight text-neutral-950">
                Create menu card
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">
                This restaurant can have one menu card. Create it first, then add
                menu items under it.
              </p>

              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Menu title
                  </label>
                  <input
                    type="text"
                    value={menuCardTitle}
                    onChange={(e) => setMenuCardTitle(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                    placeholder="Main Menu"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-neutral-700">
                    Description
                  </label>
                  <textarea
                    value={menuCardDescription}
                    onChange={(e) => setMenuCardDescription(e.target.value)}
                    className="min-h-[120px] w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-950"
                    placeholder="Short menu description"
                  />
                </div>

                <button
                  onClick={handleCreateMenuCard}
                  disabled={creatingMenuCard}
                  className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#06C167] px-4 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
                >
                  {creatingMenuCard ? "Creating menu..." : "Create menu card"}
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-8">
              <div className="rounded-3xl bg-neutral-950 p-8 text-white">
                <p className="text-sm text-neutral-300">Next step</p>
                <h3 className="mt-2 text-2xl font-bold">Add dishes and categories</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-300">
                  Once the menu card is created, you can add menu items like
                  meals, drinks, desserts, and mark them available or unavailable.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                <p className="text-sm text-neutral-500">Menu card</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950">
                  {menuCard.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  {menuCard.description || "No description added"}
                </p>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                <h3 className="text-xl font-bold text-neutral-950">Add menu item</h3>
                <p className="mt-1 text-sm text-neutral-500">
                  Create dishes under the restaurant menu
                </p>

                <div className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Item name
                    </label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                      placeholder="Chicken Kottu"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Description
                    </label>
                    <textarea
                      value={itemDescription}
                      onChange={(e) => setItemDescription(e.target.value)}
                      className="min-h-[100px] w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-950"
                      placeholder="Short dish description"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">
                        Category
                      </label>
                      <input
                        type="text"
                        value={itemCategory}
                        onChange={(e) => setItemCategory(e.target.value)}
                        className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                        placeholder="Main Course"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-700">
                        Price
                      </label>
                      <input
                        type="number"
                        value={itemPrice}
                        onChange={(e) => setItemPrice(e.target.value)}
                        className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                        placeholder="1200"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-neutral-200 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">
                          Availability
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          Set whether this item is currently available
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setItemAvailable((prev) => !prev)}
                        className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                          itemAvailable
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {itemAvailable ? "Available" : "Unavailable"}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handleCreateMenuItem}
                    disabled={itemLoading}
                    className="flex h-14 w-full items-center justify-center rounded-2xl bg-neutral-950 px-4 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
                  >
                    {itemLoading ? "Adding item..." : "Add menu item"}
                  </button>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-950">
                    Menu items
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    Organised by category
                  </p>
                </div>

                <div className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
                  {menuItems.length} items
                </div>
              </div>

              {menuItems.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-neutral-200 p-8 text-center text-sm text-neutral-500">
                  No menu items yet
                </div>
              ) : (
                <div className="mt-6 space-y-6">
                  {Object.entries(groupedItems).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                        {category}
                      </h4>

                      <div className="space-y-3">
                        {items.map((item) => {
                          const isEditing = editingItemId === item._id;

                          return (
                            <div
                              key={item._id}
                              className="rounded-2xl border border-neutral-200 p-4"
                            >
                              {!isEditing ? (
                                <>
                                  <div className="flex items-start justify-between gap-4">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h5 className="text-lg font-semibold text-neutral-950">
                                          {item.name}
                                        </h5>
                                        <span
                                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                                            item.isAvailable
                                              ? "bg-green-100 text-green-700"
                                              : "bg-red-100 text-red-700"
                                          }`}
                                        >
                                          {item.isAvailable
                                            ? "Available"
                                            : "Unavailable"}
                                        </span>
                                      </div>

                                      <p className="mt-2 text-sm leading-6 text-neutral-500">
                                        {item.description || "No description"}
                                      </p>
                                    </div>

                                    <p className="text-base font-bold text-neutral-950">
                                      Rs. {item.price}
                                    </p>
                                  </div>

                                  <div className="mt-4 flex gap-2">
                                    <button
                                      onClick={() => startEdit(item)}
                                      className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteItem(item._id)}
                                      className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </>
                              ) : (
                                <div className="space-y-4">
                                  <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                                  />

                                  <textarea
                                    value={editDescription}
                                    onChange={(e) =>
                                      setEditDescription(e.target.value)
                                    }
                                    className="min-h-[90px] w-full rounded-xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-950"
                                  />

                                  <div className="grid gap-3 sm:grid-cols-3">
                                    <input
                                      type="text"
                                      value={editCategory}
                                      onChange={(e) =>
                                        setEditCategory(e.target.value)
                                      }
                                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                                    />
                                    <input
                                      type="number"
                                      value={editPrice}
                                      onChange={(e) => setEditPrice(e.target.value)}
                                      className="h-12 w-full rounded-xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                                    />
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setEditAvailable((prev) => !prev)
                                      }
                                      className={`rounded-xl px-4 py-2 text-sm font-medium ${
                                        editAvailable
                                          ? "bg-green-100 text-green-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {editAvailable
                                        ? "Available"
                                        : "Unavailable"}
                                    </button>
                                  </div>

                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleUpdateItem(item._id)}
                                      className="rounded-xl bg-neutral-950 px-4 py-2 text-sm font-semibold text-white"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={cancelEdit}
                                      className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;