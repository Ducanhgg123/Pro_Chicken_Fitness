package com.prochicken.prochickenfitness.repository;

import com.prochicken.prochickenfitness.entity.CalendarEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CalendarRepository extends JpaRepository<CalendarEntity,Integer> {

    @Query("select u.calendar from UserEntity u where u.username = :username")
    CalendarEntity findByUsername(@Param("username") String username);
}
