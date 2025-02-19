"use client";
import { useEffect, useState } from "react";
import OverviewCard from "@/components/OverviewCard";
import {
  fetchCustomHostnameList,
  fetchOverviewData,
} from "@/data/overviewdata";

const Overview = () => {
  const [hostnames, setHostnames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [overviewData, setOverviewData] = useState<Record<string, any>>({});

  // Fetch hostnames and their overview data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch the list of hostnames
        const hostnameList = await fetchCustomHostnameList();
        setHostnames(hostnameList);

        if (hostnameList.length > 0) {
          // Fetch overview data for all hostnames
          const results = await Promise.all(
            hostnameList.map(async (hostname) => {
              try {
                const data = await fetchOverviewData(hostname);
                return { hostname, data };
              } catch (err) {
                console.error(
                  `Error fetching overview data for ${hostname}:`,
                  err,
                );
                return { hostname, data: null }; // Handle failed fetch
              }
            }),
          );

          // Convert results into an object for easy access
          const overviewMap: Record<string, any> = {};
          results.forEach(({ hostname, data }) => {
            if (data) overviewMap[hostname] = data;
          });

          setOverviewData(overviewMap);
        }
      } catch (err) {
        setError("Failed to fetch data.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-wrap gap-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {Object.entries(overviewData).map(([hostname, data]) => (
        <OverviewCard
          key={hostname}
          device={hostname}
          chartdata={
            data.gpu_data?.map((item: any) => ({
              time: item.timestamp,
              Percent: item.percentage,
            })) || []
          }
          donutChartdata={data.percentage?.percentage || 0}
        />
      ))}
    </div>
  );
};

export default Overview;
