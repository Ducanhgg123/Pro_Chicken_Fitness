package com.prochicken.prochickenfitness.Service;

import com.prochicken.prochickenfitness.DTO.DailyWorkoutDTO;
import com.prochicken.prochickenfitness.entity.CalendarEntity;
import com.prochicken.prochickenfitness.entity.DailyWorkoutEntity;
import com.prochicken.prochickenfitness.entity.DishEntity;
import com.prochicken.prochickenfitness.entity.WorkoutActivityEntity;
import com.prochicken.prochickenfitness.repository.CalendarRepository;
import com.prochicken.prochickenfitness.repository.DailyWorkoutRepository;
import com.prochicken.prochickenfitness.repository.DishRepository;
import com.prochicken.prochickenfitness.repository.WorkoutActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class CalendarServiceImpl implements CalendarService{

    private DishRepository dishRepository;
    private DailyWorkoutRepository dailyWorkoutRepository;
    private WorkoutActivityRepository workoutActivityRepository;

    private CalendarRepository calendarRepository;

    @Autowired
    public CalendarServiceImpl(DishRepository dishRepository, DailyWorkoutRepository dailyWorkoutRepository,
                               WorkoutActivityRepository workoutActivityRepository, CalendarRepository calendarRepository) {
        this.dishRepository = dishRepository;
        this.dailyWorkoutRepository = dailyWorkoutRepository;
        this.workoutActivityRepository = workoutActivityRepository;
        this.calendarRepository = calendarRepository;
    }

    @Override
    public CalendarEntity generateCalendar(int caloriesPerDay,int workoutFrequency) {
        CalendarEntity calendar = new CalendarEntity();
        calendar.setGenerateDate(LocalDate.now());
        calendar = calendarRepository.save(calendar);
        LinkedList<DishEntity> dishes = new LinkedList<>(dishRepository.findAll());
        LinkedList<WorkoutActivityEntity> activities = new LinkedList<>(workoutActivityRepository.findAll());
        List<DailyWorkoutEntity> dailyWorkouts = new ArrayList<>();
        Set<Integer> maskedGymDay = new HashSet<>();
        if (workoutFrequency<=2){
            maskedGymDay.add(0);
            maskedGymDay.add(3);
        }else if (workoutFrequency<=4){
            maskedGymDay.add(0);
            maskedGymDay.add(2);
            maskedGymDay.add(4);
        }else{
            maskedGymDay.add(0);
            maskedGymDay.add(1);
            maskedGymDay.add(3);
            maskedGymDay.add(4);
        }
        LocalDate date = LocalDate.now();
        System.out.println("Break point 1");
        for (int i=0;i<7;i++){
            DailyWorkoutEntity dailyWorkoutEntity = new DailyWorkoutEntity();
            dailyWorkoutEntity.setDateSet(date);
            date = date.plusDays(1);

            List<DishEntity> todayDishes = new ArrayList<>();
            int totalCalories = 0;
            int count=0;
            int iter = 0;
            while (count<3 && iter<dishes.size()){
                DishEntity currentDish = dishes.getFirst();
                dishes.removeFirst();
                if (totalCalories+currentDish.getTotalCalories()<=caloriesPerDay){
                    todayDishes.add(currentDish);
                    count++;
                }
                dishes.addLast(currentDish);
                iter++;
            }
            dailyWorkoutEntity.setDishes(todayDishes);

            List<WorkoutActivityEntity> todayWorkouts = new ArrayList<>();
            if (maskedGymDay.contains(i)){
                count = 0;
                while (count<3){
                    WorkoutActivityEntity currentWorkout = activities.getFirst();
                    activities.removeFirst();
                    todayWorkouts.add(currentWorkout);
                    activities.addLast(currentWorkout);
                    count++;
                }
            }
            System.out.println("asdadshsadsad");
            dailyWorkoutEntity.setActivities(todayWorkouts);
            dailyWorkoutEntity.setCalendar(calendar);
            dailyWorkoutEntity = dailyWorkoutRepository.save(dailyWorkoutEntity);
            dailyWorkouts.add(dailyWorkoutEntity);
        }
        calendar.setDailyWorkouts(dailyWorkouts);
        calendar = calendarRepository.save(calendar);
        return calendar;
    }
}
