import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalDatatableComponent } from './universal-datatable.component';

describe('ToolbarComponent', () => {
  let component: UniversalDatatableComponent;
  let fixture: ComponentFixture<UniversalDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UniversalDatatableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniversalDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
