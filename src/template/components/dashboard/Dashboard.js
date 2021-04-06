import React, { useEffect } from 'react';
import { Card } from 'reactstrap';
import CardSummary from '../../../views/components/dashboard-widgets/CardSummary';
import { toast } from 'react-toastify';
import FalconCardHeader from '../common/FalconCardHeader';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoleEnum, RouteMap } from '../../../constants';
import useMembersEffect from '../../../views/hooks/useMembersEffect';
import useLocalsEffect from '../../../views/hooks/useLocalsEffect';
import { selectAssociates, selectRegularMembers } from '../../../selectors/members/MemberSelectors';

const Dashboard = () => {
  const history = useHistory();
  const { roles = [] } = useSelector(state => state.auth);
  const { items } = useMembersEffect(state => state.members);
  const { items: associates = {} } = useMembersEffect(selectAssociates);
  const { items: regularMember = {} } = useMembersEffect(selectRegularMembers);

  const { items: locals } = useLocalsEffect();
  console.log(locals);

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
        <FalconCardHeader title="Dashboard" light={false} />
      </Card>
      {/* <PaymentsLineChart />*/}
      <div className="card-deck">
        <CardSummary title="Total de miembros registrados" color="warning" linkText="Ver más">
          {items.length}
        </CardSummary>
        <CardSummary title="Miembros asociados" color="info" linkText="Ir a asociados">
          {associates.length}
        </CardSummary>
        <CardSummary title="Miembros regulares" color="info" linkText="Ir a asociados">
          {regularMember.length}
        </CardSummary>
        {/*<CardSummary content="43,594" rate="9.54%" title="Revenue" color="success" linkText="Statistics">
          <CountUp end={43594} duration={5} prefix="$" separator="," decimal="." />
        </CardSummary>
        */}
      </div>
      <div className="card-deck">
        <CardSummary title="Total de locales registrados" color="warning" linkText="Ver más">
          {locals.length}
        </CardSummary>
      </div>
    </>
  );
};

export default Dashboard;
