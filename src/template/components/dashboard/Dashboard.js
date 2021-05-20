import React, { useEffect } from 'react';
import { Card } from 'reactstrap';
import CardSummary from '../../../views/components/dashboard-widgets/CardSummary';
import { toast } from 'react-toastify';
import FalconCardHeader from '../common/FalconCardHeader';
import {
  faUsers,
  faMortarPestle,
  faBed,
  faPlaceOfWorship,
  faHouseUser,
  faUserShield,
  faUser,
  faListAlt
} from '@fortawesome/free-solid-svg-icons';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RoleEnum, RouteMap } from '../../../constants';
import useMembersEffect from '../../../views/hooks/useMembersEffect';
import useLocalsEffect from '../../../views/hooks/useLocalsEffect';
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
        <FalconCardHeader title="Información general de la página" light={false} />
      </Card>
      <div className="card-deck">
        <CardSummary
          title="Total de miembros registrados"
          color="white"
          linkText="Ver más"
          isPrincipal
          to={RouteMap.Member.root()}
          bgColor="bg-primary"
          titleColor="text-white"
          iconCard={faUsers}
        >
          {items.length}
        </CardSummary>
        <CardSummary
          color="white"
          iconCard={faUserShield}
          bgColor="bg-warning"
          title="Asociados"
          titleColor="text-white"
        >
          {associates.length}
        </CardSummary>
        <CardSummary bgColor="bg-info" iconCard={faUser} color="white" title="Regulares" titleColor="text-white">
          {regularMember.length}
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary
          isPrincipal
          title="Total de locales registrados"
          bgColor="bg-secondary"
          color="white"
          linkText="Ver más"
          to={RouteMap.Local.root()}
          titleColor="text-white"
          iconCard={faHouseUser}
        >
          {locals.length}
        </CardSummary>
        <CardSummary
          iconCard={faPlaceOfWorship}
          bgColor="bg-danger"
          title="Talleres"
          color="white"
          titleColor="text-white"
        >
          {workshops.length}
        </CardSummary>
        <CardSummary bgColor="bg-dark" iconCard={faMortarPestle} title="Cocinas" color="white" titleColor="text-white">
          {kitchens.length}
        </CardSummary>
      </div>
      <div className="card-deck">
        <CardSummary bgColor="bg-success" iconCard={faBed} title="Alojamientos" color="white" titleColor="text-white">
          {lodgins.length}
        </CardSummary>
        <CardSummary bgColor="bg-info" iconCard={faListAlt} title="Otros tipos" color="white" titleColor="text-white">
          {others.length}
        </CardSummary>
      </div>
    </>
  );
};

export default Dashboard;
