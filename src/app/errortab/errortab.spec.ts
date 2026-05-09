import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Errortab } from './errortab';

describe('Errortab', () => {
  let component: Errortab;
  let fixture: ComponentFixture<Errortab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Errortab],
    }).compileComponents();

    fixture = TestBed.createComponent(Errortab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
