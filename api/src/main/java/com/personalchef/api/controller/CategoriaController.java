package com.personalchef.api.controller;

import com.personalchef.api.model.Categoria;
import com.personalchef.api.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class CategoriaController {

  @Autowired
  private CategoriaService categoriaService;

  @GetMapping("/categorias")
  public List<Categoria> getAll() {
    return this.categoriaService.getAll();
  }

  @GetMapping("/categorias/{id}")
  public Categoria get(@PathVariable("id") Long id) {
    return this.categoriaService.get(id);
  }

  @PutMapping("/categorias")
  public Categoria update(@RequestBody Categoria categoria) {
    return this.categoriaService.save(categoria);
  }

  @PostMapping("/categorias")
  public Categoria save(@RequestBody Categoria categoria) {
    return this.categoriaService.save(categoria);
  }
}
