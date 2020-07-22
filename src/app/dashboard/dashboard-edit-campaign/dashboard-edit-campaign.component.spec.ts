import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEditCampaignComponent } from './dashboard-edit-campaign.component';

describe('DashboardEditCampaignComponent', () => {
  let component: DashboardEditCampaignComponent;
  let fixture: ComponentFixture<DashboardEditCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEditCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEditCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
