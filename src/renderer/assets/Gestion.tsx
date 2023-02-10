import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { loadSavedData } from 'renderer/dataHandler';



export default function Gestion() {


    const getJSONData = () => {
    {
        loadSavedData()
        console.log("returning data")
    }

        

    }

  return (
    <div>
        <h1>Gestion</h1>
        <Link to="/gestion/nuevo">
            <Button onClick={()=>getJSONData()}>Nuevo</Button>
        </Link>
        <Link to="/gestion/buscar">
            <Button onClick={()=>getJSONData()}>Historial</Button>
        </Link>
        
    </div>
  )
}
