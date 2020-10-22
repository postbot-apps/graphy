/**@jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent } from 'react';
import { SideBar } from '../../shared/components/sidebar';

interface DashboardProps {}

const Dashboard: FunctionComponent<DashboardProps> = () => {
  return (
    <div>
      <SideBar />
    </div>
  );
};

export default Dashboard;
