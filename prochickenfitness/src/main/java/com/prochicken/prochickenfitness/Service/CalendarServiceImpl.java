package com.prochicken.prochickenfitness.Service;

import com.prochicken.prochickenfitness.DTO.DailyWorkoutDTO;
import com.prochicken.prochickenfitness.entity.*;
import com.prochicken.prochickenfitness.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class CalendarServiceImpl implements CalendarService{

    private DishRepository dishRepository;
    private DailyWorkoutRepository dailyWorkoutRepository;
    private WorkoutActivityRepository workoutActivityRepository;

    private CalendarRepository calendarRepository;

    private UserRepository userRepository;

    @Autowired
    public CalendarServiceImpl(DishRepository dishRepository, DailyWorkoutRepository dailyWorkoutRepository,
                               WorkoutActivityRepository workoutActivityRepository, CalendarRepository calendarRepository,
                               UserRepository userRepository) {
        this.dishRepository = dishRepository;
        this.dailyWorkoutRepository = dailyWorkoutRepository;
        this.workoutActivityRepository = workoutActivityRepository;
        this.calendarRepository = calendarRepository;
        this.userRepository = userRepository;
    }

    private boolean checkInside(List<IngredientEntity> ingredients,Set<String> checkSet){
        for (IngredientEntity ingredient:ingredients){
            if (checkSet.contains(ingredient.getName())){
                return true;
            }
        }
        return false;
    }
    private LinkedList<DishEntity> getFavouriteDish(List<DishEntity> dishes, UserEntity user){
        LinkedList<DishEntity> favouriteDishes = new LinkedList<>();
        Set<String> favouriteIngredients = userRepository.findIngredientsbyStatus(user.getUsername(),true);
        for (DishEntity dish:dishes){
            List<IngredientEntity> ingredientsFromTheDish = dishRepository.findAllIngredients(dish.getId());
            if (checkInside(ingredientsFromTheDish,favouriteIngredients)){
                favouriteDishes.add(dish);
            }
        }

        return favouriteDishes;
    }

    private LinkedList<DishEntity> getNonfavouriteDish(List<DishEntity> dishes, UserEntity user){
        LinkedList<DishEntity> nonfavouriteDishes = new LinkedList<>();
        Set<String> nonfavouriteIngredients = userRepository.findIngredientsbyStatus(user.getUsername(),false);
        for (DishEntity dish:dishes){
            List<IngredientEntity> ingredientsFromTheDish = dishRepository.findAllIngredients(dish.getId());
            if (checkInside(ingredientsFromTheDish,nonfavouriteIngredients)){
                nonfavouriteDishes.add(dish);
            }
        }

        return nonfavouriteDishes;
    }

    private LinkedList<DishEntity> getNormalDish(List<DishEntity> dishes, UserEntity user){
        LinkedList<DishEntity> normalDishes = new LinkedList<>();
        Set<String> favouriteIngredients = userRepository.findIngredientsbyStatus(user.getUsername(),true);
        Set<String> nonfavouriteIngredients = userRepository.findIngredientsbyStatus(user.getUsername(),false);
        for (DishEntity dish:dishes){
            List<IngredientEntity> ingredientsFromTheDish = dishRepository.findAllIngredients(dish.getId());
            if (!checkInside(ingredientsFromTheDish,favouriteIngredients) &&
                    !checkInside(ingredientsFromTheDish,nonfavouriteIngredients)){
                normalDishes.add(dish);
            }
        }

        return normalDishes;
    }

    private DishEntity makeDishDecision(LinkedList<DishEntity> favouriteDishes,
                                    LinkedList<DishEntity> nonfavouriteDishes,LinkedList<DishEntity> normalDishes){
        Random rand = new Random();
        double prob = rand.nextDouble();
        if (prob <= 0.1 && !nonfavouriteDishes.isEmpty()){
            DishEntity dish = nonfavouriteDishes.getFirst();
            nonfavouriteDishes.removeFirst();
            nonfavouriteDishes.addLast(dish);
            return dish;
        }
        if (prob <= 0.4 && !normalDishes.isEmpty()){
            DishEntity dish = normalDishes.getFirst();
            normalDishes.removeFirst();
            normalDishes.addLast(dish);
            return dish;
        }
        if (!favouriteDishes.isEmpty()){
            DishEntity dish = favouriteDishes.getFirst();
            favouriteDishes.removeFirst();
            favouriteDishes.addLast(dish);
            return dish;
        }
        return null;
    }
    private boolean checkDuplicate(List<DishEntity> dishes,DishEntity dish){
        for (DishEntity currentDish:dishes){
            if (currentDish.getId()==dish.getId()){
                return true;
            }
        }
        return false;
    }

    @Override
    public CalendarEntity generateCalendar(int caloriesPerDay, UserEntity user) {

//        Init a new Calendar
        CalendarEntity calendar = new CalendarEntity();
        calendar.setGenerateDate(LocalDate.now());
        calendar = calendarRepository.save(calendar);
//        Get all dishes and activities
        List<DishEntity> dishes = dishRepository.findAll();
        LinkedList<WorkoutActivityEntity> activities = new LinkedList<>(workoutActivityRepository.findAll());

//        categorize the dishes
        LinkedList<DishEntity> favouriteDishes = getFavouriteDish(dishes,user);
        LinkedList<DishEntity> nonfavouriteDishes = getNonfavouriteDish(dishes,user);
        LinkedList<DishEntity> normalDishes = getNormalDish(dishes,user);

//        Calculate the workout day base on user frequency
        int workoutFrequency = user.getWorkoutFrequency();
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

//        Create the next 7 workout days
        List<DailyWorkoutEntity> dailyWorkouts = new ArrayList<>();
        LocalDate date = LocalDate.now();
        for (int i=0;i<7;i++){
//            Create a new daily workout
            DailyWorkoutEntity dailyWorkoutEntity = new DailyWorkoutEntity();
            dailyWorkoutEntity.setDateSet(date);
            date = date.plusDays(1);

//            Get dishes for today
            List<DishEntity> todayDishes = new ArrayList<>();
            int totalCalories = 0;
            int count=0;
            while (count<3){
                DishEntity choosenDish = makeDishDecision(favouriteDishes,nonfavouriteDishes,normalDishes);
                if (totalCalories+choosenDish.getTotalCalories()<=caloriesPerDay && !checkDuplicate(todayDishes,choosenDish)){
                    todayDishes.add(choosenDish);
                    count++;
                }
            }
            dailyWorkoutEntity.setDishes(todayDishes);

//            Get today activities
            List<WorkoutActivityEntity> todayWorkouts = new ArrayList<>();
            if (maskedGymDay.contains(i)) {
                count = 0;
                while (count < 3) {
                    WorkoutActivityEntity currentWorkout = activities.getFirst();
                    activities.removeFirst();
                    todayWorkouts.add(currentWorkout);
                    activities.addLast(currentWorkout);
                    count++;
                }
            }
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
