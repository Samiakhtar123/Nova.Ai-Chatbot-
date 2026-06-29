import { useState } from 'react';
import './App.css';
import { URL } from './constants';

function App() {

  const [question , setQuestion] = useState(''); //state change
  const [result , setResult] = useState(undefined);

  const payload = {
    "contents": [{
        "parts": [{ "text": question}]
      }]
  }

  const askQuestion = async() => {
    let response = await fetch(URL, {
      method:"POST",
      body:JSON.stringify(payload)
    })    

    response = await response.json();
    // console.log(response.candidates[0].content.parts[0].text);
    setResult(response.candidates[0].content.parts[0].text)
    
    
  }

  return (

    <div className='grid grid-cols-5 h-screen text-center'>
      <div className='col-span-1 bg-zinc-800'>
      </div>
      <div className='col-span-4 p-10'>
        <div className='container h-130 overflow-scroll'>
        <div className='text-white'>
          {result}
        </div>
        </div>
      
      <div className='bg-zinc-800 w-10/12 p-3 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-14'>
        <input type="text" value={question} onChange={(event)=>setQuestion(event.target.value)}  className='w-full h-full p-4 outline-none text-lg' placeholder='Ask me anything' />
        <button onClick={askQuestion}>Ask</button>

      </div>
    </div>
    </div>
  )

}

export default App
