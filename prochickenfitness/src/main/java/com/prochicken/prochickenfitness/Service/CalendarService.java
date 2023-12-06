package com.prochicken.prochickenfitness.Service;

import com.prochicken.prochickenfitness.entity.CalendarEntity;
import com.prochicken.prochickenfitness.entity.UserEntity;

public interface CalendarService {
    CalendarEntity generateCalendar(int caloriesPerDay, UserEntity user);
}
