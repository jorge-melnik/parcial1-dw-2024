import { Routes } from '@angular/router';
import { LoginPageComponent } from './auth/login/login.page';
import { logueadoGuard } from './guards/logueado.guard';
import { HomeComponent } from './pages/home/home.component';
import { TasksComponent } from './pages/tasks/task-list/tasks.component';
// import { TaskDetailComponent } from './pages/tasks/task-detail/task-detail.component';
import { TaskCreatePageComponent } from './pages/tasks/task-create/task-create.page';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home page' },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home page',
    canActivate: [logueadoGuard],
  },
  { path: 'auth/login', component: LoginPageComponent, title: 'Login' },

  {
    path: 'tasks',
    // canActivate: [logueadoGuard],
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
      // {
      //   path: ':id_tarea',
      //   component: TaskDetailComponent,
      //   title: 'Detalle tarea',
      //   pathMatch: 'full',
      // },
    ],
  },
];
