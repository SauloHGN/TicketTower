import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionarioSidebarComponent } from './funcionario-sidebar.component';

describe('FuncionarioSidebarComponent', () => {
  let component: FuncionarioSidebarComponent;
  let fixture: ComponentFixture<FuncionarioSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuncionarioSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuncionarioSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
