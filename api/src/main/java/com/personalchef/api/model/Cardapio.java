package com.personalchef.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Cardapio {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Lob
  private String foto;
  private Long id_chef;
  private Long id_categoria;
  private String nome;
  private Float valor;
  private String contorno;
  private String aperitivo;
  private String dolce;
  private String primi_piatto;
  private String secondo_piatto;
  private String antipasto;
}
