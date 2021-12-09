package com.personalchef.api.controller;

import com.personalchef.api.model.Agendamento;
import com.personalchef.api.service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
public class AgendamentoController {

  @Autowired
  private AgendamentoService agendamentoService;

  @GetMapping("/agendamentos")
  public List<Agendamento> getAll() {
    return this.agendamentoService.getAll();
  }

  @GetMapping("/agendamentos/{id}")
  public Agendamento get(@PathVariable("id") Long id) {
    return this.agendamentoService.get(id);
  }

  @PutMapping("/agendamentos")
  public Agendamento update(@RequestBody Agendamento agendamento) {
    return this.agendamentoService.save(agendamento);
  }

  @PostMapping("/agendamentos")
  public Agendamento save(@RequestBody Agendamento agendamento) {
    return this.agendamentoService.save(agendamento);
  }
}
