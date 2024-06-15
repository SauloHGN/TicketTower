import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSenhaComponent } from './novasenha.component';

describe('LandingComponent', () => {
  let component: NovaSenhaComponent;
  let fixture: ComponentFixture<NovaSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaSenhaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovaSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
