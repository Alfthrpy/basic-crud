'use client';


import SkeletonCard from "@/app/component/skeletons";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation"




export default function EditPage() {
  const [data,setData] = useState({term : '',interpretation:''})
  const [loading, setLoading] = useState<boolean>(true);
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
  setLoading(true)

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
    setLoading(false)
  }
}
  

  useEffect(() => {
    if (!params) return;

    const id = params.id // Pastikan 'id' diakses dengan cara yang benar
    console.log(id)
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/interpretations/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const result= await response.json();

          setData({term: result[0].term, interpretation: result[0].interpretation});
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [params]);

  if (loading) {
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
        <button className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer">
          Perbarui Istilah
        </button>
      </form>
    </div>
  );
}
