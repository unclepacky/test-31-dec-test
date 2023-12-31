import prisma from "@/prisma/client";
import Link from "next/link";

export default async function ListUnits() {
  const units = await prisma.unit.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div className="w-1/2 border-2 mt-5">
      {/* {(units.length = 0 && <div>There are no Units</div>)} */}
      {units.length > 0 &&
        units.map((unit) => (
          <div key={unit.id} className="flex gap-3 flex-row">
            {/* <span className="flex-1">{unit.id}</span> */}
            <span className="flex-1/3">{unit.name}</span>
            {/* <span className="flex-1/3">{unit.dailyRate}$/day</span> */}
            <span className="flex-1/3">{unit.monthlyRate}$/month</span>
          </div>
        ))}
    </div>
  );
}
