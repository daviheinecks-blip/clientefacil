# ClienteFácil

Aplicação web responsiva para gestão de clientes, lembretes e acompanhamento de vendas, construída com Next.js, TypeScript e Supabase.

## O que já está incluído

- Landing page pública.
- Cadastro e login por e-mail/senha com Supabase Auth.
- Área privada protegida por sessão.
- Cadastro, pesquisa e exclusão de clientes.
- Atalho para conversar com o cliente no WhatsApp.
- Criação e conclusão de lembretes vinculados a clientes.
- Dashboard com contagem de clientes, vendas registradas e lembretes pendentes.
- Área de conta sem cobrança, assinatura ou integração financeira.
- SQL com tabelas, índices, trigger de perfil e políticas RLS.

## Requisitos

- Node.js 20.9 ou superior.
- Conta Supabase.


## 1. Instalar

Extraia o ZIP, abra a pasta `clientefacil` no terminal e rode:

```bash
npm install
```

## 2. Criar o banco no Supabase

1. Crie um projeto em https://supabase.com.
2. Abra SQL Editor.
3. Copie e execute todo o conteúdo de `supabase/schema.sql`.
4. Em Project Settings > API, copie Project URL e anon/public key.
5. Authentication > URL Configuration: em desenvolvimento, use `http://localhost:3000` como Site URL e adicione `http://localhost:3000/auth/callback` nas Redirect URLs.

## 3. Configurar variáveis

Copie `.env.example` para `.env.local` e preencha:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (somente servidor; nunca exponha no navegador)
- `NEXT_PUBLIC_APP_URL=http://localhost:3000`

Não compartilhe suas chaves secretas e não envie `.env.local` para o Git.

## 4. Rodar localmente

```bash
npm run dev
```

Abra http://localhost:3000.

Crie uma conta, confirme o e-mail se a confirmação estiver habilitada no Supabase e entre no painel.

## 5. Pagamentos

Este projeto foi configurado sem pagamentos, assinaturas ou integração com provedores financeiros.

## 6. Publicar

- Faça push do projeto para um repositório Git privado.
- Importe o repositório na Vercel.
- Configure as mesmas variáveis de ambiente na Vercel.
- Atualize `NEXT_PUBLIC_APP_URL` para o domínio HTTPS publicado.
- Atualize Site URL e Redirect URLs no Supabase.
- Teste cadastro, login, cadastro de clientes e lembretes no domínio publicado.

## Estrutura

```text
app/
  app/               # painel protegido
  auth/callback/     # confirmação de login
  cadastro/          # criação de conta
  login/             # login
components/          # componentes de interface
lib/supabase/        # clientes Supabase
supabase/schema.sql  # banco de dados e políticas RLS
```

## Limitações desta primeira entrega

Este é um MVP inicial executável, não um SaaS pronto para escala. Ainda faltam, antes de usar em produção: limites por plano validados no servidor, edição de clientes, histórico de compras completo, exportação, recuperação de senha, exclusão/exportação LGPD, testes automatizados, observabilidade, rate limiting, proteção antiabuso e recursos adicionais. A tela de dashboard considera vendas que sejam inseridas na tabela `sales`; o formulário de lançamento de vendas será uma próxima etapa.

## Segurança

- RLS isola os dados por usuário no banco.
- A chave `SUPABASE_SERVICE_ROLE_KEY` é usada somente no servidor.
- Antes de produção, revise políticas, validações e controles de segurança.
