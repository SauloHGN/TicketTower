import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarFuncionarioComponent } from './sidebar-funcionario.component';

describe('SidebarFuncionarioComponent', () => {
  let component: SidebarFuncionarioComponent;
  let fixture: ComponentFixture<SidebarFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarFuncionarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
