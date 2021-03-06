import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from "@angular/material/icon";

import { CadastroComponent } from './cadastro.component';

@NgModule({
  declarations: [
    CadastroComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule
  ]
})
export class CadastroModule { }
