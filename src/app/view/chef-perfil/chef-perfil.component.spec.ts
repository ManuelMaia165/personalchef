import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefPerfilComponent } from './chef-perfil.component';

describe('ChefPerfilComponent', () => {
  let component: ChefPerfilComponent;
  let fixture: ComponentFixture<ChefPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefPerfilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
