import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CharactersPage } from './characters.page';
import { CharactersService } from './application/characters.service';

describe('CharactersPage', () => {
  let component: CharactersPage;
  let fixture: ComponentFixture<CharactersPage>;

  beforeEach(() => {
    TestBed.overrideComponent(CharactersPage, {
      set: {
        providers: [
          {
            provide: CharactersService,
            useValue: {
              getCharacterCards: () => of([]),
            },
          },
        ],
      },
    });

    fixture = TestBed.createComponent(CharactersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
