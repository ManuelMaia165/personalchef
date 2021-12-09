package com.personalchef.api.repositories;

import com.personalchef.api.model.Cardapio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardapioRepository extends JpaRepository<Cardapio,Long> {
}
