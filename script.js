// script.js
var restTimerInterval;
var restTimeElapsed = 0;
var restTimerRunning = false;
var workoutData = [];
var savedWorkouts = [];

document.addEventListener("DOMContentLoaded", function () {
    preventNegativeInput();
    hideSavedWorkouts();
    updateRestTimerDisplay();
});

function preventNegativeInput() {
    var numberInputs = document.querySelectorAll("input[type='number']");

    numberInputs.forEach(function (input) {
        input.addEventListener("keydown", function (event) {
            if (event.key === "-" || event.key === "ArrowDown") {
                event.preventDefault();
            }
        });
    });
}

function addExercise() {
    var exerciseInput = document.getElementById("exercise");
    var setsInput = document.getElementById("sets");
    var repsInput = document.getElementById("reps");
    var weightInput = document.getElementById("weight");
    var errorMessage = document.getElementById("error-message");

    var exercise = exerciseInput.value.trim();
    var sets = parseInt(setsInput.value);
    var reps = parseInt(repsInput.value);
    var weight = parseFloat(weightInput.value);

    if (exercise === "" || isNaN(sets) || sets <= 0 || isNaN(reps) || reps <= 0 || isNaN(weight) || weight <= -1) {
        errorMessage.textContent = "Please enter valid exercise details.";
        return;
    }

    if (sets < 0 || reps < 0 || weight < 0) {
        errorMessage.textContent = "Sets, reps, and weight cannot be negative.";
        return;
    }

    errorMessage.textContent = "";

    var exerciseData = {
        exercise: exercise,
        sets: sets,
        reps: reps,
        weight: weight
    };

    workoutData.push(exerciseData);

    var exerciseList = document.getElementById("exercise-list");
    var li = document.createElement("li");
    li.textContent = `${exercise} - Sets: ${sets}, Reps: ${reps}, Weight: ${weight} kg`;
    li.classList.add("exercise-item");
    exerciseList.appendChild(li);

    exerciseInput.value = "";
    setsInput.value = "";
    repsInput.value = "";
    weightInput.value = "";
}

function saveWorkout() {
    if (workoutData.length === 0) {
        alert("No exercises to save.");
        return;
    }

    savedWorkouts.push(workoutData.slice());
    displaySavedWorkouts();
    workoutData = [];
    clearExerciseList();
    showSavedWorkouts();
}

function displaySavedWorkouts() {
    var savedWorkoutsList = document.getElementById("saved-workouts-list");
    savedWorkoutsList.innerHTML = "";

    savedWorkouts.forEach(function (workout, index) {
        var li = document.createElement("li");
        li.textContent = `Workout ${index + 1}: ${formatWorkout(workout)}`;
        savedWorkoutsList.appendChild(li);
    });
}

function formatWorkout(workout) {
    return workout.map(function (exercise) {
        return `${exercise.exercise} - Sets: ${exercise.sets}, Reps: ${exercise.reps}, Weight: ${exercise.weight} kg`;
    }).join("; ");
}

function hideSavedWorkouts() {
    var savedWorkoutsDiv = document.getElementById("saved-workouts");
    savedWorkoutsDiv.style.display = "none";
}

function showSavedWorkouts() {
    var savedWorkoutsDiv = document.getElementById("saved-workouts");
    savedWorkoutsDiv.style.display = "block";
}

function startRestTimer() {
    if (!restTimerRunning) {
        restTimerInterval = setInterval(function () {
            restTimeElapsed++;
            updateRestTimerDisplay();
        }, 1000);
        restTimerRunning = true;
    }
}

function resetRestTimer() {
    clearInterval(restTimerInterval);
    restTimerRunning = false;
    restTimeElapsed = 0;
    updateRestTimerDisplay();
}

function updateRestTimerDisplay() {
    var restTimerDiv = document.getElementById("rest-timer");
    var hours = Math.floor(restTimeElapsed / 3600);
    var minutes = Math.floor((restTimeElapsed % 3600) / 60);
    var seconds = restTimeElapsed % 60;
    restTimerDiv.textContent = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function clearExerciseList() {
    var exerciseList = document.getElementById("exercise-list");
    exerciseList.innerHTML = "";
}