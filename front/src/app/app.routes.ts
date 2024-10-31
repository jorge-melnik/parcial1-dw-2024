import { Routes } from '@angular/router';
import { TasksComponent } from './pages/tasks/task-list/tasks.component';
// import { TaskDetailComponent } from './pages/tasks/task-detail/task-detail.component';
import { TaskCreatePageComponent } from './pages/tasks/task-create/task-create.page';
import { HomePageComponent } from './pages/home/home.page';
import { logueadoGuard } from './core/guards/logueado.guard';
import { LoginPageComponent } from './pages/auth/login/login.page';
import { TaskDetailComponent } from './pages/tasks/task-detail/task-detail.component';
import { UsuariosPageComponent } from './pages/usuario/usuarios/usuarios.page';
import { UsuarioCrearPageComponent } from './pages/usuario/crear/usuario-crear.page';
import { UsuarioImagenComponent } from './pages/usuario/usuario-imagen/usuario-imagen.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
    title: 'Home page',
  },
  { path: 'auth/login', component: LoginPageComponent, title: 'Login' },

  {
    path: 'tasks',
    canActivate: [logueadoGuard],
    children: [
      {
        path: '',
        component: TasksComponent,
        title: 'Lista de tareas',
      },
      {
        path: 'crear',
        component: TaskCreatePageComponent,
        title: 'Crear tarea',
        pathMatch: 'full',
      },
      {
        path: ':id_tarea',
        component: TaskDetailComponent,
        title: 'Detalle tarea',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'usuarios',
    canActivate: [logueadoGuard],
    children: [
      {
        path: '',
        component: UsuariosPageComponent,
        title: 'Lista de Usuarios',
      },
      {
        path: 'crear',
        component: UsuarioCrearPageComponent,
        title: 'Crear Usuario',
        pathMatch: 'full',
      },
      {
        path: 'imagen',
        component: UsuarioImagenComponent,
        title: 'Cambiar imagen',
        pathMatch: 'full',
      },
    ],
  },
];
