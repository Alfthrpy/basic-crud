"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SkeletonCard from "./component/skeletons";
import { toast } from "react-hot-toast";

interface Idata {
  id: string;
  term: string;
  interpretation: string;
}

export default function Home() {
  const [datas, setDatas] = useState<Idata[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/interpretations");
        if (!response.ok) {
          console.log("Network not ok bro");
        }
        const result = await response.json();
        setDatas(result);
      } catch (error) {
        setError("Failed to fetch data, please try again");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setLoadingDeleteId(id);
      const response = await fetch(`/api/interpretations/${id}`, {
        method: "DELETE",
      });
      setDatas((prevDatas) => prevDatas?.filter((i) => i.id !== id));
      const data = await response.json();
      toast.success(`${data.message}`);
    } catch (error) {
      setError("Failed to delete, please try again");
    } finally {
      setLoadingDeleteId(id);
    }
  };

  console.log(datas);
  return (
    <div>
      {error && <p className="py-4 text-red-500">{error}</p>}
      
      {loading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      ) : datas?.length > 0 ? (
        <div>
          
          {datas?.map((datas) => (
            <div
              className="p-4 my-2 rounded-md border-b leading-9"
              key={datas.id}
            >
              <div className="font-bold">{datas.term}</div>
              <div>{datas.interpretation}</div>
              <div className="flex gap-4 mt-4 justify-end">
                <Link
                  href={`/edit/${datas.id}`}
                  className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                >
                  edit
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest flex items-center justify-center"
                  onClick={() => handleDelete(datas.id)}
                  disabled={loadingDeleteId === datas.id}
                >
                  {loadingDeleteId === datas.id ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-2 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Tidak ada istilah yang ditemukan</p>
      )}
    </div>
  );
}
