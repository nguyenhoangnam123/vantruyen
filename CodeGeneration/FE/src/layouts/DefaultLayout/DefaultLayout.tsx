import Header from '@coreui/react/lib/Header';
import NavbarBrand from '@coreui/react/lib/NavbarBrand';
import Sidebar from '@coreui/react/lib/Sidebar';
// import SidebarMinimizer from '@coreui/react/lib/SidebarMinimizer';
import SidebarNav from '@coreui/react/lib/SidebarNav';
import SidebarToggler from '@coreui/react/lib/SidebarToggler';
import { menu } from 'config/menu';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, withRouter } from 'react-router';
import { renderRoutes, RouteConfig, RouteConfigComponentProps } from 'react-router-config';
import * as ReactRouterDOM from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import './DefaultLayout.scss';
import { ROOT_ROUTE, APPLICATION_USER_ROUTE } from 'config/route-consts';

interface NavbarBrandLogoProps {
  src: string;

  width?: number;

  height?: number;

  alt?: string;
}

const navbarBrandFull: NavbarBrandLogoProps = {
  src: 'https://rangdong.com.vn/themes/rangdong/images/logo.png',
  width: 89,
  height: 30,
};

const navbarBrandMinimized: NavbarBrandLogoProps = {
  src: '/assets/img/brand/sygnet.svg',
  width: 30,
  height: 30,
};

function DefaultLayout(props: RouteConfigComponentProps) {
  const { route } = props;
  const [translate] = useTranslation();

  const translatedMenu = React.useMemo(() => ({
    items: menu.map((route: RouteConfig) => ({
      ...route,
      name: translate(route.name),
    })),
  }),
    [translate],
  );

  return (
    <div className="app">
      <Header fixed className="navbar">
        <NavbarBrand
          full={navbarBrandFull}
          minimized={navbarBrandMinimized}
        />
        <SidebarToggler className="d-md-down-none" display="lg" />
      </Header>
      <div className="app-body">
        <Sidebar display="lg" fixed>
          <SidebarNav navConfig={translatedMenu} router={ReactRouterDOM} />
          {/* <SidebarMinimizer/> */}
        </Sidebar>
        <main className="main">
          <div className="app-content">
            <Switch>
              <Redirect exact from={ROOT_ROUTE} to={APPLICATION_USER_ROUTE} />
              {route?.routes instanceof Array && renderRoutes(route.routes)}
            </Switch>
          </div>
        </main>
      </div>
    </div>
  );
}

export default withRouter(DefaultLayout);
