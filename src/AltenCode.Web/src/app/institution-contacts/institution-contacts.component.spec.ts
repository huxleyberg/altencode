import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionContactsComponent } from './institution-contacts.component';

describe('InstitutionContactsComponent', () => {
  let component: InstitutionContactsComponent;
  let fixture: ComponentFixture<InstitutionContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
