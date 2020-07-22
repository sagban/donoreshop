import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreCampaignComponent } from './explore-campaign.component';

describe('ExploreCampaignComponent', () => {
  let component: ExploreCampaignComponent;
  let fixture: ComponentFixture<ExploreCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExploreCampaignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
