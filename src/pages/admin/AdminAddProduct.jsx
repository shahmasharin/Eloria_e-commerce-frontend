import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../services/axios";

const inputStyle =
  "w-full rounded-lg border border-[#2b2520] bg-[#0b0908] px-4 py-3 text-sm text-[#f5efe6] outline-none focus:border-[#b99a63]";

const labelStyle = "mb-2 block text-sm text-[#bdb3a8]";

const brands = [
  "Ahmed Al Maghribi",
  "Ajmal",
  "Arabian Oud",
  "Afnan",
  "Swiss Arabian",
];

const categories = ["Oud", "Amber", "Musk", "Spicy"];

const initialFormData = {
  name: "",
  brand: "",
  category: "",
  size: "",
  price: "",
  count: "",
  description: "",
  image: "",
  isActive: true,
  isFeatured: false,
  isTrending: false,
};

const AdminAddProduct = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ...initialFormData,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Enable the button only when form values change
  const isDirty = Object.keys(initialFormData).some(
    (key) => formData[key] !== initialFormData[key]
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isDirty || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const slug = formData.name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const product = {
        ...formData,
        slug,
        price: Number(formData.price),
        count: Number(formData.count),
        created_at: new Date().toISOString(),
      };

      await api.post("/products", product);

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (error) {
      console.error("Product creation error:", error);
      toast.error("Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex h-full min-h-0 max-w-4xl flex-col">
      {/* Fixed Header */}
      <div className="mb-6 shrink-0">
        <button
          type="button"
          onClick={() => navigate("/admin/products")}
          className="mb-6 flex items-center gap-2 text-sm text-[#b99a63] hover:text-[#d4b77c]"
        >
          <ArrowLeft size={18} />
          Back to Products
        </button>

        <h1 className="font-serif text-2xl text-[#f5efe6]">
          Add Product
        </h1>

        <p className="mt-1 text-sm text-[#8f867d]">
          Add a new product to your ÉLORIA collection.
        </p>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#2b2520] bg-[#120f0d]"
      >
        {/* Only Form Fields Scroll */}
        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain p-5 sm:p-6">
          {/* Product Information */}
          <section>
            <h2 className="mb-4 text-lg font-medium text-[#f5efe6]">
              Product Information
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className={labelStyle}>
                  Product Name
                </label>

                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Oud Royal"
                  className={inputStyle}
                  required
                />
              </div>

              <div>
                <label htmlFor="brand" className={labelStyle}>
                  Brand
                </label>

                <select
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >
                  <option value="">Select brand</option>

                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="category" className={labelStyle}>
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                >
                  <option value="">Select category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="size" className={labelStyle}>
                  Size
                </label>

                <input
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="e.g. 100ml"
                  className={inputStyle}
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className={labelStyle}>
                  Price
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 299"
                  className={inputStyle}
                  required
                />
              </div>

              <div>
                <label htmlFor="count" className={labelStyle}>
                  Stock
                </label>

                <input
                  id="count"
                  name="count"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.count}
                  onChange={handleChange}
                  placeholder="e.g. 25"
                  className={inputStyle}
                  required
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <label htmlFor="description" className={labelStyle}>
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe the fragrance..."
              className={`${inputStyle} resize-none`}
              required
            />
          </section>

          {/* Image */}
          <section>
            <label htmlFor="image" className={labelStyle}>
              Image Path
            </label>

            <input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/products/oud-royal.jpg"
              className={inputStyle}
              required
            />

            <p className="mt-2 text-xs text-[#6f675f]">
              Use an existing image path from public/products/.
            </p>
          </section>

          {/* Product Options */}
          <section>
            <h2 className="mb-4 text-lg font-medium text-[#f5efe6]">
              Product Options
            </h2>

            <div className="space-y-3">
              {[
                ["isActive", "Active product"],
                ["isFeatured", "Featured product"],
                ["isTrending", "Trending product"],
              ].map(([name, label]) => (
                <label
                  key={name}
                  className="flex cursor-pointer items-center gap-3 text-sm text-[#bdb3a8]"
                >
                  <input
                    type="checkbox"
                    name={name}
                    checked={formData[name]}
                    onChange={handleChange}
                    className="h-4 w-4 accent-[#b99a63]"
                  />
                  {label}
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* Fixed Action Buttons */}
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-[#2b2520] bg-[#120f0d] p-5 sm:flex-row sm:justify-end sm:p-6">
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="rounded-lg border border-[#2b2520] px-5 py-3 text-sm text-[#bdb3a8] transition hover:border-[#4a3d32] hover:text-[#f5efe6]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!isDirty || isSubmitting}
            className="rounded-lg bg-[#b99a63] px-5 py-3 text-sm font-medium text-[#0b0908] transition hover:bg-[#d4b77c] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProduct;
