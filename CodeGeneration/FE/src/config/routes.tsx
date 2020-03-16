import DefaultLayout from 'layouts/DefaultLayout/DefaultLayout';
import { join } from 'path';
import { RouteConfig } from 'react-router-config';
import { ROOT_ROUTE } from 'config/route-consts';

import { APPLICATION_USER_ROUTE } from 'config/route-consts';



import { FIELD_ROUTE } from 'config/route-consts';


import { PAGE_ROUTE } from 'config/route-consts';


import { PERMISSION_ROUTE } from 'config/route-consts';




import { PROVIDER_ROUTE } from 'config/route-consts';


import { ROLE_ROUTE } from 'config/route-consts';


import { SITE_ROUTE } from 'config/route-consts';



import { VIEW_ROUTE } from 'config/route-consts';


import ApplicationUserView, { ApplicationUserDetail, ApplicationUserMaster } from 'views/ApplicationUserView/ApplicationUserView';



import FieldView, { FieldDetail, FieldMaster } from 'views/FieldView/FieldView';


import PageView, { PageDetail, PageMaster } from 'views/PageView/PageView';


import PermissionView, { PermissionDetail, PermissionMaster } from 'views/PermissionView/PermissionView';




import ProviderView, { ProviderDetail, ProviderMaster } from 'views/ProviderView/ProviderView';


import RoleView, { RoleDetail, RoleMaster } from 'views/RoleView/RoleView';


import SiteView, { SiteDetail, SiteMaster } from 'views/SiteView/SiteView';



import ViewView, { ViewDetail, ViewMaster } from 'views/ViewView/ViewView';


export const routes: RouteConfig[] = 
[
    {
        path: ROOT_ROUTE,
        component: DefaultLayout,
        routes: [
            
            {
                path: APPLICATION_USER_ROUTE,
                component: ApplicationUserView,
                children: 
                [
                    {
                        path: join(APPLICATION_USER_ROUTE, ':id'),
                        component: ApplicationUserDetail,
                    },
                    {
                        path: join(APPLICATION_USER_ROUTE),
                        component: ApplicationUserMaster,
                    },
                ],
            },
            
            
            
            {
                path: FIELD_ROUTE,
                component: FieldView,
                children: 
                [
                    {
                        path: join(FIELD_ROUTE, ':id'),
                        component: FieldDetail,
                    },
                    {
                        path: join(FIELD_ROUTE),
                        component: FieldMaster,
                    },
                ],
            },
            
            
            {
                path: PAGE_ROUTE,
                component: PageView,
                children: 
                [
                    {
                        path: join(PAGE_ROUTE, ':id'),
                        component: PageDetail,
                    },
                    {
                        path: join(PAGE_ROUTE),
                        component: PageMaster,
                    },
                ],
            },
            
            
            {
                path: PERMISSION_ROUTE,
                component: PermissionView,
                children: 
                [
                    {
                        path: join(PERMISSION_ROUTE, ':id'),
                        component: PermissionDetail,
                    },
                    {
                        path: join(PERMISSION_ROUTE),
                        component: PermissionMaster,
                    },
                ],
            },
            
            
            
            
            {
                path: PROVIDER_ROUTE,
                component: ProviderView,
                children: 
                [
                    {
                        path: join(PROVIDER_ROUTE, ':id'),
                        component: ProviderDetail,
                    },
                    {
                        path: join(PROVIDER_ROUTE),
                        component: ProviderMaster,
                    },
                ],
            },
            
            
            {
                path: ROLE_ROUTE,
                component: RoleView,
                children: 
                [
                    {
                        path: join(ROLE_ROUTE, ':id'),
                        component: RoleDetail,
                    },
                    {
                        path: join(ROLE_ROUTE),
                        component: RoleMaster,
                    },
                ],
            },
            
            
            {
                path: SITE_ROUTE,
                component: SiteView,
                children: 
                [
                    {
                        path: join(SITE_ROUTE, ':id'),
                        component: SiteDetail,
                    },
                    {
                        path: join(SITE_ROUTE),
                        component: SiteMaster,
                    },
                ],
            },
            
            
            
            {
                path: VIEW_ROUTE,
                component: ViewView,
                children: 
                [
                    {
                        path: join(VIEW_ROUTE, ':id'),
                        component: ViewDetail,
                    },
                    {
                        path: join(VIEW_ROUTE),
                        component: ViewMaster,
                    },
                ],
            },
            
        ],
    },
];