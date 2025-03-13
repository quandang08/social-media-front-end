import React, { useState, useEffect } from "react";
import { FaCog, FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { findUserByName, followUserAction } from "../../Store/Auth/Action";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    findUser = [],
    loading,
    error,
    searchQuery,
    user,
  } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const filteredUsers = Array.isArray(findUser)
  ? findUser.filter((foundUser) => foundUser.id !== user.id)
  : [];


  const [localFollowing, setLocalFollowing] = useState(
    new Set(user?.following || [])
  );

  const debouncedSearch = debounce((query) => {
    if (query.trim().length >= 1) {
      dispatch(findUserByName(query));
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm]);

  useEffect(() => {
    // Cập nhật lại danh sách following khi Redux store thay đổi
    setLocalFollowing(new Set(user?.following || []));
  }, [user]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  const handleFollowUser = async (userId) => {
    setLocalFollowing((prevFollowing) => {
      const updatedFollowing = new Set(prevFollowing);
      updatedFollowing.has(userId)
        ? updatedFollowing.delete(userId)
        : updatedFollowing.add(userId);
      return updatedFollowing;
    });

    try {
      await dispatch(followUserAction(userId));
    } catch (error) {
      console.error("Follow user failed", error);

      // Nếu API lỗi thì revert lại
      setLocalFollowing((prevFollowing) => {
        const revertedFollowing = new Set(prevFollowing);
        revertedFollowing.has(userId)
          ? revertedFollowing.delete(userId)
          : revertedFollowing.add(userId);
        return revertedFollowing;
      });
    }
  };

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

      {loading && <p className="text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="mt-4 w-full max-w-2xl">
        <div className="space-y-4">
          {filteredUsers.length > 0
            ? filteredUsers.map((foundUser) => {
                const isFollowing = localFollowing.has(foundUser.id);

                return (
                  <div
                    key={foundUser.id}
                    className="flex items-center justify-between bg-white shadow-md p-4 rounded-xl w-full"
                  >
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handleUserClick(foundUser.id)}
                    >
                      <img
                        src={foundUser.image || "default-avatar.png"}
                        alt={foundUser.fullName}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">
                          {foundUser.fullName}
                        </h2>
                        <p className="text-gray-500 text-sm">{foundUser.bio}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFollowUser(foundUser.id)}
                      className={`px-4 py-2 rounded-lg text-white transition ${
                        isFollowing
                          ? "bg-[#0D8ADF] hover:bg-[#0B7AC0]"
                          : "bg-gray-500 hover:bg-gray-600"
                      }`}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </button>
                  </div>
                );
              })
            : !loading && <p className="text-gray-500 mt-4">No users found</p>}
        </div>
      </div>
    </div>
  );
};

export default Explore;
