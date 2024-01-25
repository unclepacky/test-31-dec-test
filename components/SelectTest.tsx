"use client";

import { TransactionType } from "@prisma/client";

export default function SelectTest() {
  return (
    <div>
      <select name="select" defaultValue="">
        <option value="" disabled>
          select an option ...
        </option>
        {Object.values(TransactionType).map((trans) => (
          <option key={trans} value={trans}>
            {trans}
          </option>
        ))}
      </select>
    </div>
  );
}
