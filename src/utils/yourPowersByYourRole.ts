import { Role } from 'src/entities/user/roles-enum';

const messageRoleTable =
  'Você pode acessar todo o cardápio e encaminhar sua solicitação direto à cozinha. Fechar sua comanda e solicitar sua conta.';
const messageRoleBartender =
  'Você pode cancelar pedidos e realiza-los caso seja necessário, reabrir mesa e atualizar disponibilidade dos produtos/pratos/bebidas. Poderá consultar a qualquer momento suas gorjetas.';
const messageRoleAdmin =
  'Você pode gerenciar a inserção dos produtos/pratos/bebidas no cardápio.';
const messageRoleManager =
  'Você pode gerenciar os demais recursos disponivies e ainda consultar todas as métricas fornecidas pelo sistema pertinentes ao seu negócio.';
const messageRoleGod =
  'Você é o criador de tudo isso aqui. Tem direito da porra toda! Apenas continue fazendo o que quiser fazer';

export const yourPowersByYourRole = (youRole: Role) => {
  switch (youRole) {
    case Role.TABLE:
      return messageRoleTable;

    case Role.BARTENDER:
      return messageRoleBartender;

    case Role.ADMIN:
      return messageRoleAdmin;

    case Role.MANAGER:
      return messageRoleManager;

    case Role.GOD:
      return messageRoleGod;
  }
};
