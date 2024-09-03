import { Test, TestingModule } from '@nestjs/testing';
import { NoticiaOriginalService } from '../../../modules/press/noticia-original.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NoticiaOriginal } from '../../../shared/models/noticia-original.entity';
import { Repository } from 'typeorm';

describe('NoticiaOriginalService', () => {
  let service: NoticiaOriginalService;
  let repository: Repository<NoticiaOriginal>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoticiaOriginalService,
        {
          provide: getRepositoryToken(NoticiaOriginal),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<NoticiaOriginalService>(NoticiaOriginalService);
    repository = module.get<Repository<NoticiaOriginal>>(getRepositoryToken(NoticiaOriginal));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a noticia_original', async () => {
    const noticiaOriginal: NoticiaOriginal = new NoticiaOriginal();
    jest.spyOn(repository, 'save').mockResolvedValue(noticiaOriginal);

    expect(await service.create(noticiaOriginal)).toBe(noticiaOriginal);
  });

  it('should find all noticia_original', async () => {
    const noticiaOriginal: NoticiaOriginal[] = [];
    jest.spyOn(repository, 'find').mockResolvedValue(noticiaOriginal);

    expect(await service.findAll()).toBe(noticiaOriginal);
  });

  it('should find one noticia_original', async () => {
    const noticiaOriginal: NoticiaOriginal = new NoticiaOriginal();
    jest.spyOn(repository, 'findOne').mockResolvedValue(noticiaOriginal);

    expect(await service.findOne(1)).toBe(noticiaOriginal);
  });

  it('should remove a noticia_original', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(1)).toBeUndefined();
  });
});
