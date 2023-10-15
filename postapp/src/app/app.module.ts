import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule } from '@angular/material';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './posts/posts.component';
import { WildcardComponent } from './wildcard/wildcard.component';
import { AuthgaurdGuard } from './services/authgaurd.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    PostsComponent,
    WildcardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [AuthgaurdGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
