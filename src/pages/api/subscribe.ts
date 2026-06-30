export const prerender = false;

export async function POST({ request, locals }: { request: Request; locals: any }) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ erro: "Email em falta." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = locals.runtime.env.BUTTONDOWN_API_KEY;

    const resposta = await fetch("https://api.buttondown.com/v1/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email }),
    });

    if (!resposta.ok) {
      const detalhe = await resposta.text();
      console.error("Erro do Buttondown:", detalhe);
      return new Response(JSON.stringify({ erro: "Não foi possível subscrever." }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ sucesso: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (erro) {
    console.error(erro);
    return new Response(JSON.stringify({ erro: "Erro inesperado." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}