import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MahjongWrapperComponent } from './mahjong-wrapper.component';

describe('MahjongWrapperComponent', () => {
  let component: MahjongWrapperComponent;
  let fixture: ComponentFixture<MahjongWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MahjongWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MahjongWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
