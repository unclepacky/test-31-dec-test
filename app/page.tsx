import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav>
        <ul>
          <Link href="\unit">
            <li>List Units</li>
          </Link>
          <Link href="\customers">
            <li>List Customers</li>
          </Link>
          <Link href="\contract\create">
            <li>Create Contract</li>
          </Link>
          <Link href="\transaction">
            <li>Create Transaction</li>
          </Link>
        </ul>
      </nav>
    </main>
  );
}
