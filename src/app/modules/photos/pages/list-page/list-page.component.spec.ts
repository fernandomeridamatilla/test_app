import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPageComponent } from './list-page.component';

import { PicsumService } from '../../services/picsum/picsum.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockPicsumService } from '../../services/picsum/picsum.service.spec';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListPageComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [{ provide: PicsumService, useValue: MockPicsumService() }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => expect(component).toBeTruthy());
});
