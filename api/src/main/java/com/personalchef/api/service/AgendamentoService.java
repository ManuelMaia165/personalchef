package com.personalchef.api.service;

import com.personalchef.api.model.Agendamento;
import com.personalchef.api.repositories.AgendamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

  @Autowired
  private AgendamentoRepository agendamentoRepository;

  public List<Agendamento> getAll() {
    return this.agendamentoRepository.findAll();
  }

  public Agendamento get(Long id) {
    return this.agendamentoRepository.findById(id).orElse(null);
  }

  public Agendamento save(Agendamento agendamento) {
    return this.agendamentoRepository.save(agendamento);
  }

  public void delete(Long id) {
    this.agendamentoRepository.deleteById(id);
  }

}
