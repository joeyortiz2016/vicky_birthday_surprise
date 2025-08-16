<script setup lang="ts">
import { useHeaderStore } from '@/stores/headerstore';
import { onMounted, ref } from 'vue';

const started = ref<boolean>(false);
const failed = ref<boolean>(false);
const questions = ref<string[]>([]);
const choices = ref<Array<string[]>>([]);
const currIdx = ref<number>(0);

const headerStore = useHeaderStore();

onMounted(() => {
  initQuestions();
  initChoices();
});

function initQuestions() {
  // Question 1
  questions.value.push(
    "Before we start, we need to make sure you really are Victoria Naranjo, because this website was only made for Victoria's eyes.👁️",
  );
  // Question 2
  questions.value.push('Out of the following, who would you save and let the rest die?');
  // Question 3
  questions.value.push('Out of the following, who is the most talented?');
  // Question 4
  questions.value.push('Out of everyone at this party, who is your favorite?');
}

function initChoices() {
  // Choices for question 1
  choices.value.push(['Decline', 'Accept']);
  // Choices for question 2
  choices.value.push(['Jeremy Strong', 'Kieran Culkin', 'Sarah Snook', 'Joey Ortiz']);
  // Choices for question 3
  choices.value.push(['Nicholas Britell', 'Lady Gaga', 'ABBA', 'Joey Ortiz']);
  // Choices for question 4
  choices.value.push(['Joey', 'Joey', 'Joey', 'Joey']);
}

function handleChoiceSelection(choice: string) {
  if (choice === 'Joey Ortiz' || choice == 'Accept') {
    currIdx.value += 1;
  } else if (choice === 'Joey') {
    // Completion State
    headerStore.headerTextVisibility = true;
  } else {
    // Failure State. Reset everything.
    failed.value = true;
  }
}
</script>

<template>
  <div class="card">
    <div class="card-questions" v-if="!failed">
      <div class="button-wrapper" v-if="!started">
        <button class="start-button" @click="started = true">
          Click me please! I promise nothing bad will happen :)
        </button>
      </div>
      <div class="content" v-else-if="started">
        <div class="question-wrapper">
          <h1 class="question">{{ questions[currIdx] }}</h1>
        </div>
        <div class="choices-wrapper">
          <div class="choices" v-for="choice in choices[currIdx]">
            <button @click="handleChoiceSelection(choice)">{{ choice }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="card-failed" v-else>
      <h1>YOU ARE NOT VICTORIA NARANJO. <br>LEAVE OR ELSE.</br></h1>
    </div>
  </div>
</template>

<style>
.card {
  width: 100%;
  height: 100%;
  background-color: darkgrey;
  border-radius: 5px;
}

.card-questions {
  height:100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.card-failed {
  height:100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/kendall_sad.jpg');
  background-size: cover;
  text-align: center;
  color: white;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

button {
  width: fit-content;
  height: 30px;
  font-family: 'Comic Sans MS';
}

.button-wrapper {
  align-self: center;
}

.start-button {
  width: 200px;
  height: 50px;
}

.question {
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
}

.choices-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 20px;
}
</style>
