import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import toast from "react-hot-toast";

import useAdminUsers from "../../hooks/useAdminUsers";
import useUpdateUserStatus from "../../hooks/useUpdateUserStatus";

const USERS_PER_PAGE = 8;

const headingStyle =
  "px-5 py-4 text-xs font-medium uppercase tracking-wider text-[#76695d]";

const cellStyle = "px-5 py-4";

const buttonStyle =
  "text-sm text-[#b99a63] transition hover:text-[#d1b47a] disabled:cursor-not-allowed disabled:opacity-50";

const pageButtonStyle =
  "rounded-lg border border-[#30271f] px-3 py-2 text-sm text-[#a99b8e] transition hover:border-[#b99a63] hover:text-[#f5efe7] disabled:cursor-not-allowed disabled:opacity-40";

const AdminUsers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [displayUsers, setDisplayUsers] = useState([]);
  const [displayTotalItems, setDisplayTotalItems] = useState(0);

  const updateUserStatus = useUpdateUserStatus();

  const filters = useMemo(
    () => ({
      page,
      perPage: USERS_PER_PAGE,
      search,
      status,
    }),
    [page, search, status]
  );

  const { data, isLoading, isError } = useAdminUsers(filters);

  const queryUsers = data?.data ?? data ?? [];
  const queryTotalItems = data?.items ?? data?.total ?? 0;

  const totalPages = Math.ceil(
    displayTotalItems / USERS_PER_PAGE
  );

  useEffect(() => {
    setDisplayUsers(queryUsers);
    setDisplayTotalItems(queryTotalItems);
  }, [queryUsers, queryTotalItems]);

  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const handleStatusChange = (user) => {
    if (user.role === "admin") {
      toast.error("Admin accounts cannot be blocked or unblocked.");
      return;
    }

    const isBlocking = !user.isBlock;

    updateUserStatus.mutate(
      {
        userId: user.id,
        isBlock: isBlocking,
      },
      {
        onSuccess: (updatedUser) => {
          const updatedId = updatedUser?.id ?? user.id;
          const updatedIsBlock =
            updatedUser?.isBlock ?? isBlocking;

          const shouldRemove =
            (status === "active" && updatedIsBlock) ||
            (status === "blocked" && !updatedIsBlock);

          if (shouldRemove) {
            setDisplayUsers((prev) =>
              prev.filter(
                (item) =>
                  String(item.id) !== String(updatedId)
              )
            );

            setDisplayTotalItems((prev) =>
              Math.max(0, prev - 1)
            );
          } else {
            setDisplayUsers((prev) =>
              prev.map((item) =>
                String(item.id) === String(updatedId)
                  ? { ...item, isBlock: updatedIsBlock }
                  : item
              )
            );
          }

          toast.success(
            updatedIsBlock
              ? "User blocked successfully"
              : "User unblocked successfully"
          );
        },

        onError: (error) => {
          console.error(
            "Failed to update user status:",
            error
          );

          toast.error("Unable to update user status");
        },
      }
    );
  };

  return (
    <section className="flex h-full min-h-0 flex-col gap-6">

      {/* Fixed Page Header */}
      <div className="shrink-0">
        <h1 className="font-serif text-2xl text-[#f5efe7]">
          Users
        </h1>

        <p className="mt-1 text-sm text-[#8f8174]">
          Manage and view registered customers.
        </p>
      </div>

      {/* Fixed Search and Status Filter */}
      <div className="shrink-0 rounded-xl border border-[#30271f] bg-[#17120f] p-4">
        <div className="flex flex-col gap-3 md:flex-row">

          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76695d]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-lg border border-[#30271f] bg-[#100c0a] py-2.5 pl-10 pr-4 text-sm text-[#f5efe7] outline-none placeholder:text-[#665a50] focus:border-[#b99a63]"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-[#30271f] bg-[#100c0a] px-4 py-2.5 text-sm text-[#f5efe7] outline-none focus:border-[#b99a63]"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>

        </div>
      </div>

      {/* Only Users List Scrolls */}
      <div className="min-h-0 flex-1 overflow-auto overscroll-contain">

        {isLoading && !data ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-[#8f8174]">
              Loading users...
            </p>
          </div>
        ) : isError && !data ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-red-400">
              Unable to load users.
            </p>
          </div>
        ) : (
          <>

            {/* Desktop Table */}
            <div className="hidden rounded-xl border border-[#30271f] bg-[#17120f] md:block">
              <table className="w-full min-w-212.5">

                <thead className="sticky top-0 z-20 bg-[#17120f] shadow-[0_1px_0_#30271f]">
                  <tr className="border-b border-[#30271f] text-left">
                    {[
                      "User",
                      "Email",
                      "Status",
                      "Role",
                      "Joined",
                      "Action",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className={headingStyle}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {displayUsers.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-12 text-center text-sm text-[#76695d]"
                      >
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    displayUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-[#30271f] last:border-b-0"
                      >
                        <td className={cellStyle}>
                          <p className="text-sm font-medium text-[#f5efe7]">
                            {user.name}
                          </p>
                        </td>

                        <td className={`${cellStyle} text-sm text-[#a99b8e]`}>
                          {user.email}
                        </td>

                        <td className={cellStyle}>
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              user.isBlock
                                ? "bg-red-500/10 text-red-400"
                                : "bg-emerald-500/10 text-emerald-400"
                            }`}
                          >
                            {user.isBlock
                              ? "Blocked"
                              : "Active"}
                          </span>
                        </td>

                        <td className={`${cellStyle} text-sm capitalize text-[#a99b8e]`}>
                          {user.role}
                        </td>

                        <td className={`${cellStyle} text-sm text-[#a99b8e]`}>
                          {user.created_at
                            ? new Date(
                                user.created_at
                              ).toLocaleDateString()
                            : "—"}
                        </td>

                        <td className={cellStyle}>
                          <button
                            type="button"
                            onClick={() =>
                              handleStatusChange(user)
                            }
                            disabled={
                              updateUserStatus.isPending ||
                              user.role === "admin"
                            }
                            className={buttonStyle}
                          >
                            {user.role === "admin"
                              ? "Protected"
                              : user.isBlock
                                ? "Unblock"
                                : "Block"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">
              {displayUsers.length === 0 ? (
                <div className="rounded-xl border border-[#30271f] bg-[#17120f] px-5 py-12 text-center text-sm text-[#76695d]">
                  No users found.
                </div>
              ) : (
                displayUsers.map((user) => (
                  <div
                    key={user.id}
                    className="rounded-xl border border-[#30271f] bg-[#17120f] p-4"
                  >
                    <div className="flex items-start justify-between gap-4">

                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-[#f5efe7]">
                          {user.name}
                        </p>

                        <p className="mt-1 truncate text-sm text-[#8f8174]">
                          {user.email}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                          user.isBlock
                            ? "bg-red-500/10 text-red-400"
                            : "bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        {user.isBlock
                          ? "Blocked"
                          : "Active"}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#30271f] pt-4">

                      <div>
                        <p className="text-xs text-[#665a50]">
                          Role
                        </p>

                        <p className="mt-1 text-sm capitalize text-[#a99b8e]">
                          {user.role}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-[#665a50]">
                          Joined
                        </p>

                        <p className="mt-1 text-sm text-[#a99b8e]">
                          {user.created_at
                            ? new Date(
                                user.created_at
                              ).toLocaleDateString()
                            : "—"}
                        </p>
                      </div>

                    </div>

                    <div className="mt-4 border-t border-[#30271f] pt-4">
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(user)
                        }
                        disabled={
                          updateUserStatus.isPending ||
                          user.role === "admin"
                        }
                        className={buttonStyle}
                      >
                        {user.role === "admin"
                          ? "Protected"
                          : user.isBlock
                            ? "Unblock"
                            : "Block"}
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>

          </>
        )}

      </div>

      {/* Fixed Pagination */}
      {totalPages > 1 && (
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#30271f] pt-4">
          <p className="text-sm text-[#76695d]">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => Math.max(prev - 1, 1))
              }
              className={pageButtonStyle}
            >
              Previous
            </button>

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              className={pageButtonStyle}
            >
              Next
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

export default AdminUsers;