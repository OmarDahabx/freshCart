import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'details/:slug/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'checkout/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'categorydetails/:slug/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'categorydetails/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'brand/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'brand/:slug/:id',
    renderMode: RenderMode.Server
  },
];
