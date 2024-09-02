import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="p-4 my-2 rounded-md border-b leading-9">
        <div className="font-bold">Gank</div>
        <div>Serangan mendadak oleh beberapa pemain untuk mengejutkan dan mengalahkan satu atau lebih lawan. Biasanya dilakukan di jalur yang memiliki hero lawan yang sendirian</div>
        <div className="flex gap-4 mt-4 justify-end">
          <Link href={'/edit'} className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">edit</Link>
          <button  className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">delete</button>
        </div>
      </div>
    </div>
  );
}
