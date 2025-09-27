import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function TaskFormPageSkeleton() {
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-2xl">
        <Skeleton width={200} height={30} />

        <div className="space-y-6 mt-10">
          {Array.from({length: 6})
            .fill(0)
            .map((_, i) => (
              <div key={i} className="w-full">
                <Skeleton width={100} height={20} />
                <Skeleton containerClassName="flex w-full h-10 mt-4" />
              </div>
            ))}

          <div className="flex gap-4 pt-4">
            <div className="w-full">
              <Skeleton containerClassName="flex w-full h-10 mt-4" />
            </div>
            <div className="w-full">
              <Skeleton containerClassName="flex w-full h-10 mt-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
