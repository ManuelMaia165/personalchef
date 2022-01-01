package com.personalchef.api.controller;

import com.personalchef.api.model.Cardapio;
import com.personalchef.api.service.CardapioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class CardapioController {

  @Autowired
  private CardapioService cardapioService;

  @GetMapping("/cardapios")
  public List<Cardapio> getAll() {
    return this.cardapioService.getAll();
  }

  @GetMapping("/cardapios/{id}")
  public Cardapio get(@PathVariable("id") Long id) {
    return this.cardapioService.get(id);
  }

  @PutMapping("/cardapios")
  public Cardapio update(@RequestBody Cardapio cardapio) {
    return this.cardapioService.save(cardapio);
  }

  @PostMapping("/cardapios")
  public Cardapio save(@RequestBody Cardapio cardapio) {
    return this.cardapioService.save(cardapio);
  }

  @DeleteMapping("/cardapios/{id}")
  public void delete(@PathVariable("id") Long id) {
    this.cardapioService.delete(id);
  }
}
