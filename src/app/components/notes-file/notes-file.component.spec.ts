import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesFileComponent } from './notes-file.component';

describe('NotesFileComponent', () => {
  let component: NotesFileComponent;
  let fixture: ComponentFixture<NotesFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotesFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
