package com.personalchef.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Usuario {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Lob
  private String foto;
  private String email;
  private String senha;
  private boolean ischef;
  private String descricao_chef;
  private String nome;
  private String sexo;
  private String endereco;
  private String complemento;
  private String telefone;
  private String nascimento;
  private Integer estrelas;
}
