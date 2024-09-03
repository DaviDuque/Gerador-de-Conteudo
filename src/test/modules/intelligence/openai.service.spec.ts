import { Test, TestingModule } from '@nestjs/testing';
import { OpenAIService } from '../../../modules/intelligence/openai.service';

jest.mock('openai', () => {
  return {
    default: jest.fn().mockImplementation(() => {
      return {
        chat: {
          completions: {
            create: jest.fn().mockResolvedValue({
              choices: [
                { message: { content: 'Headline\nContent of the news...' } },
              ],
            }),
          },
        },
      };
    }),
  };
});

describe('OpenAIService', () => {
  let service: OpenAIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenAIService],
    }).compile();

    service = module.get<OpenAIService>(OpenAIService);
  });

  it('should generate news content correctly', async () => {
    const originalText = 'Texto original de exemplo.';
    const source = 'Fonte de exemplo';
    const level = 'Nível de exemplo';

    const result = await service.generateNewsContent(originalText, source, level);

    expect(result).toEqual({
      headline: 'Headline',
      content: 'Content of the news...',
    });
  });

  it('should handle errors when generating news content', async () => {
    const originalText = 'Texto original de exemplo.';
    const source = 'Fonte de exemplo';
    const level = 'Nível de exemplo';

    jest
      .spyOn(service['openai'].chat.completions, 'create')
      .mockRejectedValueOnce(new Error('API Error'));

    await expect(service.generateNewsContent(originalText, source, level)).rejects.toThrow(
      'Erro na geração do conteúdo da notícia.',
    );
  });
});
