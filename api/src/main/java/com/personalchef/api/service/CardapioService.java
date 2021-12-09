package com.personalchef.api.service;

import com.personalchef.api.model.Cardapio;
import com.personalchef.api.repositories.CardapioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardapioService {

  @Autowired
  private CardapioRepository cardapioRepository;

  public List<Cardapio> getAll() {
    return this.cardapioRepository.findAll();
  }

  public Cardapio get(Long id) {
    return this.cardapioRepository.findById(id).orElse(null);
  }

  public Cardapio save(Cardapio cardapio) {
    return this.cardapioRepository.save(cardapio);
  }

  public void delete(Long id) {
    this.cardapioRepository.deleteById(id);
  }

}
