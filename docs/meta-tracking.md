# Rastreamento Meta (Pixel + Conversions API)

Cada evento sai por dois caminhos ao mesmo tempo — o Pixel no navegador e a
Conversions API no servidor — carregando o **mesmo `event_id`**. A Meta usa esse
id para deduplicar: conta um evento só, mas continua recebendo o dado quando o
navegador bloqueia o Pixel.

## Arquivos

| Arquivo | Papel |
| --- | --- |
| `src/lib/meta-events.ts` | Configuração compartilhada: Pixel ID, lista de eventos permitidos, dados do produto, `generateEventId()`. Chega ao navegador — **sem segredos**. |
| `src/lib/meta-pixel.ts` | Lado navegador: snippet do Pixel, `getFacebookCookies()`, `trackPageView()`, `trackViewContent()`, `trackInitiateCheckout()`, `trackContact()`. |
| `src/lib/meta-capi.ts` | Lado servidor: normalização + SHA-256, montagem do payload e `sendMetaServerEvent()`. Lê o token. **Nunca importar de componente client.** |
| `src/lib/consent.ts` | Porta de consentimento. Hoje libera por padrão (o site não tem banner de cookies). |
| `src/components/MetaPixel.tsx` | Único ponto de instalação do Pixel, montado no layout raiz. |
| `src/app/api/meta/conversion/route.ts` | `POST /api/meta/conversion` — recebe do navegador e repassa à Meta. |

## Eventos

| Evento | Quando dispara | Dados |
| --- | --- | --- |
| `PageView` | Uma vez por carregamento | — |
| `ViewContent` | Ao rolar até a seção `#oferta` (uma vez por visita) | `content_type`, `content_ids`, `currency`, `value` |
| `InitiateCheckout` | **Só no clique** num botão que leva à Kiwify | idem + `cta_location` |
| `Contact` | Clique em WhatsApp, Instagram ou e-mail | `channel` |

### Purchase

**Purchase is handled by Kiwify to avoid duplicate purchases.**

A compra acontece no checkout da Kiwify, que já dispara o Pixel com o mesmo ID.
Não existe forma de compartilhar `event_id` entre este site e a Kiwify, então um
`Purchase` daqui seria contado duas vezes. A rota `/api/meta/conversion` recusa
`Purchase` explicitamente com HTTP 409.

## Dados de correspondência

Enviados **sem hash** (exigência da Meta): `client_ip_address`, `client_user_agent`,
`fbp`, `fbc`.

Enviados com **SHA-256** após normalização: `email` (minúsculo, sem espaços),
`phone` (só dígitos, DDI 55 quando ausente), `external_id` (id anônimo por
navegador, guardado em `localStorage`).

O site não tem formulário, então e-mail e telefone não são coletados hoje — a
rota já aceita e faz o hash caso passem a existir.

Se a URL trouxer `fbclid` e o cookie `_fbc` ainda não existir, ele é montado no
formato `fb.1.<timestamp>.<fbclid>` e persistido por 90 dias.

## Variáveis de ambiente

Ver `.env.example`. Cadastrar na Vercel em **Settings → Environment Variables**:

| Variável | Valor | Onde |
| --- | --- | --- |
| `NEXT_PUBLIC_META_PIXEL_ID` | `1675957073477718` | Público (navegador) |
| `META_PIXEL_ID` | `1675957073477718` | Servidor |
| `META_CONVERSIONS_API_TOKEN` | token da CAPI | **Segredo — só servidor** |
| `META_TEST_EVENT_CODE` | opcional | Servidor, só durante testes |
| `META_GRAPH_API_VERSION` | opcional (padrão `v24.0`) | Servidor |

## Como testar

1. No Gerenciador de Eventos, abra o dataset → **Testar eventos** e copie o código
   (formato `TESTxxxxx`).
2. Coloque em `META_TEST_EVENT_CODE` (Vercel ou `.env.local`) e faça o deploy.
   Enquanto ele estiver preenchido, os eventos da CAPI aparecem na aba de teste e
   **não entram nos dados reais**.
3. Abra o site, role até a oferta e clique num botão de compra. Devem aparecer
   `PageView`, `ViewContent` e `InitiateCheckout`.
4. Cada um deve mostrar origem **Navegador + Servidor** com a marca de
   *deduplicado*. Se aparecerem separados, o `event_id` não está batendo.
5. **Apague `META_TEST_EVENT_CODE` ao terminar** — senão os eventos reais nunca
   chegam aos dados de produção.

Para conferir só o Pixel do navegador, use a extensão Meta Pixel Helper: deve
listar **um** pixel.
