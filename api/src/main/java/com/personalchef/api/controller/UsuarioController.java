package com.personalchef.api.controller;

import com.personalchef.api.model.Usuario;
import com.personalchef.api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class UsuarioController {

  @Autowired
  private UsuarioService usuarioService;

  @GetMapping("/usuarios")
  public List<Usuario> getAll() {
    return this.usuarioService.getAll();
  }

  @GetMapping("/usuarios/{id}")
  public Usuario get(@PathVariable("id") Long id) {
    return this.usuarioService.get(id);
  }

  @PutMapping("/usuarios")
  public Usuario update(@RequestBody Usuario usuario) {
    return this.usuarioService.save(usuario);
  }

  @PostMapping("/usuarios")
  public Usuario save(@RequestBody Usuario usuario) {
    return this.usuarioService.save(usuario);
  }

  @PostMapping("/login")
  public Usuario fazerLogin(@RequestBody Login login) {
    return this.usuarioService.fazerLogin(login);
  }
}
