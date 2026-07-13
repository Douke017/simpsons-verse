import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GetCharactersUseCase } from '../../../core/application/use-cases/get-characters.usecase';
import { Character } from '../../../core/domain/models/character.model';
import { CharactersPresenter } from '../presentation/characters.presenter';
import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  const characters: Character[] = [
    {
      id: 1,
      name: 'Homer Simpson',
      age: null,
      birthdate: null,
      gender: 'Male',
      occupation: 'Safety Inspector',
      portraitPath: '/homer.png',
      phrases: ['Doh!'],
      status: 'Alive',
      firstAppearanceEpisode: null,
      firstAppearanceShort: null,
    },
  ];

  it('returns character card view models', (done) => {
    TestBed.configureTestingModule({
      providers: [
        CharactersService,
        {
          provide: GetCharactersUseCase,
          useValue: {
            execute: () => of(characters),
          },
        },
        {
          provide: CharactersPresenter,
          useValue: {
            toCardViewModels: () => [
              {
                id: 1,
                title: 'Homer Simpson',
                subtitle: 'Safety Inspector',
                content: 'Doh!',
                age: null,
                firstAppearanceTitle: null,
                firstAppearanceDate: null,
                portraitPath: '/homer.png',
                alt: 'Homer Simpson',
              },
            ],
          },
        },
      ],
    });

    const service = TestBed.inject(CharactersService);

    service.getCharacterCards().subscribe((viewModels) => {
      expect(viewModels).toEqual([
        {
          id: 1,
          title: 'Homer Simpson',
          subtitle: 'Safety Inspector',
          content: 'Doh!',
          age: null,
          firstAppearanceTitle: null,
          firstAppearanceDate: null,
          portraitPath: '/homer.png',
          alt: 'Homer Simpson',
        },
      ]);
      done();
    });
  });
});
