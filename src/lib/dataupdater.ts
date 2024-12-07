import fs from "fs-extra";
import path from "path";

interface DataUpdateConfig {
  maxAgeMinutes: number;
  filePath: string;
  fetchDataFn: () => Promise<any>;
}

export async function updateData(config: DataUpdateConfig) {
  const { maxAgeMinutes, filePath, fetchDataFn } = config;

  await fs.ensureDir(path.dirname(filePath));

  try {
    let shouldUpdate = false;
    let existingData = null;

    try {
      existingData = await fs.readJson(filePath);

      const lastUpdated = existingData?.metadata?.timestamp
        ? new Date(existingData.metadata.timestamp)
        : new Date(0);

      const currentTime = new Date();
      const timeDiffMinutes =
        (currentTime.getTime() - lastUpdated.getTime()) / (1000 * 60);

      shouldUpdate = timeDiffMinutes >= maxAgeMinutes;
    } catch (readError) {
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      const newData = await fetchDataFn();

      // 添加元数据
      const dataWithMetadata = {
        metadata: {
          timestamp: new Date().toISOString(),
          generatedAt: new Date().toLocaleString(),
        },
        data: newData,
      };

      await fs.writeJson(filePath, dataWithMetadata, { spaces: 2 });

      console.log("Data updated:", new Date().toISOString());

      return dataWithMetadata;
    }

    return existingData;
  } catch (error) {
    console.error("Error updating/reading data:", error);
    throw error;
  }
}
