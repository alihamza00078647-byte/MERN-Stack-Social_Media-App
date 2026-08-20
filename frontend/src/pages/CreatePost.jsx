import { useState, useRef, useContext } from "react";
import {
  Image as ImageIcon,
  X,
  Tag,
  MapPin,
  Globe,
  Users,
  Lock,
  Sparkles,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";
import { PostContext } from "../Context/PostContext";
import toast from "react-hot-toast";

export function CreatePost() {
  const { navigate, token, BackendURL } = useContext(PostContext);

  const [content, setContent] = useState("");
  const [tags, setTags] = useState(["react", "webdev"]);
  const [tagInput, setTagInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [location, setLocation] = useState("");
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);


  const fileInputRef = useRef(null);
  const user = JSON.parse(
    localStorage.getItem("user"),
  );

  
  // Handle Image Upload & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle Tags
  const handleAddTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().replace(/^#/, "").toLowerCase();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Submit Post Payload
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !imagePreview) return;

    setIsSubmitting(true);

    const postPayload = {
      content,
      tags,
      image: imagePreview,
      location,
      visibility,
      // createdAt: new Date().toISOString(),
    };

    
    // Replace with your backend API call: await axios.post('/api/posts', postPayload)
    try {
      const { data } = await axios.post(
        `${BackendURL}/api/data/create-posts`,
        postPayload, 
        {headers: {token}},
      );

      if (data.success) {
        // Reset Form
        setContent("");
        setTags([]);
        setImagePreview(null);
        setLocation("");
        setShowLocationInput(false);

        toast.success("Post Added Successfully");
        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    // setTimeout(() => {
    //   console.log('Post Created:', postPayload);
    //   setIsSubmitting(false);
    //   setSuccessMessage(true);

    //   // Reset Form
    //   setContent('');
    //   setTags([]);
    //   setImagePreview(null);
    //   setLocation('');
    //   setShowLocationInput(false);

    //   setTimeout(() => setSuccessMessage(false), 3000);
    // }, 1000);
  };

  return (
    <div className="min-h-screen border-x border-gray-100 max-w-2xl mx-auto bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">Create Post</h1>
        <Sparkles className="w-5 h-5 text-purple-600" />
      </header>

      {/* Alert Notification */}
      {successMessage && (
        <div className="m-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-700 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5" />
          Post published successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* User Info & Audience Selector */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div>
            <span className="font-bold text-gray-900 block text-sm">
              {user.name || "User Name"}
            </span>

            {/* Visibility Selector */}
            <div className="relative inline-block mt-0.5">
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="text-xs text-blue-600 font-semibold bg-blue-50 border border-blue-100 rounded-full px-2.5 py-1 focus:outline-none cursor-pointer appearance-none pr-6"
              >
                <option value="public">Everyone</option>
                <option value="followers">Followers</option>
                <option value="private">Only me</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-blue-600">
                {visibility === "public" && <Globe className="w-3 h-3" />}
                {visibility === "followers" && <Users className="w-3 h-3" />}
                {visibility === "private" && <Lock className="w-3 h-3" />}
              </div>
            </div>
          </div>
        </div>

        {/* Post Description / Content */}
        <div className="relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What do you want to share today?"
            rows={5}
            className="w-full text-gray-900 text-base placeholder-gray-400 border-none resize-none focus:outline-none focus:ring-0 bg-transparent"
          />
          <div className="text-right text-xs text-gray-400 font-medium">
            {content.length} / 280
          </div>
        </div>

        {/* Media Preview */}
        {imagePreview && (
          <div className="relative rounded-2xl overflow-hidden border border-gray-100 group">
            <img
              src={imagePreview}
              alt="Upload preview"
              className="w-full max-h-80 object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-3 right-3 p-1.5 bg-gray-900/70 hover:bg-gray-900 text-white rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Tags Section */}
        <div className="space-y-2 pt-2 border-t border-gray-100">
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" /> Tags & Topics
          </label>

          {/* Tag Chips */}
          <div className="flex flex-wrap gap-2 items-center">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-purple-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder={
                tags.length === 0
                  ? "Add tags (e.g. react, design)..."
                  : "Add more..."
              }
              className="text-xs text-gray-700 placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0 py-1"
            />
          </div>
        </div>

        {/* Location Input Toggle */}
        {showLocationInput && (
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100 text-sm">
            <MapPin className="w-4 h-4 text-red-500 flex-shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Add location (e.g. San Francisco, CA)"
              className="w-full bg-transparent border-none text-xs text-gray-800 placeholder-gray-400 focus:outline-none"
            />
            <button type="button" onClick={() => setShowLocationInput(false)}>
              <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        )}

        {/* Action Controls & Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {/* Image File Input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              id="file-input"
            />
            <label
              htmlFor="file-input"
              className="p-2.5 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full cursor-pointer transition-colors"
            >
              <ImageIcon className="w-5 h-5" />
            </label>

            {/* Location Button */}
            <button
              type="button"
              onClick={() => setShowLocationInput(!showLocationInput)}
              className="p-2.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <MapPin className="w-5 h-5" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={(!content.trim() && !imagePreview) || isSubmitting}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
