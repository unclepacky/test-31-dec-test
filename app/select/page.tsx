import { testSelect } from "@/actions.ts/actions";
import SelectTest from "@/components/SelectTest";
import React from "react";

export default function SelectPage() {
  return (
    <form action={testSelect}>
      <SelectTest />
      <button type="submit">submit</button>
    </form>
  );
}
