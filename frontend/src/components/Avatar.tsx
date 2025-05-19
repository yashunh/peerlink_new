export default function Avatar({name}:{
    name?: string
}){
    return (
        <div className="border rounded-full text-lg px-4 py-2 flex flex-cols justify-center items-center bg-white text-slate-800 w-12">
            {name ? name[0] : "U"}
        </div>
    )
}