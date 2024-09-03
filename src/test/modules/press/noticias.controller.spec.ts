import { Test, TestingModule } from '@nestjs/testing';
import { NoticiasController } from '../../../../src/modules/press/noticias.controller'
import { NoticiasService } from '../../../../src/modules/press/noticias.service';
import { Noticias } from '../../../shared/models/noticias.entity'

describe('NoticiasController', () => {
  let controller: NoticiasController;
  let service: NoticiasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoticiasController],
      providers: [
        {
          provide: NoticiasService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue(new Noticias()),
            create: jest.fn().mockResolvedValue(new Noticias()),
            update: jest.fn().mockResolvedValue(new Noticias()),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<NoticiasController>(NoticiasController);
    service = module.get<NoticiasService>(NoticiasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of noticias', async () => {
    expect(await controller.findAll()).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a noticia by ID', async () => {
    const noticiaId = 1;
    const noticia = new Noticias();
    jest.spyOn(service, 'findOne').mockResolvedValue(noticia);

    expect(await controller.findOne(noticiaId)).toEqual(noticia);
    expect(service.findOne).toHaveBeenCalledWith(noticiaId);
  });

  it('should create a new noticia', async () => {
    const noticia = new Noticias();
    jest.spyOn(service, 'create').mockResolvedValue(noticia);

    expect(await controller.create(noticia)).toEqual(noticia);
    expect(service.create).toHaveBeenCalledWith(noticia);
  });

  it('should update a noticia', async () => {
    const noticiaId = 1;
    const noticia = new Noticias();
    jest.spyOn(service, 'update').mockResolvedValue(noticia);

    expect(await controller.update(noticiaId, noticia)).toEqual(noticia);
    expect(service.update).toHaveBeenCalledWith(noticiaId, noticia);
  });

  it('should remove a noticia', async () => {
    const noticiaId = 1;
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);

    expect(await controller.remove(noticiaId)).toBeUndefined();
    expect(service.remove).toHaveBeenCalledWith(noticiaId);
  });
});
