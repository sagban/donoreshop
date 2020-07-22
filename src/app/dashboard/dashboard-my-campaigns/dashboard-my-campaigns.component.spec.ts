import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMyCampaignsComponent } from './dashboard-my-campaigns.component';

describe('DashboardMyCampaignsComponent', () => {
  let component: DashboardMyCampaignsComponent;
  let fixture: ComponentFixture<DashboardMyCampaignsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMyCampaignsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMyCampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
