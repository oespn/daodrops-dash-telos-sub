import React, { useState, useRef, CSSProperties } from "react";
import { useCSVReader } from 'react-papaparse';
import { uploadCSV } from "../../../../api";

const styles = {
  csvReader: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: '20%',
  } as CSSProperties,
  acceptedFile: {
    border: '1px solid #ccc',
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: '80%',
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: '0 20px',
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: 'red',
  } as CSSProperties,
};

const UploadCSV = (props) => {
  const {
    setCSVData
  } = props
  const { CSVReader } = useCSVReader();
  console.log(CSVReader)

  const onUploadAccepted = (results: any) => {
    console.log('---------------------------');
    console.log(results.data);
    let data = results.data.slice(1, results.data.length)
    console.log(data);
    data = data.map((item, index) => ({
      eth_address: item[0],
      balance: item[1],
      pendingBalanceUpdate: item[2],
      username: '',
      rank: 0,
      id: index,
      proposals: 0,
      votesCount: 0,
      daosCount: 0,
      tags: ''
    }))

    setCSVData(data)
    console.log('---------------------------');
  }

  return (
    <div>
      <h4 className="page-header mb-4">Upload a CSV</h4>
      <CSVReader
        onUploadAccepted={onUploadAccepted}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
        }: any) => (
          <>
            <div style={styles.csvReader}>
              <button type='button' {...getRootProps()} style={styles.browseFile}>
                Browse file
              </button>
              <div style={styles.acceptedFile}>
                {acceptedFile && acceptedFile.name}
              </div>
              <button {...getRemoveFileProps()} style={styles.remove}>
                Remove
              </button>
            </div>
            <ProgressBar style={styles.progressBarBackgroundColor} />
          </>
        )}
      </CSVReader>
    </div>
  );
};

export default UploadCSV;