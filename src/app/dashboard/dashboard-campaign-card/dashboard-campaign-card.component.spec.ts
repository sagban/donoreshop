import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCampaignCardComponent } from './dashboard-campaign-card.component';

describe('DashboardCampaignCardComponent', () => {
  let component: DashboardCampaignCardComponent;
  let fixture: ComponentFixture<DashboardCampaignCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCampaignCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCampaignCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
