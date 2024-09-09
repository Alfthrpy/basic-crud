'use client';


import SkeletonCard from "@/app/component/skeletons";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation"




export default function EditPage() {
  const [data,setData] = useState({term : '',interpretation:''})
  const [loadingScreen, setLoadingScreen] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [error_term,setErrorTerm] = useState<String |null>(null)
  const [error_inter,setErrorInter] = useState<String |null>(null)
  const params = useParams()
  const router = useRouter()


  const handleChange = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setData((prevData)=>(
        {...prevData,
            [event.target.name] : event.target.value
        }
    ))

}

const submitData = async (e:React.FormEvent)=>{
  e.preventDefault();
  setLoadingButton(true)

  if(!data.term) setErrorTerm('Istilah Wajib Diisi!')
  
  if(!data.interpretation)setErrorInter('Arti wajib diisi!')

  try {
      console.log(data)
      const response = await fetch(`/api/interpretations/${params.id}`,{method:'PUT',
          headers: {
              'Content-Type': 'application/json',

          },
          body: JSON.stringify(data)
      })
  
  if(response.ok){
      toast.success('Data Berhasil Diedit!')
      router.push('/')

  } else {
      const errorData = await response.json()
      setErrorInter(errorData.error)

  }

  } catch (error : any) {
      console.log(error)
  } finally {
    setLoadingButton(false)
  }
}
  

  useEffect(() => {
    if (!params) return;

    const id = params.id // Pastikan 'id' diakses dengan cara yang benar
    console.log(id)
    if (id) {
      const fetchData = async () => {
        try {
          setLoadingScreen(true)
          const response = await fetch(`/api/interpretations/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result= await response.json();

          setData({term: result.term, interpretation: result.interpretation});
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingScreen(false);
        }
      };

      fetchData();
    }
  }, [params]);

  if (loadingScreen) {
    return <SkeletonCard/>
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Edit Istilah</h2>
      <form onSubmit={submitData} className="flex gap-3 flex-col">
        <input
          type="text"
          name="term"
          placeholder="istilah"
          className="py-1 px-4 border rounded-md"
          defaultValue={data.term}
          onChange={handleChange}
        />
        {error_term && <p>{error_term}</p>}

        <textarea
          name="interpretation"
          rows={4}
          placeholder="Arti"
          className="py-1 px-4 border rounded-md resize-none"
          defaultValue={data.interpretation}
          onChange={handleChange}
        ></textarea>
        {error_inter && <p>{error_inter}</p>}
        <button
          className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer flex items-center justify-center"
          type="submit"
          disabled={loadingButton}
        >
          {loadingButton ? (
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
            "Edit Istilah"
          )}
        </button>
      </form>
    </div>
  );
}
