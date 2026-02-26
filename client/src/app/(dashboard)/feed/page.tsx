"use client";

import { useState } from "react";
import CreatePost from "./createpost";
import { Heart, MessageCircle, UserPlus } from "lucide-react";
import { useSession } from "@/lib/auth-client";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning ";
  if (hour < 18) return "Good afternoon ";
  return "Good evening ";
};

type Post = {
  id: number;
  author: string;
  text?: string;
  image?: string;
  time: string;
};

export default function FeedPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name?.split(" ")[0] || "Builder";

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Ayan",
      text: "Looking for a backend dev to help scale a SaaS 🚀",
      time: "2h ago",
    },
    {
      id: 2,
      author: "Riya",
      text: "Just redesigned a fintech dashboard. Open for collabs!",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
      time: "4h ago",
    },
    {
      id: 3,
      author: "Dev",
      text: "Building an AI recommendation engine. Need frontend support.",
      time: "6h ago",
    },
  ]);

  const addPost = (post: { text: string; image?: string }) => {
    const newPost: Post = {
      id: Date.now(),
      author: "You",
      text: post.text,
      image: post.image,
      time: "Just now",
    };

    setPosts([newPost, ...posts]);
  };

  return (
     <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">

      {/* Greeting */}
<div className="space-y-1">
  <h1 className="text-2xl font-semibold">
    {getGreeting()}, {userName} 👋
  </h1>
  <p className="text-gray-500">
    What are you building today?
  </p>
</div>

      {/* Create Post */}
      <CreatePost onPost={addPost} />

      {/* Feed Timeline */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white rounded-3xl shadow-sm p-6 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full" />
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-xs text-gray-400">
                {post.time}
              </p>
            </div>
          </div>

          {/* Text */}
          {post.text && (
            <p className="text-gray-800 leading-relaxed">
              {post.text}
            </p>
          )}

          {/* Image */}
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="rounded-2xl max-h-96 object-cover w-full"
            />
          )}

          {/* Actions */}
          <div className="flex gap-8 text-gray-500 pt-3 border-t">

  <button className="flex items-center gap-2 hover:text-violet-600 transition">
    <Heart size={18} />
    <span className="text-sm">Like</span>
  </button>

  <button className="flex items-center gap-2 hover:text-violet-600 transition">
    <MessageCircle size={18} />
    <span className="text-sm">Comment</span>
  </button>

  <button className="flex items-center gap-2 hover:text-violet-600 transition">
    <UserPlus size={18} />
    <span className="text-sm">Connect</span>
  </button>

</div>
        </div>
      ))}

    </div>
  );
}