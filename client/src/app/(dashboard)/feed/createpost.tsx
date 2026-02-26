"use client";

import { useState } from "react";
import { ImagePlus } from "lucide-react";

export default function CreatePost({
  onPost,
}: {
  onPost: (post: {
    text: string;
    image?: string;
  }) => void;
}) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!text.trim() && !image) return;

    onPost({
      text,
      image: image || undefined,
    });

    setText("");
    setImage(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 space-y-4">

      <textarea
        placeholder="What are you building today?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full resize-none border rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-violet-400"
        rows={3}
      />

      {image && (
        <div className="relative">
          <img
            src={image}
            alt="Preview"
            className="rounded-2xl max-h-60 object-cover w-full"
          />
          <button
            onClick={() => setImage(null)}
            className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md"
          >
            Remove
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">

        <label className="flex items-center gap-2 cursor-pointer text-violet-600">
          <ImagePlus size={18} />
          Add Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        <button
          onClick={handleSubmit}
          className="bg-violet-600 text-white px-5 py-2 rounded-xl"
        >
          Post
        </button>

      </div>
    </div>
  );
}