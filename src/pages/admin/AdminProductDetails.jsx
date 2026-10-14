
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import useAdminProductDetails from "../../hooks/useAdminProductDetails";
import { updateProduct } from "../../services/productService";

const categories = ["Oud", "Amber", "Musk", "Spicy"];

const brands = [
  "Ahmed Al Maghribi",
  "Ajmal",
  "Arabian Oud",
  "Afnan",
  "Swiss Arabian",
];

const productOptions = [
  {
    name: "isActive",
    label: "Active",
    description: "Make this product visible in the store.",
  },
  {
    name: "isFeatured",
    label: "Featured",
    description: "Show this product as a featured product.",
  },
  {
    name: "isTrending",
    label: "Trending",
    description: "Mark this product as trending.",
  },
];

const inputStyle =
  "w-full rounded-lg border border-[#3a3028] bg-[#0f0c0a] px-4 py-2.5 text-sm text-[#f5efe6] outline-none focus:border-[#b99a63]";

const labelStyle = "mb-2 block text-sm text-[#a79d93]";

const titleStyle = "font-serif text-xl text-[#f5efe6]";

const AdminProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isError,
  } = useAdminProductDetails(id);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    size: "",
    image: "",
    price: "",
    count: "",
    description: "",
    isActive: true,
    isFeatured: false,
    isTrending: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [loadedProductId, setLoadedProductId] =
    useState(null);

  useEffect(() => {
    if (!product) return;

    setForm({
      name: product.name || "",
      brand: product.brand || "",
      category: product.category || "",
      size: product.size || "",
      image: product.image || "",
      price: product.price ?? "",
      count: product.count ?? "",
      description: product.description || "",
      isActive: Boolean(product.isActive),
      isFeatured: Boolean(product.isFeatured),
      isTrending: Boolean(product.isTrending),
    });

    setLoadedProductId(String(product.id));
  }, [product]);

  // Detect actual changes in the form
  const isDirty =
    Boolean(product) &&
    loadedProductId === String(product.id) &&
    Object.keys(form).some((key) => {
      if (
        ["isActive", "isFeatured", "isTrending"].includes(key)
      ) {
        return form[key] !== Boolean(product[key]);
      }

      if (["price", "count"].includes(key)) {
        return (
          String(form[key]) !== String(product[key] ?? "") &&
          (
            form[key] === "" ||
            product[key] == null ||
            Number(form[key]) !== Number(product[key])
          )
        );
      }

      return (
        String(form[key] ?? "") !==
        String(product[key] ?? "")
      );
    });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const goBack = () => navigate("/admin/products");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isDirty || isSaving) return;

    if (!form.name.trim()) {
      toast.error("Product name is required.");
      return;
    }

    if (!form.brand) {
      toast.error("Please select a brand.");
      return;
    }

    if (!form.category) {
      toast.error("Please select a category.");
      return;
    }

    if (form.price === "" || Number(form.price) < 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    if (
      form.count === "" ||
      !Number.isInteger(Number(form.count)) ||
      Number(form.count) < 0
    ) {
      toast.error("Please enter valid stock.");
      return;
    }

    const slug = form.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const updatedProduct = {
      name: form.name.trim(),
      slug,
      brand: form.brand,
      category: form.category,
      size: form.size.trim(),
      image: form.image.trim(),
      price: Number(form.price),
      count: Number(form.count),
      description: form.description.trim(),
      isActive: form.isActive,
      isFeatured: form.isFeatured,
      isTrending: form.isTrending,
    };

    setIsSaving(true);

    try {
      await updateProduct(id, updatedProduct);

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success("Product updated successfully.");
      goBack();
    } catch (error) {
      console.error("Product update error:", error);

      toast.error(
        error?.message || "Unable to update product."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="flex h-full min-h-0 flex-col gap-6">

      {/* Fixed Header */}
      <div className="shrink-0">
        <button
          type="button"
          onClick={goBack}
          className="mb-4 flex items-center gap-2 text-sm text-[#8e8175] transition hover:text-[#f5efe6]"
        >
          <ArrowLeft size={17} />
          Back to Products
        </button>

        <h1 className="font-serif text-2xl text-[#f5efe6] sm:text-3xl">
          Edit Product
        </h1>

        <p className="mt-2 text-sm text-[#8e8175]">
          Update product information and inventory.
        </p>
      </div>

      {isLoading ? (
        <div className="flex min-h-0 flex-1 items-center justify-center">
          <p className="text-sm text-[#8e8175]">
            Loading product...
          </p>
        </div>
      ) : isError || !product ? (
        <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-6">
          <p className="text-sm text-red-400">
            Unable to load this product.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >
          {/* Only Form Content Scrolls */}
          <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overscroll-contain pr-1 pb-6">

            {/* Product Information */}
            <div className="rounded-xl border border-[#3a3028] bg-[#120f0d] p-5 sm:p-6">
              <h2 className={titleStyle}>
                Product Information
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Name */}
                <div>
                  <label htmlFor="name" className={labelStyle}>
                    Product Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>

                {/* Size */}
                <div>
                  <label htmlFor="size" className={labelStyle}>
                    Size
                  </label>

                  <input
                    id="size"
                    name="size"
                    type="text"
                    value={form.size}
                    onChange={handleChange}
                    className={inputStyle}
                  />
                </div>

                {/* Image */}
                <div>
                  <label htmlFor="image" className={labelStyle}>
                    Image Path
                  </label>

                  <input
                    id="image"
                    name="image"
                    type="text"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="/products/product19.jpg"
                    className={`${inputStyle} placeholder:text-[#6f6257]`}
                  />

                  {form.image && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs text-[#8e8175]">
                        Current Image
                      </p>

                      <img
                        src={form.image}
                        alt={form.name}
                        className="h-40 w-40 rounded-lg border border-[#3a3028] object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Brand */}
                <div>
                  <label htmlFor="brand" className={labelStyle}>
                    Brand
                  </label>

                  <select
                    id="brand"
                    name="brand"
                    value={form.brand}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  >
                    <option value="">Select Brand</option>

                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className={labelStyle}>
                    Category
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  >
                    <option value="">Select Category</option>

                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
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
                    value={form.price}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>

                {/* Stock */}
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
                    value={form.count}
                    onChange={handleChange}
                    className={inputStyle}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-5">
                <label
                  htmlFor="description"
                  className={labelStyle}
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  value={form.description}
                  onChange={handleChange}
                  className={`${inputStyle} resize-none py-3`}
                />
              </div>
            </div>

            {/* Product Status */}
            <div className="rounded-xl border border-[#3a3028] bg-[#120f0d] p-5 sm:p-6">
              <h2 className={titleStyle}>
                Product Status
              </h2>

              <div className="mt-5 space-y-4">
                {productOptions.map((option) => (
                  <label
                    key={option.name}
                    className="flex cursor-pointer items-center justify-between gap-4"
                  >
                    <div>
                      <p className="text-sm text-[#f5efe6]">
                        {option.label}
                      </p>

                      <p className="mt-1 text-xs text-[#8e8175]">
                        {option.description}
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      name={option.name}
                      checked={form[option.name]}
                      onChange={handleChange}
                      className="h-4 w-4 accent-[#b99a63]"
                    />
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Fixed Action Buttons */}
          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-[#3a3028] bg-[#0b0908] pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={goBack}
              className="rounded-lg border border-[#3a3028] px-5 py-2.5 text-sm text-[#a79d93] transition hover:border-[#b99a63] hover:text-[#f5efe6]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!isDirty || isSaving}
              className="rounded-lg bg-[#b99a63] px-5 py-2.5 text-sm font-medium text-[#120f0d] transition hover:bg-[#c9ac78] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default AdminProductDetails;
