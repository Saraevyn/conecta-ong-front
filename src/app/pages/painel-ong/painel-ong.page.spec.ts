import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelOngPage } from './painel-ong.page';

describe('PainelOngPage', () => {
  let component: PainelOngPage;
  let fixture: ComponentFixture<PainelOngPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PainelOngPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PainelOngPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
