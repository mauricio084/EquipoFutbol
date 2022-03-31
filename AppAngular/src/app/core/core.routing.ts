
import { Routes, RouterModule } from '@angular/router';

/* Componentes */
import { HomeComponent } from './../inicio/inicio.component';
import { CrearEditarEquipoComponent } from '../inicio/Inicio/crear-editar-equipo.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'crearEditarEquipo/:id', component: CrearEditarEquipoComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const APP_ROUTES = RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true });
