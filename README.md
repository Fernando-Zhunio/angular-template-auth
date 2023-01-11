# Template for angular administration system with guards

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.10.


To start, you should change the `serverUrlApi` attribute in the environment, which is the url of the server
## Functioning

In the app.routing.ts routes are predefined which are protected with angular guard, to protect a route you must add the
`AuthGuard` class in the canActivate and as optional in data the name of the guard which are two (guest, auth)

```typescript
{
    path: 'authentication',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [AuthGuard],
    data: { guard: 'guest' }
},

```

## Login

This guard will work if you have a session generated, to generate a session it is done by calling the `AuthService` service that has methods for login and logout

You will need to modify the session class to suit your server-side response.

```typescript
    constructor(private authService: AuthService) {}

    login(session: Session) {
        this.authService.login(session);
    }

```

## Logout

```typescript
    constructor(private authService: AuthService) {}

    logout() {
        this.authService.logout();
    }

```

## Layouts

The template has a working header and sidebar which can be 100% adapted
If you need to change the width size of the sidebar you can do it in the `styles.css` in the variable `--width-sidebar`

Both the header and the sidebar work by passing children to the component in `layout-admin`.

```html
<div>
  <app-header>
    {{children}}
  </app-header>
  <div class="body-app">
    <app-sidebar (toggle)="toggleSidebar($event)" [isOpenSidebar]="isOpenSidebar">
      {{children}}
    </app-sidebar>
    <main [ngClass]="{'close-sidebar': !isOpenSidebar}" role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <router-outlet>
      </router-outlet>
    </main>
  </div>
</div>
```