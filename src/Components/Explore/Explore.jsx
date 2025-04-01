import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FaCog, FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { findUserByName, followUserAction } from "../../Store/Auth/Action";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";

const Loading = () => <p className="text-gray-500 mt-4">Loading...</p>;
const ErrorMessage = ({ error }) => <p className="text-red-500 mt-4">{error}</p>;

const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { findUser, loading, error, searchQuery, user } = useSelector(
    (state) => state.auth
  );
  
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const [localFollowing, setLocalFollowing] = useState(
    new Set(user?.following || [])
  );

  const filteredUsers = useMemo(
    () =>
      Array.isArray(findUser)
        ? findUser.filter((foundUser) => foundUser.id !== user?.id)
        : [],
    [findUser, user?.id]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        if (query.trim().length >= 1) dispatch(findUserByName(query));
      }, 500),
    [dispatch]
  );

  useEffect(() => {
    if (searchTerm.trim() !== searchQuery) {
      debouncedSearch(searchTerm);
    }
    return () => debouncedSearch.cancel();
  }, [searchTerm, searchQuery, debouncedSearch]);

  useEffect(() => {
    setLocalFollowing(new Set(user?.following || []));
  }, [user?.following]);

  const handleSearch = useCallback((e) => setSearchTerm(e.target.value), []);

  const handleUserClick = useCallback(
    (userId) => navigate(`/profile/${userId}`),
    [navigate]
  );

  const handleFollowUser = useCallback(
    async (userId) => {
      setLocalFollowing((prev) => {
        const updated = new Set(prev);
        updated.has(userId) ? updated.delete(userId) : updated.add(userId);
        return updated;
      });

      try {
        await dispatch(followUserAction(userId));
      } catch (error) {
        setLocalFollowing((prev) => {
          const reverted = new Set(prev);
          reverted.has(userId) ? reverted.delete(userId) : reverted.add(userId);
          return reverted;
        });
      }
    },
    [dispatch]
  );

  return (
    <div className="max-w-3xl mx-4 p-4">
      <div className="flex items-center gap-3">
        <div className="relative w-full max-w-2xl">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search users..."
            className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-10 pr-12 text-gray-700 outline-none focus:ring-2 focus:ring-gray-400"
          />
          {searchTerm && (
            <FaTimes
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
        <FaCog className="text-gray-500 cursor-pointer hover:text-gray-700" />
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}

      <div className="mt-4 w-full max-w-2xl">
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((foundUser) => (
              <UserCard
                key={foundUser.id}
                user={foundUser}
                isFollowing={localFollowing.has(foundUser.id)}
                onFollow={handleFollowUser}
                onClick={handleUserClick}
              />
            ))
          ) : (
            !loading && <p className="text-gray-500 mt-4">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;