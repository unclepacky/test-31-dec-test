import { autoAddExtension } from "@/actions.ts/actions";

export default function BtnAutoExtend({ id }: { id: string }) {
  const handleClick = autoAddExtension.bind(null, id);

  return (
    <form action={handleClick}>
      <button type="submit" className="border-2 rounded-full py-2 px-4 text-xs">
        Auto
      </button>
    </form>
  );
}
