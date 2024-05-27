import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavEsquedaComponent } from './nav-esqueda.component';

describe('NavEsquedaComponent', () => {
  let component: NavEsquedaComponent;
  let fixture: ComponentFixture<NavEsquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavEsquedaComponent]
    });
    fixture = TestBed.createComponent(NavEsquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
