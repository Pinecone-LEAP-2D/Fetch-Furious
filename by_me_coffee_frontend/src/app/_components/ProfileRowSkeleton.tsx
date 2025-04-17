export default function ProfileRowSkeleton() {
  return (
    <div className="flex gap-4 w-full p-3 items-center animate-pulse">
      <div className="bg-gray-300 h-4 w-6 rounded" /> 
      <div className="w-10 h-10 rounded-full bg-gray-300" />
      <div className="flex flex-col space-y-1">
        <div className="h-4 w-32 bg-gray-300 rounded" />
        <div className="h-3 w-96 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
