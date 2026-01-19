import {useState} from "react";

export default function App(){
  const [jobName, setJobName] = useState("Fremont Leak Repair");
  const [material, setMaterial]= useState(500);
  const [workers, setWorkers] = useState([
    {id:1, worker: "Juan", hours:8, rate: 50},
    {id:2, worker: "Omar", hours:8, rate: 45},
  ]);


  function updateWorkers(id, patch){
    setWorkers((prev)=>
      prev.map((r) => r.id === id ? {...r,...patch} : r)
    );
  }

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
          <li key={r.id} style={{marginBottom:8}}>
            <b>{r.worker}</b>

            <div>
              <label>Hours: </label>
              <input 
                type="number"
                value={r.hours}
                onChange={(e)=>updateWorkers(r.id, {hours:Number(e.target.value)})}
              />
            </div>

            <div>
              <label>Rate: </label>
              <input 
                type="number"
                value={r.rate}
                onChange={(e)=>updateWorkers(r.id, {rate:Number(e.target.value)})}
                />
            </div>

            <div style={{ marginTop: 6 }}>
              Line total: <b>${(r.hours * r.rate).toFixed(2)}</b>
            </div>
          </li>
        ))}
      </ul>

      <h2>Totals</h2>
      <p>Labor Total: <b>${laborTotal.toFixed(2)}</b></p>
      <p>Materials: <b>${Number(material).toFixed(2)}</b></p>
      <p>Grand Total: <b>${grandTotal.toFixed(2)}</b></p>

    </div>
  )
}