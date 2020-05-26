import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path:         '',
        pathMatch:    'full',
        loadChildren: () => import('./host-lazy-module/host-lazy-module.module')
            .then(x => x.HostLazyModuleModule)
    },
    // {
    //     path:         'weather',
    //     loadChildren: () => import('clientWeather/Module').then(x => x.ClientWeatherModule)
    // }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
