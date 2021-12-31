import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeModule } from './view/home/home.module';
import { CadastroModule } from './view/cadastro/cadastro.module';
import { HeaderComponent } from './view/layout/header/header.component';
import { FooterComponent } from './view/layout/footer/footer.component';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

import { FirestoreModule } from './shared/firestore/firestore.module';
import { ChefPerfilModule } from './view/chef-perfil/chef-perfil.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FirestoreModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    HomeModule,
    CadastroModule,
    ChefPerfilModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
