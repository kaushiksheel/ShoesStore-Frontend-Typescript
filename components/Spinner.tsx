import ClipLoader from "react-spinners/ClipLoader";

type Props={
size:number
}

export const Spinner=({size}:Props)=>{
    return <ClipLoader color="white" size={size}/>
}