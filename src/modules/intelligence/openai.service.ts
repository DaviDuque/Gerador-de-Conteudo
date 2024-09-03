import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';  


@Injectable()
export class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, 
    });
  }

  async generateNewsContent(originalText: string, source: string, level: string): Promise<{ headline: string; content: string }> {
 
    const prompt = `
    Gera um conteúdo de notícia com base no seguinte texto:
    
    "${originalText}"
    
    A notícia deve incluir:
    - Uma manchete impactante.
    - Citar a fonte: ${source}.
    - Classificar a notícia de acordo com o nível de atuação: ${level}.
    - Utilizar elementos de coesão textual e um formato jornalístico adequado.
    
    A manchete e o conteúdo devem ser diferenciados e criativos.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: process.env.OPENAI_API_MODELO,
        messages: [
          { role: "system", content: "Você é um assistente útil." },
          { role: "user", content: prompt }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        response_format: {
          type: "text"
        },
      });

      const result = response.choices[0].message.content.trim().split('\n');
      const headline = result[0];
      const content = result.slice(1).join('\n');

      return { headline, content };

    } catch (error) {
      console.error("Erro ao gerar resposta:", error.message);
      throw new Error("Erro na geração do conteúdo da notícia.");
    }
  }
}
