import { createTransaction } from "@/actions.ts/actions";
import { ConvertDateToInputCompatible } from "../utills/misc";
import { TransactionType } from "@prisma/client";
import { addHours, addMonths, format } from "date-fns";
import prisma from "@/prisma/client";

export default async function TransactionPage() {
  const currentDate = new Date();
  const defaultCurrentDate = ConvertDateToInputCompatible(new Date());

  // currentDate.setMonth(currentDate.getMonth() + 1);
  const defaultEndDate = format(addMonths(currentDate, 1), "yyyy-MM-dd"); // const defaultEndDate = ConvertDateToInputCompatible(currentDate);

  const startTime = format(currentDate, "HH:mm");
  const endTime = format(addHours(currentDate, 1), "HH:mm");

  const contracts = await prisma.contract.findMany({
    where: {
      type: "ACTIVE",
    },
    include: {
      unit: true,
      customer: true,
    },
  });

  // const testDate = new Date();
  // const f = new Intl.DateTimeFormat("en-us", {
  //   // hour: "2-digit",
  //   // minute: "2-digit",
  //   // timeStyle: "short",
  //   month: "long",
  // });

  // <div>{f.format(testDate)}</div>

  return (
    <div className="w-1/2">
      <form
        action={createTransaction}
        className="flex flex-col justify-between gap-5"
      >
        <div className="flex justify-between">
          <input
            required
            type="date"
            name="date"
            defaultValue={defaultCurrentDate}
          />
          <select required name="contractId" defaultValue="">
            <option value="" disabled>
              Select Contract ...
            </option>
            {contracts.map((contract) => (
              <option key={contract.id} value={contract.id}>
                {contract.customer.name} {contract.unit.name}
              </option>
            ))}
          </select>
          <select required name="transaction" defaultValue="">
            <option value="" disabled>
              Select Transaction ...
            </option>
            {Object.values(TransactionType).map((trans) => (
              <option
                key={trans}
                value={trans}
                disabled={trans === "RENT" ? true : false}
              >
                {trans}
              </option>
            ))}
          </select>
        </div>
        <div className="flex  justify-between">
          <input
            type="date"
            name="fromDate"
            defaultValue={defaultCurrentDate}
          />
          <input type="date" name="tillDate" defaultValue={defaultEndDate} />
        </div>
        <div className="flex  justify-between">
          <input type="time" name="fromTime" defaultValue={startTime} />
          <input type="time" defaultValue={endTime} name="tillTime" />
          <input
            required
            type="text"
            name="amount"
            placeholder="please enter the amount"
          />
        </div>
        <button className="bg-amber-400 py-3">Submit</button>
      </form>
    </div>
  );
}
