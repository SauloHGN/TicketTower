import { Entity, ViewColumn, ViewEntity, Column } from 'typeorm';

@ViewEntity({
  name: 'vw_clientes_funcionarios', // Nome da view no banco de dados
  expression: `
    SELECT id, nome, email, 'cliente' AS source FROM clientes
    UNION ALL
    SELECT id, nome, email, cargo AS source FROM funcionarios
  `,
})
export class UsersView {
  @ViewColumn({ name: 'id' })
  id: string;

  @ViewColumn({ name: 'nome' })
  nome: string;

  @ViewColumn({ name: 'email' })
  email: string;

  @ViewColumn({ name: 'source' })
  source: string;
}
