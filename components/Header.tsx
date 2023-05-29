import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full p-5 flex justify-center shadow mb-12">
      <span className="font-bold text-2xl ">
        <Link href="/">looooogs</Link>
      </span>
    </div>
  );
}
