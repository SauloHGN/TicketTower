import { Entity, ViewColumn, ViewEntity, Column } from 'typeorm';

@ViewEntity({
  name: 'vw_clientes_funcionarios', // Nome da view no banco de dados
  expression: `
    SELECT
    id,
    nome,
    email,
    'cliente' AS permissao,
    celular,
    id_empresa,
    NULL AS id_setor,
    'cliente' COLLATE utf8mb4_unicode_ci AS source
FROM clientes
UNION ALL
SELECT
    id,
    nome,
    email,
    permissao,
    celular,
    NULL AS id_empresa,
    id_setor,
    cargo COLLATE utf8mb4_unicode_ci AS source
FROM funcionarios;
  `,
})
export class UsersView {
  @ViewColumn({ name: 'id' })
  id: string;

  @ViewColumn({ name: 'nome' })
  nome: string;

  @ViewColumn({ name: 'email' })
  email: string;

  @ViewColumn({ name: 'permissao' })
  permissao: string;

  @ViewColumn({ name: 'celular' })
  celular: string;

  @ViewColumn({ name: 'id_empresa' })
  empresa: string;

  @ViewColumn({ name: 'id_setor' })
  setor: string;

  @ViewColumn({ name: 'source' })
  source: string;
}
