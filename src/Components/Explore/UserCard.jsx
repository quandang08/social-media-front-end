import React, { memo } from 'react';
import PropTypes from 'prop-types';

const UserCard = memo(({ user, isFollowing, onFollow, onClick }) => {
  // Hàm trích xuất phần tên email trước @
  const getEmailName = (email) => {
    if (!email) return '';
    return "@"+ email.split('@')[0]; // Lấy phần trước ký tự @
  };

  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4 rounded-xl w-full">
      <div className="flex items-center cursor-pointer" onClick={() => onClick(user.id)}>
        <img
          src={user.image || "default-avatar.png"}
          alt={user.fullName}
          className="w-12 h-12 rounded-full mr-4"
          loading="lazy"
        />
        <div>
          <h2 className="text-lg font-semibold">{user.fullName}</h2>
          {/* Hiển thị phần tên email thay vì bio */}
          <p className="text-gray-500 text-sm">
            {getEmailName(user.email)}
          </p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onFollow(user.id);
        }}
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
});

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string, // Thêm propType cho email
    bio: PropTypes.string // Vẫn giữ lại nếu cần dùng ở nơi khác
  }).isRequired,
  isFollowing: PropTypes.bool.isRequired,
  onFollow: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default UserCard;