import { NextResponse } from "next/server";
import { GoogleGenAI, Type, Schema } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const responseSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      etapa: {
        type: Type.STRING,
        description: "Nome da etapa na obra",
      },
      sugestao_busca: {
        type: Type.STRING,
        description: "Termo técnico exato para buscar no SINAPI",
      },
      justificativa: {
        type: Type.STRING,
        description: "Breve texto educativo de por que essa etapa é necessária",
      },
    },
    required: ["etapa", "sugestao_busca", "justificativa"],
  },
};

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "O texto da busca é obrigatório" },
        { status: 400 }
      );
    }

    const systemInstruction = `Você é um Engenheiro de Custos Sênior experiente focado no sistema SINAPI.
Seu objetivo é analisar a descrição livre do usuário e decompor o serviço em etapas lógicas, sugerindo os termos de busca exatos (composições) que o usuário deveria procurar no banco SINAPI.
Você deve retornar ESTRITAMENTE um array JSON seguindo o schema fornecido.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.2, // Baixa temperatura para manter a coerência técnica
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Nenhum texto retornado pela IA.");
    }

    const parsedJson = JSON.parse(text);

    return NextResponse.json({ data: parsedJson });
  } catch (error: unknown) {
    console.error("Erro na rota /api/suggest-services:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor ao processar a requisição com a IA." },
      { status: 500 }
    );
  }
}
