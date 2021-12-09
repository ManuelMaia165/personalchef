package com.personalchef.api.service;

import com.personalchef.api.model.Usuario;
import com.personalchef.api.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

  @Autowired
  private UsuarioRepository usuarioRepository;

  public List<Usuario> getAll() {
    return this.usuarioRepository.findAll();
  }

  public Usuario get(Long id) {
    return this.usuarioRepository.findById(id).orElse(null);
  }

  public Usuario save(Usuario usuario) {
    return this.usuarioRepository.save(usuario);
  }

  public void delete(Long id) {
    this.usuarioRepository.deleteById(id);
  }

}
