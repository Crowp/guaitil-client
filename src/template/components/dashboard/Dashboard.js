import React, { useEffect } from 'react';
import { Card } from 'reactstrap';
import CardSummary from '../../../views/components/dashboard-widgets/CardSummary';
import PaymentsLineChart from './PaymentsLineChart';
import { toast } from 'react-toastify';
import FalconCardHeader from '../common/FalconCardHeader';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoleEnum, RouteMap } from '../../../constants';
import useMembersEffect from '../../../views/hooks/useMembersEffect';
import { selectAssociates, selectRegularMembers } from '../../../selectors/members/MemberSelectors';

const Dashboard = () => {
  const history = useHistory();
  const { roles = [] } = useSelector(state => state.auth);
  const { items } = useMembersEffect(state => state.members);
  const { items: associates = {} } = useMembersEffect(selectAssociates);
  const { items: regularMember = {} } = useMembersEffect(selectRegularMembers);
  useEffect(() => {
    const isAdmin = roles.some(role => RoleEnum.AllAdmins.includes(role));
    if (!isAdmin) {
      RouteMap.LocalMember.root();
    }
    toast(
      <>
        Bienvenido a <strong>Guaitil-Soft</strong>!<br />
      </>
    );
  }, [history, roles]);

  return (
    <>
      <Card className="mb-3">
        <FalconCardHeader title="Dashboard administrativo" light={false} />
      </Card>
      <PaymentsLineChart />
      {/*<DashBoardDepositStatus />*/}
      <div className="card-deck">
        <CardSummary rate="-0.23%" title="Total de miembros registrados" color="warning" linkText="Ver más">
          {items.length}
        </CardSummary>
        <CardSummary rate="0.0%" title="Miembros asociados" color="info" linkText="Ir a asociados">
          {associates.length}
        </CardSummary>
        <CardSummary rate="0.0%" title="Miembros regulares" color="info" linkText="Ir a asociados">
          {regularMember.length}
        </CardSummary>
        {/*<CardSummary content="43,594" rate="9.54%" title="Revenue" color="success" linkText="Statistics">
          <CountUp end={43594} duration={5} prefix="$" separator="," decimal="." />
        </CardSummary>
        */}
      </div>
      {/* <Row noGutters>
        <Col lg="4" className="pr-lg-2">
          <ActiveUsersBarChart />
        </Col>
      </Row>*/}
    </>
  );
};

export default Dashboard;
