import prisma from "@/prisma/client";
import Link from "next/link";

export default async function ListCustomers() {
  const customers = await prisma.customer.findMany();

  return (
    <div className="w-1/2 border-2 mt-5">
      {/* {(units.length = 0 && <div>There are no Units</div>)} */}
      {customers.length > 0 &&
        customers.map((customer) => (
          <div key={customer.id} className="flex gap-3 flex-row">
            <span className="flex-1">{customer.id}</span>
            <span className="flex-1/3">{customer.name}</span>
          </div>
        ))}
    </div>
  );
}
