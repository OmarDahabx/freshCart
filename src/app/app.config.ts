import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations'
import {CookieService} from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideHttpClient(withFetch() , withInterceptors([headersInterceptor , errorInterceptor])),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(CookieService , NgxSpinnerModule ),
  ]
};