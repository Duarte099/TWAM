import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecoesList } from './selecoes-list';

describe('SelecoesList', () => {
  let component: SelecoesList;
  let fixture: ComponentFixture<SelecoesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecoesList],
    }).compileComponents();

    fixture = TestBed.createComponent(SelecoesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
