import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { AuthInterceptor } from './services/auth-interceptor';
import { BootcampsComponent } from './components/bootcamps/bootcamps.component';
import { ListBootcampComponent } from './components/bootcamp/list-bootcamp/list-bootcamp.component';
import { AddBootcampComponent } from './components/bootcamp/add-bootcamp/add-bootcamp.component';
import { UpdBootcampComponent } from './components/bootcamp/upd-bootcamp/upd-bootcamp.component';
import { ManageBootcampComponent } from './components/bootcamp/manage-bootcamp/manage-bootcamp.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AddReviewComponent } from './components/review/add-review/add-review.component';
import { UpdReviewComponent } from './components/review/upd-review/upd-review.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { UpdCourseComponent } from './components/course/upd-course/upd-course.component';
import { BootcampsService } from './services/bootcamps.service';
import { ReviewsService } from './services/reviews.service';
import { BootcampsListResolverService } from './services/bootcampsList-resolver.service';
import { ReviewsListResolverService } from './services/reviewsList.resolver.service';
import { BootcampResolverService } from './services/bootcamp.resolver.service';
import { CoursesListResolverService } from './services/coursesList.resolver.service';
import { CoursesService } from './services/courses.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserAccessGuard } from './guards/user-access.guard';
import { PublisherAccessGuard } from './guards/publisher-access.guard copy';
import { BootcampItemComponent } from './components/bootcamp/bootcamp-item/bootcamp-item.component';
import { CourseItemComponent } from './components/course/course-item/course-item.component';
import { ReviewItemComponent } from './components/review/review-item/review-item.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  {
    path: 'bootcamps',
    component: BootcampsComponent,
    resolve: { bootcampsList: BootcampsListResolverService }
  },
  {
    path: 'list-bootcamp/:bootcampId',
    component: ListBootcampComponent,
    resolve: { bootcamp: BootcampResolverService }
  },

  {
    path: 'add-bootcamp',
    component: AddBootcampComponent,
    canActivate: [AuthGuard, PublisherAccessGuard]
  },
  {
    path: 'upd-bootcamp/:bootcampId',
    component: UpdBootcampComponent,
    canActivate: [AuthGuard, PublisherAccessGuard]
  },
  {
    path: 'manage-bootcamp/:bootcampId',
    component: ManageBootcampComponent,
    resolve: { bootcamp: BootcampResolverService },
    canActivate: [AuthGuard, PublisherAccessGuard]
  },

  {
    path: 'reviews/:bootcampId',
    component: ReviewsComponent,
    resolve: { reviewsList: ReviewsListResolverService }
  },
  {
    path: 'add-review/:bootcampId',
    component: AddReviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'upd-review/:bootcampId',
    component: UpdReviewComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'manage-courses/:bootcampId',
    component: CoursesComponent,
    resolve: { courses: CoursesListResolverService },
    canActivate: [AuthGuard, PublisherAccessGuard]
  },

  {
    path: 'add-course/:bootcampId',
    component: AddCourseComponent,
    canActivate: [AuthGuard, PublisherAccessGuard]
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  //Wrong route
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    BootcampsComponent,
    ListBootcampComponent,
    AddBootcampComponent,
    UpdBootcampComponent,
    ManageBootcampComponent,
    ReviewsComponent,
    AddReviewComponent,
    UpdReviewComponent,
    CoursesComponent,
    AddCourseComponent,
    UpdCourseComponent,
    PageNotFoundComponent,
    BootcampItemComponent,
    CourseItemComponent,
    ReviewItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes), // { enableTracing: true }),
    FlashMessagesModule.forRoot()
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    UserAccessGuard,
    PublisherAccessGuard,
    BootcampsService,
    ReviewsService,
    CoursesService,
    BootcampsListResolverService,
    BootcampResolverService,
    ReviewsListResolverService,
    CoursesListResolverService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
