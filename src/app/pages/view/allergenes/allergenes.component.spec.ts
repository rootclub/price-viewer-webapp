import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenesComponent } from './allergenes.component';

describe('AllergenesComponent', () => {
  let component: AllergenesComponent;
  let fixture: ComponentFixture<AllergenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllergenesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllergenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
