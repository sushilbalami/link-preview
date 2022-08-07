import { useRouter } from "next/router";

const ReportsHeading = ({ className, data, time }) => {
  const { query } = useRouter();
  const calculatePercentage = (value, total) => {
    return (value / total) * 100;
  };
  return (
    <div className={className}>
      <div className="shadow rounded bg-white">
        <div className="border-b-2 p-4 sm:px-6 space-y-1">
          <div className="flex items-center">
            <div className="text-red-700">Report generated</div>
            {time && (
              <div className="text-gray-800 pl-2 text-xs">({`${time}`})</div>
            )}
          </div>
          <div className="font-bold">{query.url}</div>
          <div className="text-gray-800">Your general Checkup Score</div>
        </div>
        {data && (
          <div className="">
            {/* <div className="w-24 h-24">
              <CircularProgressbar
                value={calculatePercentage(data.passed, data.total)}
                text={`${calculatePercentage(
                  data.passed,
                  data.total
                ).toFixed()}/100`}
                styles={buildStyles({
                  pathColor: `rgba(234, 88, 12, ${
                    calculatePercentage(data.passed, data.total) / 100
                  })`,
                  trailColor: "#d6d6d6",
                  textColor: "black",
                })}
              />
            </div> */}
            <div className="space-y-2 p-4 sm:px-6">
              <div className="flex flex-row items-center justify-center space-x-3">
                <span className="min-w-[84px]">Passed: </span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-100">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{
                      width: `${calculatePercentage(data.passed, data.total)}%`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-3">
                <span className="min-w-[84px]">Failed: </span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-100">
                  <div
                    className="bg-red-600 h-2.5 rounded-full"
                    style={{
                      width: `${calculatePercentage(data.failed, data.total)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ReportsHeading;
