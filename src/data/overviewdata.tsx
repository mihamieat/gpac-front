import { credentials } from "@/opt/credentials";

const fetchCustomHostnameList = async () => {
  const endpoint = "overview/hostname/custom";
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.hostnames;
  } catch (error) {
    console.error("Error fetching custom hostnames:", error);
    throw error;
  }
};

const fetchOverviewData = async (hostname: string) => {
  const endpoint = "overview";
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${endpoint}?hostname=${hostname}`,
      {
        method: "GET",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching overview data", error);
    throw error;
  }
};
export { fetchCustomHostnameList, fetchOverviewData };
