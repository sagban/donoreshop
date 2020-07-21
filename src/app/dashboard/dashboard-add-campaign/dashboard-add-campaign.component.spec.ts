import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAddCampaignComponent } from './dashboard-add-campaign.component';

describe('DashboardAddCampaignComponent', () => {
  let component: DashboardAddCampaignComponent;
  let fixture: ComponentFixture<DashboardAddCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardAddCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAddCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
