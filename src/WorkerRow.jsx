export default function WorkerRow({worker, onUpdate, onRemove}){
    return (
        <li>
            <p>{worker.worker}</p>
            <div>
              <label>Hours: </label>
              <input 
                type="number"
                value={worker.hours}
                onChange={(e)=>onUpdate(worker.id, {hours:Number(e.target.value)})}
              />
            </div>

            <div>
              <label>Rate: </label>
              <input 
                type="number"
                value={worker.rate}
                onChange={(e)=>onUpdate(worker.id, {rate:Number(e.target.value)})}
                />
            </div>

            <div style={{ marginTop: 6 }}>
              Line total: <b>${(worker.hours * worker.rate).toFixed(2)}</b>
            </div>

            <button onClick={()=>onRemove(worker.id)}> Remove </button>
          </li>
    );
}
