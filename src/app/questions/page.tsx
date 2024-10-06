'use client'
import { useEffect, useState } from "react";
import { gkQuestions } from "../../../gk";
import Swal from "sweetalert2";
import toast from "react-hot-toast";




const QuestionsTable: React.FC = () => {
    const [gkQuestion, setGkQuestion] = useState<any>(gkQuestions);
    useEffect(()=>{
//check gaurd
let user = window.localStorage.getItem('user');
    let email = window.localStorage.getItem('isLoggedIn');
    let loggedInUser = JSON.parse(user || '{}');

    if(loggedInUser?.isAdmin === true && email ===loggedInUser?.email){
       console.log("You are authorized to view this page") 
    }
    else {
        window.location.href = '/login';
        toast.error('You are not authorized to view this page');

    }


     const ques =window.localStorage.getItem('questions') 
     if(ques){
       let JsonQuestions = JSON.parse(ques)
       JsonQuestions.reverse()
       JsonQuestions = [...JsonQuestions,...gkQuestions]
       
       setGkQuestion(JsonQuestions);
     }


     

   },[])

   useEffect(()=>{
    
},[])

   const handleDelete=(question:string)=>{
    const updatedQuestions = gkQuestion.filter((q:any) => q.question !== question);
    setGkQuestion(updatedQuestions)
    Swal.fire({
        text:"Your Question is deleted!",
        icon:"success"
    })
   }
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-11/12 mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Question</th>
                        <th scope="col" className="px-6 py-3">Option A</th>
                        <th scope="col" className="px-6 py-3">Option B</th>
                        <th scope="col" className="px-6 py-3">Option C</th>
                        <th scope="col" className="px-6 py-3">Option D</th>
                        <th scope="col" className="px-6 py-3 ">Answer</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">Delete</span></th>
                    </tr>
                </thead>
                <tbody>
                    {gkQuestion.map((q:any, index:number) => (
                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {  q?.question}
                            </th>
                            <td className="px-6 py-4">{q?.options?.a}</td>
                            <td className="px-6 py-4">{q?.options?.b}</td>
                            <td className="px-6 py-4">{q?.options?.c}</td>
                            <td className="px-6 py-4">{q?.options?.d}</td>
                            <td className="px-6 py-4 ">{q?.answer.toUpperCase()}</td>
                            <td className="px-6 py-4 text-right">
                                <button onClick={()=>handleDelete(q?.question)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default QuestionsTable;
