import { Skeleton } from "@/components/ui/skeleton"

export function ChatSkeleton() {
  return (
    <div className="flex h-screen">
      {/* Contacts List Skeleton */}
      <div className="w-1/3 border-r p-4">
        <Skeleton className="h-8 w-1/2 mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center mb-4">
            <Skeleton className="h-10 w-10 rounded-full mr-4" />
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ))}
      </div>

      {/* Chat Area Skeleton */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b flex items-center">
          <Skeleton className="h-10 w-10 rounded-full mr-4" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex-1 p-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`mb-4 ${i % 2 === 0 ? "text-left" : "text-right"}`}>
              <Skeleton className={`inline-block h-8 w-32 rounded-lg ${i % 2 === 0 ? "mr-12" : "ml-12"}`} />
              <Skeleton className={`h-3 w-16 mt-1 ${i % 2 === 0 ? "mr-12" : "ml-auto"}`} />
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

