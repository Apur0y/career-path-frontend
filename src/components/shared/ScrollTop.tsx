'use client'
import { CiCircleChevUp } from 'react-icons/ci';

export default function ScrollTop() {

    const handleTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return (
        <div>
            <button onClick={() => handleTop()} className=" fixed bottom-0 right-0 m-4 cursor-pointer z-50 ">
                <CiCircleChevUp className=" size-10 " />
            </button>
        </div>
    )
}
