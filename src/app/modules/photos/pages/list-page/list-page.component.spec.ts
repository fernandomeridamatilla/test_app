import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListPageComponent } from './list-page.component';

import { PicsumService } from '../../services/picsum/picsum.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PhotosListComponent } from '../../components/photos-list/photos-list.component';

import { mockPhotos, MockPicsumService } from '../../utils/test.helpers';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListPageComponent, PhotosListComponent],
      imports: [IonicModule.forRoot(), HttpClientTestingModule],
      providers: [{ provide: PicsumService, useValue: MockPicsumService() }],
    }).compileComponents();

    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => expect(component).toBeTruthy());

  it('should call ngOnInit and get photos', () => {
    spyOn(component, 'ngOnInit');

    component.ngOnInit();

    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.photos).toEqual(mockPhotos);
    expect(component.filteredPhotos).toEqual(mockPhotos);
  });

  it('should call onInputChange and not filter list', fakeAsync(() => {
    spyOn(component, 'onInputChange');
    component.onInputChange(null);
    expect(component.onInputChange).toHaveBeenCalled();
    tick(100);
    expect(component.filteredPhotos).toEqual(component.photos);
  }));

  it('should filter list', fakeAsync(() => {
    const value = { detail: { value: 'text_1' } } as CustomEvent;

    component.onInputChange(value);
    tick(100);
    expect(component.filteredPhotos).toEqual([mockPhotos[0]]);
    expect(component.notFoundMessageIsVisible).toEqual(false);
    expect(component.listIsVisible).toEqual(true);
  }));

  it('should not filter list and return empty list ', fakeAsync(() => {
    const value = { detail: { value: 'invalid_message' } } as CustomEvent;

    component.onInputChange(value);
    tick(100);
    expect(component.filteredPhotos).toEqual([]);
    expect(component.notFoundMessageIsVisible).toEqual(true);
    expect(component.listIsVisible).toEqual(false);
  }));
});
