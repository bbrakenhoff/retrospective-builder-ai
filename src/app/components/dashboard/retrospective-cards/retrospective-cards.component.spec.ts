import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrospectiveCardsComponent } from './retrospective-cards.component';

describe('RetrospectiveCardsComponent', () => {
  let component: RetrospectiveCardsComponent;
  let fixture: ComponentFixture<RetrospectiveCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetrospectiveCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrospectiveCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
