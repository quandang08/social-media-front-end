import React, { useState } from "react";
import { Search, Users } from "lucide-react";

const communitiesData = [
  {
    category: "Sports",
    communities: [
      { id: 1, name: "Football Lovers", members: 12000, description: "For football fans worldwide.", avatar: "https://source.unsplash.com/50x50/?football" },
      { id: 2, name: "Basketball Zone", members: 8000, description: "All things basketball!", avatar: "https://source.unsplash.com/50x50/?basketball" },
    ],
  },
  {
    category: "Technology",
    communities: [
      { id: 3, name: "AI Enthusiasts", members: 15000, description: "Latest AI trends and research.", avatar: "https://source.unsplash.com/50x50/?ai" },
      { id: 4, name: "Web Dev Hub", members: 10000, description: "Frontend & backend development tips.", avatar: "https://source.unsplash.com/50x50/?coding" },
    ],
  },
  {
    category: "Economies",
    communities: [
      { id: 5, name: "Stock Market Gurus", members: 9000, description: "Discuss stock market strategies.", avatar: "https://source.unsplash.com/50x50/?stocks" },
      { id: 6, name: "Crypto Investors", members: 12000, description: "All about cryptocurrency and DeFi.", avatar: "https://source.unsplash.com/50x50/?crypto" },
    ],
  },
];

// Danh sách danh mục
const categories = ["All", "Sports", "Technology", "Economies"];

const Communities = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Lọc cộng đồng theo danh mục
  const filteredCommunities =
    selectedCategory === "All"
      ? communitiesData
      : communitiesData.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white text-black p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Communities</h1>
        <div className="flex gap-4">
          <Search className="w-6 h-6 cursor-pointer text-gray-600" />
          <Users className="w-6 h-6 cursor-pointer text-gray-600" />
        </div>
      </div>

      {/* Thanh chọn danh mục */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full border border-gray-500 transition ${
              selectedCategory === category
                ? "bg-black text-white font-bold"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Danh sách cộng đồng */}
      {filteredCommunities.map((category, index) => (
        <div key={index} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{category.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {category.communities.map((community) => (
              <div 
                key={community.id} 
                className="flex items-center gap-4 border p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img src={community.avatar} alt={community.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{community.name}</h3>
                  <p className="text-gray-600 text-sm">{community.description}</p>
                  <p className="text-sm text-gray-500">{community.members.toLocaleString()} members</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Communities;
