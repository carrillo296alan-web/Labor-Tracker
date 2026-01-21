import {useState, useEffect} from "react";
import WorkerRow from "./WorkerRow";

export default function App(){
  const [jobName, setJobName] = useState(()=>{
    return localStorage.getItem("jobName") || "Fremont Job";
  }
  );

  const [material, setMaterial]= useState(()=>{
    return localStorage.getItem("material") || 500;
  });

  const [workers,setWorkers] = useState(() => {
    const saved = localStorage.getItem("workers");
    return saved
    ? JSON.parse(saved)
    : [
      {id: 1, worker: "Juan", hours: 8, rate: 50},
      {id: 2, worker: "Omar", hours: 8, rate: 50},
    ];
  });

  function updateWorkers(id, patch){
    setWorkers((prev)=>
      prev.map((r) => r.id === id ? {...r,...patch} : r)
    );
  }

  function addWorker(){
    setWorkers((prev) => {
      const nextId = 
      prev.length === 0 ? 1 : Math.max(...prev.map((w) => w.id))+1;

      return [...prev,{ id: nextId, worker: "", hours:0, rate:0}];
    });
    }

    function removeWorker(id){
      setWorkers((prev)=> prev.filter((w)=>w.id !== id));
    }

    useEffect(()=>{
      localStorage.setItem("workers", JSON.stringify(workers));
    }, [workers]);

    useEffect(()=>{
      localStorage.setItem("jobName", jobName);
    }, [jobName]);

    useEffect(()=>{
      localStorage.setItem("materials", String(material));
    }, [material]);

  const laborTotal = workers.reduce((sum,r)=>sum + (r.hours || 0) * (r.rate || 0), 0);
  const grandTotal = laborTotal + (material || 0);

  return(
    <div>
      <h1> Labor Tracker</h1>
      <label> Job Name</label>

      <input
        value = {jobName}
        onChange={(e) => setJobName(e.target.value)}
      />

      <p>Current job: {jobName}</p>

      <div>
        <label>Materials</label>
        <input 
          type="number"
          value={material}
          onChange={(e) => setMaterial(Number(e.target.value))}
        />
      </div>

      <p>Materials: {material}</p>

      <h1>Labor</h1>

      <ul>
        {workers.map((r)=>(
          <WorkerRow 
            key={r.id}
            worker={r}
            onUpdate={updateWorkers}
            onRemove={removeWorker}
          />
        ))}
      </ul>

      <button onClick={addWorker}> + Add Worker</button>

      <h2>Totals</h2>
      <p>Labor Total: <b>${laborTotal.toFixed(2)}</b></p>
      <p>Materials: <b>${Number(material).toFixed(2)}</b></p>
      <p>Grand Total: <b>${grandTotal.toFixed(2)}</b></p>

    </div>
  )
}