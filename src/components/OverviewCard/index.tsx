import { Card } from "@/components/tremor/Card";
import { SparkAreaChart } from "@/components/tremor/SparkChart";
import { ProgressCircle } from "@/components/tremor/ProgressCircle";
import React from "react";

interface ChartData {
  time: string;
  Percent: number;
}

interface OverviewCardProps {
  device: string;
  chartdata: ChartData[];
  donutChartdata: number;
}

const OverviewCard: React.FC<OverviewCardProps> = ({
  device,
  chartdata,
  donutChartdata,
}) => {
  return (
    <Card className="w-80 h-60 flex flex-col justify-center items-center">
      <div className="mb-4">
        <p className="text-center font-mono text-gray-700 dark:text-gray-300">
          <b>{device}</b>
        </p>
      </div>
      <div className="flex justify-center items-center">
        <SparkAreaChart
          data={chartdata}
          categories={["Percent"]}
          index={"timestamp"}
          colors={["violet"]}
          className="sm:h-10 sm:w-36"
        />
      </div>
      <div className="flex flex-col justify-center items-center mt-4">
        <ProgressCircle value={donutChartdata} strokeWidth={10} radius={40}>
          <span className="text-center">{donutChartdata}%</span>
        </ProgressCircle>
      </div>
    </Card>
  );
};

export default OverviewCard;
