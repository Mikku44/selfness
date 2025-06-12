import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { UsageStats } from "~/Models/UsageStats";
import { getOneWithID } from "~/services/UsageStatsService.client";

export default function StatsDisplay() {
  const [statsQN, setStatsQN] = useState<UsageStats>({
    count: 0,
    source: { mobile: 0, web: 0 },
    latest_update: Timestamp.now()
  });

  const [statsRG, setStatsRG] = useState<UsageStats>({
    count: 0,
    source: { mobile: 0, web: 0 },
    latest_update: Timestamp.now()
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [qn, rg] = await Promise.all([
          getOneWithID({ id: "QN-001" }),
          getOneWithID({ id: "RG-001" })
        ]);

        if (qn) setStatsQN({ ...qn });
        if (rg) setStatsRG({ ...rg });

      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setError("Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 mb-10 text-center">
        <section className="flex gap-3 justify-center items-center mt-10">
          <CountingStatBox label="ทำแบบสอบถามแล้ว" target={500} />
          <CountingStatBox label="ลงทะเบียนแล้ว" target={200} />
        </section>
        <div className="text-sm text-gray-500 mt-4">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center text-red-500">
        <p>{error}</p>
        <p>Showing default values</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 mb-10">
      <section className="flex gap-3 justify-center items-center mt-10">
        <StatBox label="ทำแบบสอบถามแล้ว" value={`${statsQN.count}+`} />
        <StatBox label="ลงทะเบียนแล้ว" value={`${statsRG.count}+`} />
      </section>


    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-center py-4 px-6 md:p-0">
      <div className="h-10 border-l border-gray-300 md:border-none"></div>
      <div className="mx-6 text-center">
        <div className="text-4xl font-semibold text-[#5a67d8]">{value}</div>
        <div className="text-base text-gray-700 mt-1">{label}</div>
      </div>
      <div className="h-10 border-r border-gray-300"></div>
    </div>
  );
}



function CountingStatBox({
  label,
  target,
  duration = 1000
}: {
  label: string;
  target: number;
  duration?: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    const interval = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(interval);
      }
      setValue(Math.floor(start));
    }, 10);
    return () => clearInterval(interval);
  }, [target, duration]);

  return (
    <div className="flex items-center justify-center py-4 px-6 md:p-0">
      <div className="h-10 border-l border-gray-300 md:border-none"></div>
      <div className="mx-6 text-center">
        <div className="text-4xl font-semibold duration-150 text-[#5a67d8]">{value}+</div>
        <div className="text-base text-gray-700 mt-1">{label}</div>
      </div>
      <div className="h-10 border-r border-gray-300"></div>
    </div>
  );
}