# Publicação guiada — ClienteFácil

## O que você precisa criar (sem pagar para começar)

1. **Supabase**: https://supabase.com/dashboard
   - Crie a conta e um projeto.
   - Região: escolha uma região próxima do Brasil, se disponível.
   - Execute `supabase/schema.sql` no SQL Editor.
   - Em Project Settings > API, copie Project URL e `anon`/publishable key.
   - Configure Authentication > URL Configuration:
     - Site URL: `http://localhost:3000`
     - Redirect URL: `http://localhost:3000/auth/callback`
2. **Vercel**: https://vercel.com/signup
   - Crie a conta, preferencialmente usando GitHub.
   - Importe o repositório do ClienteFácil.
   - Configure as variáveis de ambiente indicadas abaixo.
   - O endereço gratuito será parecido com `clientefacil-seu-projeto.vercel.app`.
3. **GitHub**: https://github.com/signup
   - Crie um repositório privado.
   - Envie os arquivos do projeto. Não envie `.env.local`.

## Variáveis de ambiente na Vercel

Configure em Project > Settings > Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (somente servidor; nunca use `NEXT_PUBLIC_`)
- `NEXT_PUBLIC_APP_URL` = URL HTTPS atribuída pela Vercel

Depois de publicar, atualize no Supabase Authentication > URL Configuration:
- Site URL = domínio Vercel HTTPS
- Redirect URL = `https://SEU-DOMINIO.vercel.app/auth/callback`

## Pagamentos

Não é necessário configurar pagamentos: o ClienteFácil não possui assinaturas nem cobranças.

## Atenção antes de uso público

A primeira versão é um MVP para testar cadastros e lembretes, mas ainda precisa de revisão antes de uso público amplo:

- criar telas de edição de cliente e lançamento de vendas;
- testar isolamento multiusuário, backup, recuperação de senha e exclusão/exportação de dados;
- publicar política de privacidade, termos de uso e contato de suporte;
- avaliar obrigações fiscais e regras aplicáveis ao seu negócio.

## Próximo passo

As contas do GitHub, Supabase e Vercel já foram criadas. Siga o guia passo a passo para enviar o código e publicar. Nunca cole senhas ou chaves secretas em conversas.
