import { Test, TestingModule } from '@nestjs/testing';
import { NoticiasService } from '../../../modules/press/noticias.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Noticias } from '../../../shared/models/noticias.entity';
import { Repository } from 'typeorm';

describe('NoticiasService', () => {
  let service: NoticiasService;
  let repository: Repository<Noticias>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoticiasService,
        {
          provide: getRepositoryToken(Noticias),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<NoticiasService>(NoticiasService);
    repository = module.get<Repository<Noticias>>(getRepositoryToken(Noticias));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a noticia', async () => {
    const noticia: Noticias = new Noticias();
    jest.spyOn(repository, 'save').mockResolvedValue(noticia);

    expect(await service.create(noticia)).toBe(noticia);
  });

  it('should find all noticias', async () => {
    const noticias: Noticias[] = [];
    jest.spyOn(repository, 'find').mockResolvedValue(noticias);

    expect(await service.findAll()).toBe(noticias);
  });

  it('should find one noticia', async () => {
    const noticia: Noticias = new Noticias();
    jest.spyOn(repository, 'findOne').mockResolvedValue(noticia);

    expect(await service.findOne(1)).toBe(noticia);
  });

  it('should remove a noticia', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(1)).toBeUndefined();
  });
});
