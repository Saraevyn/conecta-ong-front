import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginOngPage } from './login-ong.page';

describe('LoginOngPage', () => {
  let component: LoginOngPage;
  let fixture: ComponentFixture<LoginOngPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginOngPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginOngPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
