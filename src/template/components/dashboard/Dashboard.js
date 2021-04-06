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
import useLocalByLocalTypeEffect from '../../../views/hooks/useLocalByLocalTypeEffect';
import { selectAssociates, selectRegularMembers } from '../../../selectors/members/MemberSelectors';
import {
  selectLocalKitchens,
  selectLocalOthers,
  selectLocalWorkshops,
  selectLocalLodgings
} from '../../../selectors/locals/LocalsSelector';

const Dashboard = () => {
  const history = useHistory();
  const { roles = [] } = useSelector(state => state.auth);
  const isAdmin = roles.some(role => RoleEnum.AllAdmins.includes(role));
  const { items } = useMembersEffect(state => state.members, isAdmin);
  const { items: associates = {} } = useMembersEffect(selectAssociates, isAdmin);
  const { items: regularMember = {} } = useMembersEffect(selectRegularMembers, isAdmin);

  const { items: locals } = useLocalsEffect();
  const { items: kitchens } = useLocalsEffect(selectLocalKitchens);
  const { items: workshops } = useLocalsEffect(selectLocalWorkshops);
  const { items: lodgins } = useLocalsEffect(selectLocalLodgings);
  const { items: others } = useLocalsEffect(selectLocalOthers);

  useEffect(() => {
    if (!isAdmin) {
      history.push(RouteMap.LocalMember.root());
    }
    toast(
      <>
        Bienvenido a <strong>Guaitil-Soft</strong>!<br />
      </>
    );
  }, [history, isAdmin, roles]);

  return (
    <>
      <Card className="mb-3">
        <FalconCardHeader title="Dashboard" light={false} />
      </Card>
      <div className="card-deck">
        <CardSummary
          title="Total de miembros registrados"
          color="blue"
          linkText="Ver más"
          to={RouteMap.Member.root()}
          isPrincipal
        >
          {items.length}
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary title="Miembros asociados" color="info">
          {associates.length}
        </CardSummary>
        <CardSummary title="Miembros regulares" color="info">
          {regularMember.length}
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary
          isPrincipal
          title="Total de locales registrados"
          color="warning"
          linkText="Ver más"
          to={RouteMap.Local.root()}
        >
          {locals.length}
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary title="Talleres" color="warning">
          {workshops.length}
        </CardSummary>
        <CardSummary title="Cocinas" color="warning">
          {kitchens.length}
        </CardSummary>
        <CardSummary title="Alojamientos" color="info">
          {lodgins.length}
        </CardSummary>
        <CardSummary title="Otros tipos" color="info">
          {others.length}
        </CardSummary>
      </div>
    </>
  );
};

export default Dashboard;
