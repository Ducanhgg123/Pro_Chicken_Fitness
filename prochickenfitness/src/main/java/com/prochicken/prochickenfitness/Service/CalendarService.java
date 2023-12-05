package com.prochicken.prochickenfitness.Service;

import com.prochicken.prochickenfitness.entity.CalendarEntity;

public interface CalendarService {
    CalendarEntity generateCalendar(int caloriesPerDay,int workoutFrequency);
}
