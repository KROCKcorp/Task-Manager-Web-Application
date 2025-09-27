import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TaskCardSkeleton({count = 12}) {
  return (
    <>
      {Array.from({length: count})
        .fill(0)
        .map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-4 flex gap-4 ">
            <div className="flex w-30 h-40 shrink-0">
              <Skeleton containerClassName="flex w-full" />
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-semibold truncate">
                  <Skeleton width={120} />
                </h3>
                <span className="text-xs px-2 py-1 rounded-full shrink-0">
                  <Skeleton width={60} height={20} />
                </span>
              </div>
              <div className="mt-1 text-xs font-bold">
                <Skeleton width={80} />
              </div>
              <p className="mt-2 text-sm font-normal line-clamp-3">
                <Skeleton count={2} />
              </p>
              <div className="flex justify-end mt-auto">
                <p className={`flex flex-nowrap items-center text-sm font-medium`}>
                  <Skeleton width={100} />
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
