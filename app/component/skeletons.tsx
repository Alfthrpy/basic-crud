export default function SkeletonCard() {
    return (
        <div className="p-4 my-2 rounded-md border-b leading-9">
          <div className="bg-gray-300 h-6 w-1/3 rounded mb-2 shimmer"></div>
          <div className="bg-gray-300 h-4 w-full rounded mb-2 shimmer"></div>
          <div className="bg-gray-300 h-4 w-5/6 rounded mb-2 shimmer"></div>
          <div className="flex gap-4 mt-4 justify-end">
            <div className="bg-gray-300 h-10 w-20 rounded shimmer"></div>
            <div className="bg-gray-300 h-10 w-20 rounded shimmer"></div>
          </div>
        </div>
      );
  }
  