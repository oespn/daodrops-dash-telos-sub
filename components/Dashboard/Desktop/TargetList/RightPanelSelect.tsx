import { useState } from "react";
import NewTargetList from "./NewTargetList";
import UploadCSV from "./UploadCSV";



const RightPanelSelect = ({ selectedItems }) => {
  const [items, setItems] = useState([])
  const [selectedIdx, setSelectedIdx] = useState(undefined);

  const handleClick = function (index) {
    console.log(index);
    // const selectedIdx = parseInt(index);
    setSelectedIdx(index);
  };

  const setCSVData = (data) => {
    setItems(data)
  }

  return (
    <section>
    <NewTargetList selectedItems={items} removeSelection={() => setItems([])} removeSelectionAfterSave={true} selectSection={() => handleClick(2)} />
    <UploadCSV setCSVData={setCSVData} />
    </section>
  )
}

export default RightPanelSelect;