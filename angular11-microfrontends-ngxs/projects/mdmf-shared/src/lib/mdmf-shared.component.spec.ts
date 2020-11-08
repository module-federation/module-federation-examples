import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmfSharedComponent } from './mdmf-shared.component';

describe('MdmfSharedComponent', () => {
  let component: MdmfSharedComponent;
  let fixture: ComponentFixture<MdmfSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MdmfSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MdmfSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
