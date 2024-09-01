import { Entity, ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'vw_clientes_funcionarios', // Nome da view no banco de dados
  expression: `
    SELECT id, nome, email FROM clientes
    UNION ALL
    SELECT id, nome, email FROM funcionarios
  `,
})
export class UsersView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  nome: string;

  @ViewColumn()
  email: string;
}
