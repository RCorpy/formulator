import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './App.css';
import * as XLSX from 'xlsx';
import ProductSelector from './assets/ProductSelector';
import Sidebar from './assets/Sidebar';
import Menu from './assets/Menu'
import Gestion from './assets/Gestion';
import Datos from './assets/Datos';
import Fabricacion from './assets/Fabricacion';
import FabricacionNuevo from './assets/FabricacionNuevo';
import FabricacionHistorial from './assets/FabricacionHistorial';
import GestionNuevo from './assets/GestionNuevo';
import GestionBuscar from './assets/GestionBuscar';


function Hello() {
  const fileRoute =
    'C:/Users/Usuario/Desktop/excels/ENEPOXY W SUELOS 2018 BLANCO   K-1.xls';
  //@ts-ignore
  const showFile = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        //@ts-ignore
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((data) => console.log(data));
  };

  return (
    <div>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Seleccione excel del sistema</Form.Label>
        <input
          type="file"
          onChange={(e) => {
            //@ts-ignore
            if (e.target.files[0]) return showFile(e.target.files[0]);
          }}
          multiple
        />
      </Form.Group>
      <Link to="/modificar/14">
        <Button>{'A Product Selector con variable 14'}</Button>
      </Link>
      <ProductSelector />
    </div>
  );
}

function Example() {
  return (
    <>
      {['menu','fabricacion', 'gestion', 'datos'].map((placement, idx) => (
        <Sidebar key={idx} menuOption={placement} />
      ))}
    </>
  );
}

export default function App() {
  return (
    <>
      <Router>
        {Example()}
        <Routes>
          <Route path="/" element={<Hello />} />

          <Route path="/menu" element={<Menu />} />

          <Route path="/fabricacion" element={<Fabricacion />} />
          <Route path="/fabricacion/nuevo" element={<FabricacionNuevo />} />
          <Route path="/fabricacion/historial" element={<FabricacionHistorial />} />
          <Route path="/fabricacion/buscar" element={<ProductSelector />} />

          <Route path="/gestion" element={<Gestion />} />
          <Route path="/gestion/nuevo" element={<GestionNuevo />} />
          <Route path="/gestion/buscar" element={<GestionBuscar />} />
          <Route path="/gestion/modificar/:id" element={<ProductSelector />} />
          <Route path="/gestion/eliminar/:id" element={<ProductSelector />} />

          <Route path="/datos" element={<Datos />} />
          
        </Routes>
      </Router>
    </>
  );
}
