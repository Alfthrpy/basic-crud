export default function CreatePage(){
    return (
        <div>
            <h2 className="text-2xl font-bold my-8">Tambah Istilah Baru</h2>
            <form action="" className="flex gap-3 flex-col">
                <input 
                type="text" 
                name="term" 
                placeholder="istilah" 
                className="py-1 px-4 border rounded-md" />

                <textarea 
                name="interpretation" 
                rows={4}
                placeholder="Arti"
                className="py-1 px-4 border rounded-md resize-none"
                ></textarea>
                <button className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer">Tambah Istilah Baru</button>
            </form>
        </div>
    )
}