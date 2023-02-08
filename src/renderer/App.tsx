import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './App.css';
import * as XLSX from 'xlsx';
import ProductSelector from './assets/ProductSelector';

function Hello() {
  const fileRoute =
    'C:/Users/Usuario/Desktop/excels/ENEPOXY W SUELOS 2018 BLANCO   K-1.xls';

  const showFile = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
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
          onChange={(e) => showFile(e.target.files[0])}
          multiple
        />
      </Form.Group>
      <Link to="/productselector/14">
      <Button>{'A Product Selector con variable 14'}</Button>
      </Link>
      <ProductSelector />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/productselector/:id" element={<ProductSelector />} />
      </Routes>
    </Router>
  );
}
