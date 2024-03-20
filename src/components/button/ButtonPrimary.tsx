/* eslint-disable @typescript-eslint/no-explicit-any */



const ButtonPrimary = ({title}:{title:any}) => {
  return (
    <div className=" w-full">
        <button className="bg-primary px-4 py-2 rounded-sm font-semibold text-white  uppercase">{title}</button>
    </div>
  )
}

export default ButtonPrimary