
/* Módulo que toma toda la carga en vez del app.module.

Como Core de la aplicación, aquí se deberá incluir todas las dependencias necesarias globales para el funcionamiento de la App.

*/


// SISTEMA
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// ROUTING
import { APP_ROUTES } from './core.routing';

// VISTA
import { CoreComponent } from './core.component';
import { InicioModule } from './../inicio/inicio.module';

// SERVICES
import { HttpClientModule } from '@angular/common/http';
import { EquiposServices } from './services/equipos.services';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule,
        BrowserAnimationsModule,
        APP_ROUTES,
        InicioModule,
        HttpClientModule
    ],
    exports: [
        CoreComponent
    ],
    declarations: [
        CoreComponent
    ],
    providers: [
        EquiposServices
    ],
    entryComponents: []
})
export class CoreModule { }
