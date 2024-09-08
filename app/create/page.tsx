"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, HtmlHTMLAttributes, useState } from "react";
import { toast } from "react-hot-toast";

export default function CreatePage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ term: "", interpretation: "" });
  const [error_term, setErrorTerm] = useState<String | null>(null);
  const [error_inter, setErrorInter] = useState<String | null>(null);

  const router = useRouter();

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const submitData = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!data.term) setErrorTerm("Istilah Wajib Diisi!");

    if (!data.interpretation) setErrorInter("Arti wajib diisi!");

    try {
      console.log(data);
      const response = await fetch("/api/interpretations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Data Berhasil Dibuat!");
        router.push("/");
      } else {
        const errorData = await response.json();
        setErrorInter(errorData.error);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Tambah Istilah Baru</h2>
      <form onSubmit={submitData} className="flex gap-3 flex-col">
        <input
          type="text"
          name="term"
          placeholder="istilah"
          className="py-1 px-4 border rounded-md"
          onChange={handleChange}
        />
        {error_term && <p className="text-red-500">{error_term}</p>}
        <textarea
          name="interpretation"
          rows={4}
          placeholder="Arti"
          className="py-1 px-4 border rounded-md resize-none"
          onChange={handleChange}
        ></textarea>
        {error_inter && <p className="text-red-500">{error_inter}</p>}
        <button
          className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer flex items-center justify-center"
          type="submit"
          disabled={loading}
        >
          {loading ? (
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
            "Tambah Istilah Baru"
          )}
        </button>
      </form>
    </div>
  );
}
