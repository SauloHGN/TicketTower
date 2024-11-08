import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesTextComponent } from './notes-text.component';

describe('NotesTextComponent', () => {
  let component: NotesTextComponent;
  let fixture: ComponentFixture<NotesTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
