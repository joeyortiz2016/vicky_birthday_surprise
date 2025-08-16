<script setup lang="ts">
import { useHeaderStore } from '@/stores/headerstore';
import { onMounted, ref } from 'vue';
import kahoot_mp3 from '@/assets/kahoot.mp3'
import failed_mp3 from '@/assets/failed.mp3';
import correct_mp3 from '@/assets/correct_effect.mp3';
import failedEffect_mp3 from '@/assets/failed_effect.mp3';
import completed_mp3 from '@/assets/completed.mp3';

// Events
const emit = defineEmits(['completed'])

// Get audio elements.
const musicAudio = new Audio();
const soundAudio = new Audio(); // sound effects

// Failure Opacities
const cardFailedOpacity = ref<number>(0);
const textFailedOpacity = ref<number>(0);

// Questions state
const started = ref<boolean>(false);
const failed = ref<boolean>(false);
const completed = ref<boolean>(false);

// Questions and Choices lists.
const questions = ref<string[]>([]);
const choices = ref<Array<string[]>>([]);
const currQuestionIdx = ref<number>(0);

// Letter List.
const letter = ref<string[]>([]);
const currLetterIdx = ref<number>(0);

// Header store for statew
const headerStore = useHeaderStore();

onMounted(() => {
  initQuestions();
  initChoices();
  initLetter();
  initMusicAudio();
  initSoundAudio();
});

function startQuestions() {
  started.value = true;
  musicAudio.play();
}

function initMusicAudio() {
  musicAudio.src = kahoot_mp3;
  musicAudio.volume = .6;
  musicAudio.loop = true;
}

function initSoundAudio() {
  soundAudio.src = correct_mp3;
  soundAudio.volume = .4
}

function initQuestions() {
  // Question 1
  questions.value.push(
    "Before we start, we need to make sure you really are Victoria Naranjo, because this website was only made for Victoria's eyes. 👁️👄👁️",
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

function initLetter() {
  // First page.
  letter.value.push(`Wow. You truly are Victoria Naranjo! Congratulations!`)
  // Second page.
  letter.value.push(`Hey Vicky! Hope you're having fun at this party right now and not wanting to die. Just wanted to say you're an amazing friend
  and am glad to have known you all these years. I will forever appreciate you putting me on Succession, and always calling me out on my bullshit when needed.
  But also fuck you.`)
  // Third Page.
  letter.value.push(`But also fuck you hahaha.`)
  // Fourth Page
  letter.value.push(`ANYWAYS...`)
  // Fifth Page
  letter.value.push(`So I did get you an actual gift but that shit ain't coming until August 25th - 29th 💀. So here's the link to said gift that I got you. Enjoy.` )
}

function nextLetterPage() {
  if (currLetterIdx.value < letter.value.length-1) {
    currLetterIdx.value += 1;
  }
}

function prevLetterPage() {
  if (currLetterIdx.value > 0) {
    currLetterIdx.value -= 1;
  }
}

function handleChoiceSelection(choice: string, lastChoiceIndex: number) {
  if (choice === 'Joey Ortiz' || choice == 'Accept') {
    soundAudio.load();
    soundAudio.play();
    nextQuestion();
  } else if (choice === 'Joey') {
    console.log('lastChoiceIndex:', lastChoiceIndex)
    if (lastChoiceIndex === 1) {
      onCompleted();
    } else {
      onFailure();
    }
  } else {
    // Failure State. Reset everything.
    onFailure();
  }
}

function nextQuestion(){
  if (currQuestionIdx.value < questions.value.length) {
    currQuestionIdx.value += 1;
  }
}

function onFailure() {
  musicAudio.pause();
  musicAudio.volume = .4;
  musicAudio.src = failed_mp3;
  musicAudio.load();
  musicAudio.play();
  soundAudio.volume = 1;
  soundAudio.src = failedEffect_mp3;
  soundAudio.load();
  soundAudio.play();
  failed.value = true;
  requestAnimationFrame(animateFailureCard);
}

function animateFailureCard() {
  if (cardFailedOpacity.value <= 1) {
    cardFailedOpacity.value += .002;
    requestAnimationFrame(animateFailureCard);
  } else {
    requestAnimationFrame(animateFailureText);
  }
}

function animateFailureText() {
  if (textFailedOpacity.value <= 1) {
    textFailedOpacity.value += .001;
    requestAnimationFrame(animateFailureText);
  }
}

function onCompleted() {
  headerStore.headerTextVisibility = true;
  completed.value = true;
  musicAudio.src = completed_mp3;
  musicAudio.volume = .4;
  musicAudio.load();
  musicAudio.play();
  emit('completed');
}
</script>

<template>
  <div class="card">
    <div class="card-questions" v-if="!failed && !completed">
      <div class="button-wrapper" v-if="!started">
        <button class="start-button" @click="startQuestions">
          Click me please! I promise nothing bad will happen :)
        </button>
      </div>
      <div class="content" v-else-if="started">
        <div class="question-wrapper">
          <h1 class="question">{{ questions[currQuestionIdx] }}</h1>
        </div>
        <div class="choices-wrapper">
            <button class="button-choice" v-for="(choice, index) in choices[currQuestionIdx]" @click="handleChoiceSelection(choice, index)">{{ choice }}</button>
        </div>
      </div>
    </div>
    <div class="card-failed" v-else-if="failed && !completed" :style="{opacity: cardFailedOpacity}">
      <h1 :style="{opacity: textFailedOpacity}">YOU ARE NOT VICTORIA NARANJO. <br>LEAVE OR ELSE.</br></h1>
    </div>
    <div class="card-completed" v-else-if="completed">
      <h1 class="to">To Victoria,</h1>
      <h1 class="letter">{{ letter[currLetterIdx] }}</h1>
      <a v-if="currLetterIdx === letter.length-1"href="https://www.etsy.com/listing/4335352899/54-poker-cards-joker-playing-cards-game?ls=s&ga_order=most_relevant&ga_search_type=all&ga_view_type=gallery&ga_search_query=balatro+playing+cards&ref=sr_gallery-1-1&content_source=0a526527-1602-452e-a56c-01429e0a6b8b%253Ad649e0a5bf42d7bc67e0d67be2832050dd78f7ec&organic_search_click=1&logging_key=0a526527-1602-452e-a56c-01429e0a6b8b%3Ad649e0a5bf42d7bc67e0d67be2832050dd78f7ec" target="_blank" rel="noopener noreferrer">
        CLICK ME FOR GIFT
      </a>
      <h1 class="from">From,<br>Joey</br></h1>
      <div class="controller">
        <button class="left-button" @click="prevLetterPage"><img src="@/assets/arrow-left-solid-full.svg"/></button>
        <div class="page-display"> {{ currLetterIdx+1 }} / {{ letter.length }}</div>
        <button class="right-button" @click="nextLetterPage"><img src="@/assets/arrow-right-solid-full.svg"/></button>
      </div>
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

.card-completed {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.letter {
  padding-left: 3em;
  padding-right: 3em;
}

.from, .to {
  padding-left: 3em;
}

a {
  align-self: center;
}

.controller {
  align-self: center;
  margin-bottom: 5em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 50px;
}

.page-display {
  font-size: x-large;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 100px;
  
}

button {
  font-family: 'Comic Sans MS';
  font-size: larger;
  height: 10em;
  width: 15em;
}

.left-button, .right-button {
  width: 60px;
  height: 50px;
}

.button-wrapper {
  align-self: center;
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
