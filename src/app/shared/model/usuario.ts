export class Usuario {
  id: number;
  email: string;
  senha: string;
  ischef: boolean;
  descricao_chef: string;
  foto: string;
  nome: string;
  sexo: string;
  endereco: string;
  complemento: string;
  telefone: string;
  nascimento: string;
  estrelas: number;

  constructor() {
    this.email = '';
    this.senha = '';
    this.ischef = false;
    this.descricao_chef = '';
    this.foto = '';
    this.nome = '';
    this.sexo = 'M';
    this.endereco = '';
    this.complemento = '';
    this.telefone = '';
    this.nascimento = '';
    this.estrelas = null;
  }
}
