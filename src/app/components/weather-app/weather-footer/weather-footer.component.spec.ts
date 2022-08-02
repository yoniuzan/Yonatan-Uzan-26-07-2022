import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherFooterComponent } from './weather-footer.component';

describe('WeatherFooterComponent', () => {
  let component: WeatherFooterComponent;
  let fixture: ComponentFixture<WeatherFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
