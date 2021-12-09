package com.personalchef.api.service;

import com.personalchef.api.model.Categoria;
import com.personalchef.api.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

  @Autowired
  private CategoriaRepository categoriaRepository;

  public List<Categoria> getAll() {
    return this.categoriaRepository.findAll();
  }

  public Categoria get(Long id) {
    return this.categoriaRepository.findById(id).orElse(null);
  }

  public Categoria save(Categoria categoria) {
    return this.categoriaRepository.save(categoria);
  }

  public void delete(Long id) {
    this.categoriaRepository.deleteById(id);
  }

}
