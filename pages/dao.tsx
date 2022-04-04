import LayoutDAO from '../components/common/Layout/LayoutDAO'

import Dashboard from '../components/Dashboard/Desktop/DashboardDAO'
import { useState, useEffect } from 'react'
import DropDownMenu from '../components/Dashboard/Desktop/DropDownMenu';


export default function Home() {
  const [isClient, setIsClient] = useState(false);

  const handleStatusChange = (status) => {
    setIsClient(status);
    console.log('handleStatusChange: ', status);
  }

  const dropBarUpdate = (
     <DropDownMenu props={{ isClient, handleStatusChange }} />
  );

  const dashboardUpdate = (props) => (<Dashboard {...props} />);

  const props =
  {
    dropBar: dropBarUpdate,
    dashboard: dashboardUpdate
  };

  return (
    <LayoutDAO {...props} />
  )
}
