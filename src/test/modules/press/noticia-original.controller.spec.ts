import { Test, TestingModule } from '@nestjs/testing';
import { NoticiaOriginalController } from '../../../modules/press/noticia-original.controller';
import { NoticiaOriginalService } from '../../../modules/press/noticia-original.service';
import { NoticiaOriginal } from '../../../shared/models/noticia-original.entity';

describe('NoticiaOriginalController', () => {
  let controller: NoticiaOriginalController;
  let service: NoticiaOriginalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticiaOriginalController],
      providers: [
        {
          provide: NoticiaOriginalService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new NoticiaOriginal()),
            create: jest.fn().mockResolvedValue(new NoticiaOriginal()),
            update: jest.fn().mockResolvedValue(new NoticiaOriginal()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<NoticiaOriginalController>(NoticiaOriginalController);
    service = module.get<NoticiaOriginalService>(NoticiaOriginalService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of noticias', async () => {
    expect(await controller.findAll()).toEqual([]);
  });

  it('should return a noticia by ID', async () => {
    expect(await controller.findOne(1)).toEqual(new NoticiaOriginal());
  });

  it('should create a new noticia', async () => {
    const noticia = new NoticiaOriginal();
    expect(await controller.create(noticia)).toEqual(new NoticiaOriginal());
  });

  it('should update a noticia', async () => {
    const noticia = new NoticiaOriginal();
    expect(await controller.update(1, noticia)).toEqual(new NoticiaOriginal());
  });

  it('should remove a noticia', async () => {
    expect(await controller.remove(1)).toBeUndefined();
  });
});
