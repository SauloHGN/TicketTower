import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarTicketComponent } from './criarticket.component';

describe('CriarTicketComponent', () => {
  let component: CriarTicketComponent;
  let fixture: ComponentFixture<CriarTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
