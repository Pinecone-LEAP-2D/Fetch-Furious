export default function LoadingDonar(){
    return(
      <div className="border p-5 w-full rounded-sm animate-pulse">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <div className="px-2 space-y-1">
            <div className="h-4 w-24 bg-gray-300 rounded" />
            <div className="h-3 w-40 bg-gray-300 rounded" />
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <div className="h-4 w-16 bg-gray-300 rounded" />
          <div className="h-3 w-20 bg-gray-300 rounded" />
        </div>
      </div>
      <div className="mt-3 h-4 w-full bg-gray-300 rounded" />
    </div>
    )
}