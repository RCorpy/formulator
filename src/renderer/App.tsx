import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from "react";
import icon from '../../assets/icon.svg';
import './App.css';
import * as XLSX from 'xlsx'


function Hello() {

  const fileRoute = "C:/Users/Usuario/Desktop/excels/ENEPOXY W SUELOS 2018 BLANCO   K-1.xls"

  const showFile = (file) => {
    const promise = new Promise((resolve, reject)=>{

      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)

      fileReader.onload=(e)=>{
        const bufferArray = e.target.result

        const wb = XLSX.read(bufferArray, {type: "buffer"})

        const wsname = wb.SheetNames[0]

        const ws = wb.Sheets[wsname]

        const data = XLSX.utils.sheet_to_json(ws)

        resolve(data)
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
    promise.then((data)=>console.log(data))
  }

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>hello</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <div>
            <input type="file" onChange={(e) => showFile(e.target.files[0])} />
          </div>
        </a>
      </div>
    </div>
  );
}

/*function readXlsx() {
  XlsxPopulate.fromFileAsync("C:\\Users\\Usuario\\Desktop\\excels\\ENEPOXY W SUELOS 2018 BLANCO   K-1.xls")
    .then(workbook => {
        // Modify the workbook.
        const value = workbook.sheet("Sheet1").cell("A1").value();
 
        // Log the value.
        console.log(value);
    });
}*/

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
